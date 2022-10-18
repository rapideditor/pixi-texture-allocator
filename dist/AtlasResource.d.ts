import { BaseTexture, GLTexture, Resource, Renderer } from '@pixi/core';
import type { Rectangle } from '@pixi/math';
import type { Texture } from '@pixi/core';
/**
 * Types of image sources supported by {@link AtlasResource}.
 *
 * @public
 */
export declare type AtlasResourceSource = HTMLImageElement | HTMLCanvasElement | ImageBitmap | ImageData | ArrayBufferView;
/**
 * An item that is uploaded to the atlas texture.
 *
 * @public
 */
export declare type AtlasResourceItem = {
    /**
     * The location of the atlas item in the base-texture's space.
     */
    frame: Rectangle;
    /**
     * The source of the texture data.
     */
    source: AtlasResourceSource;
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
 * An {@code AtlasResource} is used by {@link AtlasAllocator} to manage texture sources
 *
 * @public
 */
export declare class AtlasResource extends Resource {
    /**
     * The list of managed resources in the atlas.
     */
    managedItems: AtlasResourceItem[];
    /**
     * Creates an atlas resource.
     *
     * @param width
     * @param height
     */
    constructor(width: number, height: number);
    /**
     * Uploads the atlas.
     *
     * @param renderer
     * @param baseTexture
     * @param glTexture
     */
    upload(renderer: Renderer, baseTexture: BaseTexture, glTexture: GLTexture): boolean;
    /**
     * Uploads the atlas item to the GPU.
     *
     * @param renderer - The renderer holding the WebGL context.
     * @param target - The binding point of the base-texture.
     * @param format - The format of the base-texture.
     * @param type - The type of the base-texture data.
     * @param item - The item to upload.
     */
    protected uploadItem(renderer: Renderer, target: number, format: number, type: number, item: AtlasResourceItem): void;
}
