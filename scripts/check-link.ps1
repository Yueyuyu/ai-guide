param([Parameter(Mandatory=$true)][string]$Url)
$ProgressPreference = 'SilentlyContinue'
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$address = [Uri]$Url
if ($address.Scheme -ne 'https') { throw 'Only HTTPS sources are supported.' }
function Read-Status([string]$Method) {
  try {
    $response = Invoke-WebRequest -Uri $address -Method $Method -UseBasicParsing -TimeoutSec 12
    return [int]$response.StatusCode
  } catch {
    if ($_.Exception.Response) { return [int]$_.Exception.Response.StatusCode }
    return $null
  }
}
$status = Read-Status 'Head'
if ($null -eq $status -or $status -in 404,405,410,501) { $status = Read-Status 'Get' }
@{ httpStatus=$status } | ConvertTo-Json -Compress
