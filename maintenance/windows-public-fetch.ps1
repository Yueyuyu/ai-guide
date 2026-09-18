param(
  [Parameter(Mandatory=$true)][string]$Url,
  [int]$MaximumBytes = 2000000,
  [int]$TimeoutMilliseconds = 15000
)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = New-Object System.Text.UTF8Encoding($false)
$handler = $null
$client = $null
$response = $null
$stream = $null
$memory = $null
try {
  $targetUri = [Uri]$Url
  if ($targetUri.Scheme -ne 'https' -or $targetUri.UserInfo) { throw '只允许无凭据的 HTTPS 来源' }
  Add-Type -AssemblyName System.Net.Http
  $handler = New-Object System.Net.Http.HttpClientHandler
  $handler.AllowAutoRedirect = $false
  $handler.UseCookies = $false
  $handler.UseDefaultCredentials = $false
  $client = New-Object System.Net.Http.HttpClient($handler)
  $client.Timeout = [TimeSpan]::FromMilliseconds($TimeoutMilliseconds)
  $client.DefaultRequestHeaders.UserAgent.ParseAdd('AIGuide-Tutorial-Update-Check/1.0')
  $client.DefaultRequestHeaders.Accept.ParseAdd('text/markdown, text/html, application/json')
  $response = $client.GetAsync($targetUri, [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead).GetAwaiter().GetResult()
  $contentType = [string]$response.Content.Headers.ContentType
  $status = [int]$response.StatusCode
  $bytes = [byte[]]@()
  if ($response.IsSuccessStatusCode) {
    if ($contentType -notmatch 'text/(html|plain|markdown)|application/json') { throw '来源不是可读取的文档' }
    if ($response.Content.Headers.ContentLength -gt $MaximumBytes) { throw '来源超过大小限制' }
    $stream = $response.Content.ReadAsStreamAsync().GetAwaiter().GetResult()
    $memory = New-Object System.IO.MemoryStream
    $buffer = New-Object byte[] 8192
    while (($count = $stream.Read($buffer, 0, $buffer.Length)) -gt 0) {
      if ($memory.Length + $count -gt $MaximumBytes) { throw '来源超过大小限制' }
      $memory.Write($buffer, 0, $count)
    }
    $bytes = $memory.ToArray()
  }
  [ordered]@{ status = $status; contentType = $contentType; location = [string]$response.Headers.Location; body = [Convert]::ToBase64String($bytes) } | ConvertTo-Json -Compress
} catch {
  [Console]::Error.WriteLine('Windows 公开资料读取失败')
  exit 1
} finally {
  if ($stream) { $stream.Dispose() }
  if ($memory) { $memory.Dispose() }
  if ($response) { $response.Dispose() }
  if ($client) { $client.Dispose() }
  if ($handler) { $handler.Dispose() }
}
