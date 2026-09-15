// 仅将现有品牌资产按原色排成参考表，供图片生成识别；不绘制网站 UI。
const fs = require('node:fs');
const path = require('node:path');
// 历史素材工具不属于网站依赖；调用者可指定已有 sharp 模块的位置。
const sharp = require(process.env.AIGUIDE_SHARP_MODULE || 'sharp');
const root = __dirname;
const brands = path.resolve(root, '../../public/brands');
const items = [
  ['ByteDance / company', path.join(root, 'bytedance-company-reference.svg')],
  ['Anthropic / company', path.join(root, 'anthropic-company-reference.svg')],
  ['OpenAI / company', path.join(brands, 'openai.svg')],
  ['Google / company', path.join(brands, 'google-company.png')],
  ['Doubao Work / app', path.join(root, 'doubao-work-local-icon-reference.png')],
  ['Doubao / app', path.join(brands, 'doubao.svg')],
  ['ChatGPT / app', path.join(brands, 'openai.svg')],
  ['Codex / coding', path.join(brands, 'codex.svg')],
  ['Claude / product family', path.join(brands, 'anthropic.svg')],
  ['Claude Code / coding', path.join(brands, 'claudecode.svg')],
  ['Gemini / product family', path.join(brands, 'google.svg')],
  ['Gemini CLI / terminal', path.join(brands, 'geminicli.svg')],
];
async function main() {
  const layers = [];
  for (let index = 0; index < items.length; index++) {
    const [label, file] = items[index];
    const x = index % 4 * 300;
    const y = Math.floor(index / 4) * 250;
    const input = file.endsWith('.svg')
      ? Buffer.from(fs.readFileSync(file, 'utf8').replace(/width="1em"/, 'width="144"').replace(/height="1em"/, 'height="144"'))
      : fs.readFileSync(file);
    const icon = await sharp(input).resize(128, 128, {fit: 'contain', background: '#ffffff'}).png().toBuffer();
    layers.push({input: icon, left: x + 86, top: y + 30});
    const caption = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="60"><text x="150" y="28" text-anchor="middle" font-family="Arial" font-size="18" fill="#17233c">${index + 1}. ${label}</text></svg>`;
    layers.push({input: Buffer.from(caption), left: x, top: y + 178});
  }
  const output = path.join(root, 'aiguide-discovery-brand-reference.png');
  await sharp({create: {width: 1200, height: 750, channels: 4, background: '#ffffff'}}).composite(layers).png().toFile(output);
  console.log(output);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
