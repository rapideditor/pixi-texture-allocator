"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
module.exports = __toCommonJS(src_exports);
__reExport(src_exports, require("./Area"), module.exports);
__reExport(src_exports, require("./AreaAllocator"), module.exports);
__reExport(src_exports, require("./AtlasAllocator"), module.exports);
__reExport(src_exports, require("./AtlasResource"), module.exports);
__reExport(src_exports, require("./CanvasTextureAllocator"), module.exports);
__reExport(src_exports, require("./GuilloteneAllocator"), module.exports);
__reExport(src_exports, require("./RenderTextureAllocator"), module.exports);
__reExport(src_exports, require("./TextureAllocator"), module.exports);
__reExport(src_exports, require("./TextureSlab"), module.exports);
//# sourceMappingURL=pixi-texture-allocator.cjs.map
