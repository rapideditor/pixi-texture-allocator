declare module "Area" {
    /**
     * The orientation of an area indicates the axis along which it is split. This is a 1-bit field.
     *
     * @public
     */
    export enum AreaOrientation {
        HORIZONTAL = 0,
        VERTICAL = 1
    }
    /**
     * Alias for the 31-bit field texture-area type.
     *
     * @public
     */
    export type AreaField = number;
    /**
     * An area represents an oriented rectangular region. It is implemented as a 31-bit field. The open/close edges are
     * specified along its parent's orientation axis, i.e. if the parent is horizontal, the left and right edges are defined,
     * else if the parent is vertical, the top and bottom edges are defined. Similarly, the open/close edges of its
     * children will be along its own orientation axis.
     *
     * The orientation axes flip-flop along the hierarchy, i.e. an area's parent's orientation is always opposite to
     * the area's own orientation. This is because if the orientation were to be same, the area's children could be
     * "pulled up" to the parent making itself redundant.
     *
     * All four edges of an area can be retrieved from it and its parent.
     *
     * <table>
     *  <thead>
     *    <tr>
     *      <th>Field</th>
     *      <th>Bits</th>
     *      <th>Description</th>
     *    </tr>
     *  </thead>
     *  <tbody>
     *    <tr>
     *      <td>OPEN_OFFSET</td>
     *      <td>0-14</td>
     *      <td>
     *        The offset along the parent's axis at which the area begins. If orientation is horizontal,
     *        this is the left edge. If orientation is vertical, this is the top edge.
     *      </td>
     *    </tr>
     *    <tr>
     *      <td>CLOSE_OFFSET</td>
     *      <td>15-29</td>
     *      <td>
     *        The offset along the parent's axis at which the area ends. If orientation is horizontal,
     *        this is the right edge. If orientation is vertical, this is the bottom edge.
     *      </td>
     *    </tr>
     *    <tr>
     *      <td>ORIENTATION</td>
     *      <td>30</td>
     *      <td>
     *        The orientation of the area, which indicates the axis along it is split. The open and close
     *        offsets of its children are along this axis. See {@link AreaOrientation}.
     *      </td>
     *    </tr>
     *  </tbody>
     * </table>
     *
     * @public
     */
    export class Area {
        static makeArea(openOffset: number, closeOffset: number, orientation: number): number;
        static getOpenOffset(area: AreaField): number;
        static getCloseOffset(area: AreaField): number;
        static getOrientation(area: AreaField): AreaOrientation;
        static setOpenOffset(area: AreaField, offset: number): number;
        static setCloseOffset(area: AreaField, offset: number): number;
    }
}
declare module "AreaAllocator" {
    import type { Rectangle } from 'pixi.js';
    /**
     * @public
     * @typeParam N - The internal property for marking rectangles.
     */
    export interface AreaAllocator<N> {
        readonly width: number;
        readonly height: number;
        allocate(width: number, height: number): Rectangle & N;
        free(area: N): void;
    }
}
declare module "AtlasSource" {
    import { Renderer, TextureSource } from 'pixi.js';
    import type { Rectangle, Texture } from 'pixi.js';
    /**
     * Types of image sources supported by {@link AtlasSource}.
     *
     * @public
     */
    export type AtlasItemSource = HTMLImageElement | HTMLCanvasElement | ImageBitmap | ImageData | ArrayBufferView;
    /**
     * An item that is uploaded to the atlas texture.
     *
     * @public
     */
    export type AtlasItem = {
        /**
         * The location of the atlas item in the base-texture's space.
         */
        frame: Rectangle;
        /**
         * The source of the texture data.
         */
        source: AtlasItemSource;
        /**
         * This flags when the resource is to be re-uploaded.
         */
        dirtyId: number;
        /**
         * This flags when the resource is uploaded and update-to-date with the dirty ID.
         */
        updateId: number;
        /**
         * The texture holding this item.
         */
        texture: Texture;
    };
    /**
     * An {@code AtlasSource} is used by {@link AtlasAllocator} to manage texture sources.
     *
     * @public
     */
    export class AtlasSource extends TextureSource {
        /**
         * The list of managed texture sources in the atlas.
         */
        managedItems: AtlasItem[];
        uploadMethodId: string;
        /**
         * Creates an atlas resource.
         *
         * @param width
         * @param height
         */
        constructor(width: number, height: number);
    }
    /**
     * Registers the optimized atlas texture uploader for use in WebGL.
     *
     * @param renderer
     * @public
     */
    export function optimizeAtlasUploads(renderer: Renderer): void;
}
declare module "GuilloteneAllocator" {
    import { Rectangle } from 'pixi.js';
    import type { AreaAllocator } from "AreaAllocator";
    import type { AreaField } from "Area";
    /**
     * An allocator node is represented as a tuple. The zeroth element is the parent of the node. The first element
     * always exists and is the texture area it wholly represents. The second element is whether the rectangle
     * is allocated or free. The last element is optional and is the list
     * of its children.
     *
     * @public
     * @ignore
     */
    export type AreaNode = [AreaNode, AreaField, boolean] | [AreaNode, AreaField, AreaNode[]];
    /**
     * Pointer to guillotene node.
     *
     * @public
     * @ignore
     */
    export type AreaPtr = {
        __mem_area: AreaNode;
    };
    /**
     * @public
     * @ignore
     */
    export enum SPLIT_ORIENTATION {
        HOR = 0,
        VERT = 1,
        NONE = 2
    }
    /** @public */
    export class GuilloteneAllocator implements AreaAllocator<AreaPtr> {
        protected _root: AreaNode;
        private _width;
        private _height;
        constructor(width: number, height: number);
        /**
         * Allocates an area of the given `width` and `height`.
         *
         * @param width - The width required for the allocated area.
         * @param height - The height required for the allocated area.
         * @param rect - An optional `Rectangle` instance to put the resulting area frame into.
         * @return The rectangle frame of the area allocated.
         */
        allocate(width: number, height: number, rect?: Rectangle): Rectangle & AreaPtr;
        /**
         * Frees the area represented by the given area pointer. The original rectangle returned by
         * {@link GuilloteneAllocator#allocate} included this pointer (the `__mem_area` property).
         *
         * @param areaPtr
         */
        free(areaPtr: AreaPtr): void;
        get width(): number;
        get height(): number;
        /**
         * Returns the [area]{@link Area} data for the node.
         *
         * @param node
         * @returns The area data for the node.
         */
        protected getAreaField(node: AreaNode): AreaField;
        /**
         * Returns the rectangle covered by the area node.
         *
         * @param node - The node whose covered rectangular area is needed.
         * @param rect - An optional `Rectangle` instance to put the data in.
         * @return The rectangle covered by `node`.
         */
        protected getFrame(node: AreaNode, rect?: Rectangle): Rectangle;
        /**
         * Returns the parent of the area node.
         *
         * @param node
         * @return The parent of `node`
         */
        protected getParent(node: AreaNode): AreaNode;
        /**
         * Returns whether the given node has any children.
         *
         * @param node
         * @return Whether the given node has any children.
         */
        protected hasChildren(node: AreaNode): boolean;
        /**
         * Returns the children of the passed node, if any.
         *
         * @param node
         */
        protected getChildren(node: AreaNode): AreaNode[];
        protected addChild(parent: AreaNode, ...nodes: AreaNode[]): void;
        /**
         * Finds an area node with minimum width `aw` and minimum height `ah`.
         *
         * @param aw
         * @param ah
         */
        protected findArea(aw: number, ah: number): AreaNode;
        /**
         * The recursive implementation for {@link AreaAllocator#findArea}.
         *
         * @param rootArea
         * @param aw
         * @param ah
         */
        protected findAreaRecursive(rootArea: AreaNode, aw: number, ah: number): AreaNode;
        /**
         * Returns the orientation of the primary split of host.
         */
        protected splitOrientation(host: Rectangle, hole: Rectangle): SPLIT_ORIENTATION;
        protected split(area: AreaNode, areaFrame: Rectangle, holeFrame: Rectangle, orientation?: SPLIT_ORIENTATION): AreaNode;
        private splitPrimaryHorizontal;
        private splitPrimaryVertical;
        protected merge(area: AreaNode): void;
        private printState;
    }
}
declare module "TextureSlab" {
    import type { AreaAllocator } from "AreaAllocator";
    import type { Rectangle, Texture, TextureSource } from 'pixi.js';
    /**
     * An entry of an issued texture from a {@link TextureSlab}.
     *
     * @public
     */
    export type TextureEntry = {
        /**
         * The area returned by the area allocator, with the `__mem_area` key.
         */
        area: Rectangle;
        /**
         * The issued texture.
         */
        texture: Texture;
    };
    /**
     * A texture slab holds a managed base-texture that is used to issue allocated texture space. The
     * texture allocator maintains a pool of these texture slabs.
     *
     * @public
     */
    export type TextureSlab<T extends TextureSource> = {
        /**
         * The area allocator that issues texture space.
         */
        managedArea: AreaAllocator<any>;
        /**
         * The list of allocated textures and their area.
         */
        managedTextures: TextureEntry[];
        /**
         * The base-texture that holds all the issued textures.
         */
        slab: T;
    };
}
declare module "TextureAllocator" {
    import { Rectangle, Texture, TextureSource } from 'pixi.js';
    import type { TextureSlab } from "TextureSlab";
    /**
     * The texture allocator dynamically manages space on base-texture slabs. It can be used to generate
     * atlases on demand, which improve batching efficiency.
     *
     * @public
     */
    export abstract class TextureAllocator<S extends TextureSource, T extends Texture = Texture> {
        /**
         * The width of texture slabs.
         */
        readonly slabWidth: number;
        /**
         * The height of texture slabs.
         */
        readonly slabHeight: number;
        /**
         * The list of base-textures that are used to allocate texture space.
         */
        protected textureSlabs: TextureSlab<S>[];
        /**
         * @param slabWidth - The width of base-texture slabs. This should be at most 2048.
         * @param slabHeight - The height of base-texture slabs. This should be at most 2048.
         */
        constructor(slabWidth?: number, slabHeight?: number);
        get maxWidth(): number;
        get maxHeight(): number;
        /**
         * Allocates a texture from this allocator.
         *
         * If its existing slab pool has enough space, the texture is issued from one. Otherwise,
         * a new slab is created and the texture is issued from it. However, if the requested
         * dimensions are larger than slabs themselves, then `null` is always returned.
         *
         * To upload a texture source, you will have to create an atlas-managing {@link TextureSource}
         * yourself on the base-texture. The {@link AtlasAllocator} does this for you, while the
         * {@link CanvasTextureAllocator} can be used to draw on a canvas-based atlas.
         *
         * @param width - The width of the requested texture.
         * @param height - The height of the requested texture.
         * @param padding - The padding requested around the texture, to prevent bleeding.
         * @return The allocated texture, if successful; otherwise, `null`.
         */
        allocate(width: number, height: number, padding?: number): T;
        /**
         * Frees the texture and reclaims its space. It is assumed you will not use it again, and have
         * destroyed any resource uploading its data.
         *
         * @param texture
         * @throws When the texture was not located in this allocator.
         */
        free(texture: T): void;
        protected calculatePadding(width: number, height: number): number;
        /**
         * Creates a texture slab. Uses {@link this.createSlabSource} to initialize the texture data.
         */
        protected createSlab(): TextureSlab<S>;
        /**
         * Creates a new texture source to initialize a texture slab.
         */
        protected abstract createSlabSource(): S;
        /**
         * Creates a texture on the given base-texture at {@code frame}.
         *
         * @param source - The atlas source that will hold the texture's space.
         * @param frame - The frame in which the texture will be stored.
         */
        protected createTexture(source: S, frame: Rectangle): T;
        /**
         * Issues a texture from the given texture slab, if possible.
         *
         * @param slab - The texture slab to allocate frame.
         * @param width - The width of the requested texture.
         * @param height - The height of the requested texture.
         * @param padding - Padding required around the texture.
         * @return The issued texture, if successful; otherwise, `null`.
         */
        protected issueTexture(slab: TextureSlab<S>, width: number, height: number, padding?: number): T;
    }
}
declare module "AtlasAllocator" {
    import { AtlasSource } from "AtlasSource";
    import { Texture } from 'pixi.js';
    import { TextureAllocator } from "TextureAllocator";
    import type { AtlasItemSource } from "AtlasSource";
    import type { Renderer } from 'pixi.js';
    /**
     * This texture allocator auto-manages the base-texture with an {@link AtlasSource}. You can also
     * pass a texture source to `allocate`, mimicing {@link Texture.from} functionality.
     *
     * @public
     */
    export class AtlasAllocator extends TextureAllocator<AtlasSource> {
        /**
         * Creates an atlas allocator.
         *
         * @param renderer - The renderer to register the atlas source uploader for. This is optional, but
         *  the atlas textures won't work without calling {@link optimizeAtlasUploads} on the renderer.
         * @param slabWidth
         * @param slabHeight
         */
        constructor(renderer: Renderer | null, slabWidth?: number, slabHeight?: number);
        /**
         * Creates a texture slab backed by an {@link AtlasSource}.
         */
        protected createSlabSource(): AtlasSource;
        /**
         * Allocates a texture backed by the given atlas source, with the given padding.
         *
         * @override
         * @param width
         * @param height
         * @param padding
         * @param source
         */
        allocate(width: number, height: number, padding?: number, source?: AtlasItemSource): Texture;
        /**
         * Allocates a texture backed by the given source, with default padding.
         *
         * @param width
         * @param height
         * @param source
         */
        allocate(width: number, height: number, source?: AtlasItemSource): Texture;
        free(texture: Texture): void;
    }
}
declare module "CanvasTextureAllocator" {
    import { CanvasSource } from 'pixi.js';
    import { TextureAllocator } from "TextureAllocator";
    /**
     * This allocator issues texture backed by a canvas. You can draw on to that canvas to source
     * each texture.
     *
     * @public
     */
    export class CanvasTextureAllocator extends TextureAllocator<CanvasSource> {
        /**
         * Creates a texture slab backed by a canvas.
         */
        protected createSlabSource(): CanvasSource;
    }
}
declare module "RenderTextureAllocator" {
    import { RenderTexture, TextureSource } from 'pixi.js';
    import { TextureAllocator } from "TextureAllocator";
    import type { Rectangle } from 'pixi.js';
    /**
     * This allocator issues render-textures, and is otherwise just like {@link TextureAllocator}.
     *
     * @public
     */
    export class RenderTextureAllocator extends TextureAllocator<TextureSource, RenderTexture> {
        /**
         * Creates a texture slab backed by a base render-texture.
         */
        protected createSlabSource(): TextureSource;
        /**
         * Creates a render-texture from the given base render-texture.
         *
         * @param source
         * @param frame
         */
        protected createTexture(source: TextureSource, frame: Rectangle): RenderTexture;
    }
}
declare module "index" {
    export * from "AtlasAllocator";
    export * from "AtlasSource";
    export * from "CanvasTextureAllocator";
    export * from "RenderTextureAllocator";
    export * from "TextureAllocator";
    export * from "TextureSlab";
}
//# sourceMappingURL=index.d.ts.map