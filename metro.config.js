// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// Thêm extension cho code (sourceExts)
;["js", "jsx", "json", "ts", "tsx", "cjs", "mjs"].forEach((ext) => {
  if (config.resolver.sourceExts.indexOf(ext) === -1) {
    config.resolver.sourceExts.push(ext)
  }
})

// Thêm extension cho asset (assetExts) - Bao gồm 3D models và media files
;[
  "glb",
  "gltf",
  "obj",
  "fbx",
  "dae",
  "3ds",
  "ply",
  "stl",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "bmp",
  "webp",
  "svg",
  "mp4",
  "mov",
  "avi",
  "webm",
  "mp3",
  "wav",
  "ogg",
  "ttf",
  "otf",
  "woff",
  "woff2",
].forEach((ext) => {
  if (config.resolver.assetExts.indexOf(ext) === -1) {
    config.resolver.assetExts.push(ext)
  }
})

module.exports = withNativeWind(config, { input: "./app/gobals.css" })
