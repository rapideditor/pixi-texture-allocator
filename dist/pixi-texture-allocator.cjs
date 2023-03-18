"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Area: () => Area,
  AreaOrientation: () => AreaOrientation,
  AtlasAllocator: () => AtlasAllocator,
  AtlasResource: () => AtlasResource,
  CanvasTextureAllocator: () => CanvasTextureAllocator,
  GuilloteneAllocator: () => GuilloteneAllocator,
  RenderTextureAllocator: () => RenderTextureAllocator,
  SPLIT_ORIENTATION: () => SPLIT_ORIENTATION,
  TextureAllocator: () => TextureAllocator
});
module.exports = __toCommonJS(src_exports);

// src/Area.ts
var AreaOrientation = /* @__PURE__ */ ((AreaOrientation2) => {
  AreaOrientation2[AreaOrientation2["HORIZONTAL"] = 0] = "HORIZONTAL";
  AreaOrientation2[AreaOrientation2["VERTICAL"] = 1] = "VERTICAL";
  return AreaOrientation2;
})(AreaOrientation || {});
var Area = class {
  static makeArea(openOffset, closeOffset, orientation) {
    return openOffset | closeOffset << 15 | orientation << 30;
  }
  static getOpenOffset(area) {
    return area & (1 << 15) - 1;
  }
  static getCloseOffset(area) {
    return area >> 15 & (1 << 15) - 1;
  }
  static getOrientation(area) {
    return area >> 30 & 1;
  }
  static setOpenOffset(area, offset) {
    return Area.makeArea(
      offset,
      Area.getCloseOffset(area),
      Area.getOrientation(area)
    );
  }
  static setCloseOffset(area, offset) {
    return Area.makeArea(
      Area.getOpenOffset(offset),
      offset,
      Area.getOrientation(area)
    );
  }
};

// src/AtlasResource.ts
var import_constants = require("@pixi/constants");
var import_core = require("@pixi/core");
var AtlasResource = class extends import_core.Resource {
  /**
   * Creates an atlas resource.
   *
   * @param width
   * @param height
   */
  constructor(width, height) {
    super(width, height);
    this.managedItems = [];
  }
  /**
   * Uploads the atlas.
   *
   * @param renderer
   * @param baseTexture
   * @param glTexture
   */
  upload(renderer, baseTexture, glTexture) {
    const gl = renderer.gl;
    const width = baseTexture.realWidth;
    const height = baseTexture.realHeight;
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, baseTexture.alphaMode === import_constants.ALPHA_MODES.UNPACK);
    if (glTexture.width !== width || glTexture.height !== height) {
      glTexture.width = width;
      glTexture.height = height;
      gl.texImage2D(
        baseTexture.target,
        0,
        baseTexture.format,
        width,
        height,
        0,
        baseTexture.format,
        baseTexture.type,
        void 0
      );
    }
    const items = this.managedItems;
    for (let i = 0, j = items.length; i < j; i++) {
      this.uploadItem(
        renderer,
        baseTexture.target,
        baseTexture.format,
        baseTexture.type,
        items[i]
      );
    }
    return true;
  }
  /**
   * Uploads the atlas item to the GPU.
   *
   * @param renderer - The renderer holding the WebGL context.
   * @param target - The binding point of the base-texture.
   * @param format - The format of the base-texture.
   * @param type - The type of the base-texture data.
   * @param item - The item to upload.
   */
  uploadItem(renderer, target, format, type, item) {
    if (item.updateId === item.dirtyId) {
      return;
    }
    const gl = renderer.gl;
    const source = item.source;
    const frame = item.frame;
    gl.texSubImage2D(
      target,
      0,
      frame.x,
      frame.y,
      frame.width,
      frame.height,
      format,
      type,
      source
    );
    item.updateId = item.dirtyId;
  }
};

// src/AtlasAllocator.ts
var import_core3 = require("@pixi/core");

