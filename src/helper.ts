const upscaleImgPath = (path: string) => path
  .replace(/\b(90x90|240x150|312x150|312x231|480x360|556x370)\b/g, '636x393')
  // .replace('312x223', '636x393');

export {
  upscaleImgPath
}