// src/GuilloteneAllocator.ts
var import_math = require("@pixi/math");
var SPLIT_ORIENTATION = /* @__PURE__ */ ((SPLIT_ORIENTATION2) => {
  SPLIT_ORIENTATION2[SPLIT_ORIENTATION2["HOR"] = 0] = "HOR";
  SPLIT_ORIENTATION2[SPLIT_ORIENTATION2["VERT"] = 1] = "VERT";
  SPLIT_ORIENTATION2[SPLIT_ORIENTATION2["NONE"] = 2] = "NONE";
  return SPLIT_ORIENTATION2;
})(SPLIT_ORIENTATION || {});
var tempRect = new import_math.Rectangle();
var GuilloteneAllocator = class {
  constructor(width, height) {
    this._width = width;
    this._height = height;
    this._root = [
      null,
      Area.makeArea(0, this._height, 0 /* HORIZONTAL */),
      false
    ];
  }
  /**
   * Allocates an area of the given `width` and `height`.
   *
   * @param width - The width required for the allocated area.
   * @param height - The height required for the allocated area.
   * @param rect - An optional `Rectangle` instance to put the resulting area frame into.
   * @return The rectangle frame of the area allocated.
   */
  allocate(width, height, rect) {
    const area = this.findArea(width, height);
    if (!area) {
      return null;
    }
    if (!rect) {
      rect = new import_math.Rectangle();
    }
    this.getFrame(area, rect);
    const hole = new import_math.Rectangle(rect.x, rect.y, width, height);
    const node = this.split(area, rect, hole);
    rect.copyFrom(hole);
    rect.__mem_area = node;
    return rect;
  }
  /**
   * Frees the area represented by the given area pointer. The original rectangle returned by
   * {@link GuilloteneAllocator#allocate} included this pointer (the `__mem_area` property).
   *
   * @param areaPtr
   */
  free(areaPtr) {
    const area = areaPtr.__mem_area;
    area[2] = false;
    this.merge(area);
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  /**
   * Returns the [area]{@link Area} data for the node.
   *
   * @param node
   * @returns The area data for the node.
   */
  getAreaField(node) {
    return node[1];
  }
  /**
   * Returns the rectangle covered by the area node.
   *
   * @param node - The node whose covered rectangular area is needed.
   * @param rect - An optional `Rectangle` instance to put the data in.
   * @return The rectangle covered by `node`.
   */
  getFrame(node, rect) {
    if (!rect) {
      rect = new import_math.Rectangle();
    }
    const nodeArea = this.getAreaField(node);
    const nodeParent = this.getParent(node);
    const nodeOrientation = Area.getOrientation(nodeArea);
    const nodeOpen = Area.getOpenOffset(nodeArea);
    const nodeClose = Area.getCloseOffset(nodeArea);
    const parentOpen = nodeParent ? Area.getOpenOffset(nodeParent[1]) : 0;
    const parentClose = nodeParent ? Area.getCloseOffset(nodeParent[1]) : this._width;
    if (nodeOrientation) {
      rect.x = nodeOpen;
      rect.y = parentOpen;
      rect.width = nodeClose - rect.x;
      rect.height = parentClose - parentOpen;
    } else {
      rect.x = parentOpen;
      rect.y = nodeOpen;
      rect.width = parentClose - rect.x;
      rect.height = nodeClose - rect.y;
    }
    return rect;
  }
  /**
   * Returns the parent of the area node.
   *
   * @param node
   * @return The parent of `node`
   */
  getParent(node) {
    return node[0];
  }
  /**
   * Returns whether the given node has any children.
   *
   * @param node
   * @return Whether the given node has any children.
   */
  hasChildren(node) {
    return Array.isArray(node[2]) && node[2].length !== 0;
  }
  /**
   * Returns the children of the passed node, if any.
   *
   * @param node
   */
  getChildren(node) {
    if (!Array.isArray(node[2])) {
      throw new Error("Children don't exist");
    }
    return node[2];
  }
  addChild(parent, ...nodes) {
    parent[2] = Array.isArray(parent[2]) ? parent[2] : [];
    parent[2].push(...nodes);
  }
  /**
   * Finds an area node with minimum width `aw` and minimum height `ah`.
   *
   * @param aw
   * @param ah
   */
  findArea(aw, ah) {
    return this.findAreaRecursive(this._root, aw, ah);
  }
  /**
   * The recursive implementation for {@link AreaAllocator#findArea}.
   *
   * @param rootArea
   * @param aw
   * @param ah
   */
  findAreaRecursive(rootArea, aw, ah) {
    const frame = this.getFrame(rootArea, tempRect);
    if (frame.width < aw || frame.height < ah) {
      return null;
    }
    if (!this.hasChildren(rootArea)) {
      const dx = frame.width - aw;
      const dy = frame.height - ah;
      if (dx < 0 || dy < 0 || rootArea[2]) {
        return null;
      }
      return rootArea;
    }
    const children = this.getChildren(rootArea);
    let bestCandidate = null;
    let bestCandidateScore = Infinity;
    for (let i = 0, j = children.length; i < j; i++) {
      const candidate = this.findAreaRecursive(children[i], aw, ah);
      if (!candidate) {
        continue;
      }
      const candidateFrame = this.getFrame(candidate, tempRect);
      const dx = candidateFrame.width - aw;
      const dy = candidateFrame.height - ah;
      if (dx < 0 || dy < 0) {
        continue;
      }
      if (!dx && !dy) {
        return candidate;
      }
      const score = Math.min(dx, dy);
      if (bestCandidateScore > score) {
        bestCandidate = candidate;
        bestCandidateScore = score;
      }
    }
    return bestCandidate;
  }
  /**
   * Returns the orientation of the primary split of host.
   */
  splitOrientation(host, hole) {
    if (hole.width === host.width && hole.height === host.height) {
      return 2 /* NONE */;
    }
    if (hole.width === host.width) {
      return 1 /* VERT */;
    }
    if (hole.height === host.height) {
      return 0 /* HOR */;
    }
    const horAreaDiff = Math.abs(
      // (Primary) Right
      (host.width - hole.width) * host.height - // (Secondary) Bottom
      hole.width * (host.height - hole.height)
    );
    const verAreaDiff = Math.abs(
      // (Primary) Bottom
      host.width * (host.height - hole.height) - (host.width - hole.width) * hole.height
    );
    if (horAreaDiff > verAreaDiff) {
      return 0 /* HOR */;
    } else {
      return 1 /* VERT */;
    }
  }
  split(area, areaFrame, holeFrame, orientation = this.getParent(area) ? this.splitOrientation(areaFrame, holeFrame) : 0 /* HOR */) {
    if (area[2] === true) {
      throw new Error("Cannot deallocate");
    }
    if (orientation === 2 /* NONE */) {
      area[2] = true;
      return area;
    }
    return this[orientation === 0 /* HOR */ ? "splitPrimaryHorizontal" : "splitPrimaryVertical"](area, areaFrame, holeFrame);
  }
  splitPrimaryHorizontal(area, areaFrame, holeFrame) {
    const field = this.getAreaField(area);
    const axis = Area.getOrientation(field);
    const parent = this.getParent(area);
    if (this.hasChildren(area)) {
      throw new Error("Can't split non-leaf node");
    }
    const firstChild = [
      area,
      Area.makeArea(
        areaFrame.left,
        areaFrame.x + holeFrame.width,
        1 /* VERTICAL */
      ),
      []
    ];
    const secondChild = [
      area,
      Area.makeArea(
        areaFrame.x + holeFrame.width,
        areaFrame.right,
        1 /* VERTICAL */
      ),
      false
    ];
    if (axis === 0 /* HORIZONTAL */) {
      this.addChild(area, firstChild, secondChild);
    } else {
      const i = this.getChildren(parent).indexOf(area);
      firstChild[0] = parent;
      secondChild[0] = parent;
      this.getChildren(parent).splice(i, 1, firstChild, secondChild);
    }
    if (holeFrame.height !== areaFrame.height) {
      const secondaryFirstChild = [
        firstChild,
        Area.makeArea(
          areaFrame.top,
          areaFrame.y + holeFrame.height,
          0 /* HORIZONTAL */
        ),
        true
      ];
      const secondarySecondChild = [
        firstChild,
        Area.makeArea(
          areaFrame.y + holeFrame.height,
          areaFrame.bottom,
          0 /* HORIZONTAL */
        ),
        false
      ];
      this.addChild(firstChild, secondaryFirstChild, secondarySecondChild);
      return secondaryFirstChild;
    } else {
      firstChild[2] = true;
    }
    return firstChild;
  }
  splitPrimaryVertical(area, areaFrame, holeFrame) {
    const field = this.getAreaField(area);
    const axis = Area.getOrientation(field);
    const parent = this.getParent(area);
    if (this.hasChildren(area)) {
      throw new Error("Can't split non-leaf node");
    }
    const primaryFirstChild = [
      area,
      Area.makeArea(
        areaFrame.top,
        areaFrame.y + holeFrame.height,
        0 /* HORIZONTAL */
      ),
      []
    ];
    const primarySecondChild = [
      area,
      Area.makeArea(
        areaFrame.y + holeFrame.height,
        areaFrame.bottom,
        0 /* HORIZONTAL */
      ),
      false
    ];
    if (axis === 1 /* VERTICAL */) {
      this.addChild(area, primaryFirstChild, primarySecondChild);
    } else {
      const i = this.getChildren(parent).indexOf(area);
      primaryFirstChild[0] = parent;
      primarySecondChild[0] = parent;
      this.getChildren(parent).splice(i, 1, primaryFirstChild, primarySecondChild);
    }
    if (holeFrame.width !== areaFrame.height) {
      const secondaryFirstChild = [
        primaryFirstChild,
        Area.makeArea(
          areaFrame.left,
          areaFrame.x + holeFrame.width,
          1 /* VERTICAL */
        ),
        true
      ];
      const secondarySecondChild = [
        primaryFirstChild,
        Area.makeArea(
          areaFrame.x + holeFrame.width,
          areaFrame.right,
          1 /* VERTICAL */
        ),
        false
      ];
      this.addChild(primaryFirstChild, secondaryFirstChild, secondarySecondChild);
      return secondaryFirstChild;
    } else {
      primaryFirstChild[2] = true;
    }
    return primaryFirstChild;
  }
  merge(area) {
    if (this.hasChildren(area)) {
      throw new Error("Cannot merge a non-leaf node");
    }
    const parent = this.getParent(area);
    if (!parent) {
      return;
    }
    const siblings = this.getChildren(parent);
    const i = siblings.indexOf(area);
    const leftSibling = siblings[i - 1];
    const rightSibling = siblings[i + 1];
    if (rightSibling && rightSibling[2] === false) {
      area[1] = Area.setCloseOffset(area[1], Area.getCloseOffset(rightSibling[1]));
      siblings.splice(i + 1, 1);
    }
    if (leftSibling && leftSibling[2] === false) {
      area[1] = Area.setOpenOffset(area[1], Area.getOpenOffset(leftSibling[1]));
      siblings.splice(i - 1, 1);
    }
    if (siblings.length === 1) {
      parent[2] = false;
      this.merge(parent);
    }
  }
  printState(area) {
    if (!this.hasChildren(area)) {
      console.log({ ...this.getFrame(area) }, area[2]);
    } else {
      this.getChildren(area).forEach((n) => this.printState(n));
    }
  }
};

// src/TextureAllocator.ts
var import_core2 = require("@pixi/core");
var import_math2 = require("@pixi/math");
var tempRect2 = new import_math2.Rectangle();
var TextureAllocator = class {
  /**
   * @param slabWidth - The width of base-texture slabs. This should be at most 2048.
   * @param slabHeight - The height of base-texture slabs. This should be at most 2048.
   */
  constructor(slabWidth = 2048, slabHeight = 2048) {
    this.slabWidth = slabWidth;
    this.slabHeight = slabHeight;
    this.textureSlabs = [];
  }
  get maxWidth() {
    return this.slabWidth - 2 * this.calculatePadding(this.slabWidth, this.slabHeight);
  }
  get maxHeight() {
    return this.slabHeight - 2 * this.calculatePadding(this.slabWidth, this.slabHeight);
  }
  /**
   * Allocates a texture from this allocator.
   *
   * If its existing slab pool has enough space, the texture is issued from one. Otherwise,
   * a new slab is created and the texture is issued from it. However, if the requested
   * dimensions are larger than slabs themselves, then `null` is always returned.
   *
   * To upload a texture source, you will have to create an atlas-managing {@link Resource}
   * yourself on the base-texture. The {@link AtlasAllocator} does this for you, while the
   * {@link CanvasTextureAllocator} can be used to draw on a canvas-based atlas.
   *
   * @param width - The width of the requested texture.
   * @param height - The height of the requested texture.
   * @param padding - The padding requested around the texture, to prevent bleeding.
   * @return The allocated texture, if successful; otherwise, `null`.
   */
  allocate(width, height, padding = this.calculatePadding(width, height)) {
    if (width + 2 * padding > this.slabWidth || height + 2 * padding > this.slabHeight) {
      return null;
    }
    const slabs = this.textureSlabs;
    for (let i = 0, j = slabs.length; i < j; i++) {
      const slab2 = slabs[i];
      const texture = this.issueTexture(slab2, width, height, padding);
      if (texture) {
        return texture;
      }
    }
    const slab = this.createSlab();
    this.textureSlabs.unshift(slab);
    return this.issueTexture(slab, width, height, padding);
  }
  /**
   * Frees the texture and reclaims its space. It is assumed you will not use it again, and have
   * destroyed any resource uploading its data.
   *
   * @param texture
   * @throws When the texture was not located in this allocator.
   */
  free(texture) {
    const baseTexture = texture.baseTexture;
    const slab = this.textureSlabs.find((sl) => sl.slab === baseTexture);
    if (!slab) {
      throw new Error("The texture cannot be freed because its base-texture is not pooled by this allocator. This is either a bug in TextureAllocator or you tried to free a texture that was never allocated by one.");
    }
    const textureEntry = slab.managedTextures.find((entry) => entry.texture === texture);
    if (!textureEntry) {
      throw new Error("The texture cannot be freed because it was not found in the managed list of issued textures on its slab. This may be because you duplicated this texture or a bug in TextureAllocator");
    }
    slab.managedArea.free(textureEntry.area);
    slab.managedTextures.splice(slab.managedTextures.indexOf(textureEntry), 1);
  }
  calculatePadding(width, height) {
    const dimen = Math.max(width, height);
    if (dimen < 64) {
      return 2;
    } else if (dimen < 128) {
      return 4;
    } else if (dimen < 1024) {
      return 8;
    } else {
      return 16;
    }
  }
  /**
   * Creates a texture slab. The slab's base-texture is not backed by any resource. You
   * will have to manage that yourself. See {@link AtlasAllocator} or {@link CanvasTextureAllocator}
   * for better resource semantics.
   */
  createSlab() {
    return {
      managedArea: new GuilloteneAllocator(this.slabWidth, this.slabHeight),
      managedTextures: [],
      slab: new import_core2.BaseTexture(
        null,
        {
          width: this.slabWidth,
          height: this.slabHeight
        }
      )
    };
  }
  /**
   * Creates a texture on the given base-texture at {@code frame}.
   *
   * @param baseTexture - The base texture that will hold the texture's space.
   * @param frame - The frame in which the texture will be stored.
   */
  createTexture(baseTexture, frame) {
    return new import_core2.Texture(baseTexture, frame);
  }
  /**
   * Issues a texture from the given texture slab, if possible.
   *
   * @param slab - The texture slab to allocate frame.
   * @param width - The width of the requested texture.
   * @param height - The height of the requested texture.
   * @param padding - Padding required around the texture.
   * @return The issued texture, if successful; otherwise, `null`.
   */
  issueTexture(slab, width, height, padding = 0) {
    const area = slab.managedArea.allocate(width + 2 * padding, height + 2 * padding);
    if (!area) {
      return null;
    }
    tempRect2.copyFrom(area);
    tempRect2.pad(-padding);
    const baseTexture = slab.slab;
    const issuedTexture = this.createTexture(baseTexture, tempRect2.clone());
    slab.managedTextures.push({
      area,
      texture: issuedTexture
    });
    return issuedTexture;
  }
};

// src/AtlasAllocator.ts
var AtlasAllocator = class extends TextureAllocator {
  /**
   * Creates a texture slab backed by an {@link AtlasResource}.
   */
  createSlab() {
    return {
      managedArea: new GuilloteneAllocator(this.slabWidth, this.slabHeight),
      managedTextures: [],
      slab: new import_core3.BaseTexture(
        new AtlasResource(this.slabWidth, this.slabHeight),
        {
          width: this.slabWidth,
          height: this.slabHeight
        }
      )
    };
  }
  allocate(width, height, paddingOrSource, source) {
    let padding;
    if (typeof paddingOrSource === "number") {
      padding = paddingOrSource;
    } else {
      padding = this.calculatePadding(width, height);
      source = paddingOrSource;
    }
    const texture = super.allocate(width, height, padding);
    if (source) {
      const atlas = texture.baseTexture.resource;
      const item = {
        frame: texture.frame,
        source,
        // dirtyId !== updateId only if image loaded
        dirtyId: source instanceof HTMLImageElement && !source.complete ? -1 : 0,
        updateId: -1,
        texture
      };
      atlas.managedItems.push(item);
      if (source instanceof HTMLImageElement && !source.complete) {
        source.addEventListener("load", () => {
          if (texture.baseTexture.valid && !texture.baseTexture.destroyed && atlas.managedItems.indexOf(item) >= 0) {
            item.dirtyId++;
            texture.baseTexture.update();
          }
        });
      }
      texture.baseTexture.update();
    }
    return texture;
  }
  free(texture) {
    super.free(texture);
    const atlas = texture.baseTexture.resource;
    const item = atlas.managedItems.find((item2) => item2.texture === texture);
    if (item) {
      atlas.managedItems.splice(atlas.managedItems.indexOf(item), 1);
    }
  }
};

// src/CanvasTextureAllocator.ts
var import_core4 = require("@pixi/core");
var CanvasTextureAllocator = class extends TextureAllocator {
  /**
   * Creates a texture slab backed by a canvas.
   */
  createSlab() {
    const canvas = document.createElement("canvas");
    canvas.width = this.slabWidth;
    canvas.height = this.slabHeight;
    return {
      managedArea: new GuilloteneAllocator(this.slabWidth, this.slabHeight),
      managedTextures: [],
      slab: new import_core4.BaseTexture(canvas, {
        width: this.slabWidth,
        height: this.slabHeight
      })
    };
  }
};

// src/RenderTextureAllocator.ts
var import_core5 = require("@pixi/core");
var RenderTextureAllocator = class extends TextureAllocator {
  /**
   * Creates a texture slab backed by a base render-texture.
   */
  createSlab() {
    return {
      managedArea: new GuilloteneAllocator(this.slabWidth, this.slabHeight),
      managedTextures: [],
      slab: new import_core5.BaseRenderTexture({
        width: this.slabWidth,
        height: this.slabHeight
      })
    };
  }
  /**
   * Creates a render-texture from the given base render-texture.
   *
   * @param baseTexture
   * @param frame
   */
  createTexture(baseTexture, frame) {
    return new import_core5.RenderTexture(baseTexture, frame);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Area,
  AreaOrientation,
  AtlasAllocator,
  AtlasResource,
  CanvasTextureAllocator,
  GuilloteneAllocator,
  RenderTextureAllocator,
  SPLIT_ORIENTATION,
  TextureAllocator
});
//# sourceMappingURL=pixi-texture-allocator.cjs.map
