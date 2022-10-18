import { RenderTexture } from '@pixi/core';
import { TextureAllocator } from './TextureAllocator';
import type { BaseTexture } from '@pixi/core';
import type { Rectangle } from '@pixi/math';
import type { TextureSlab } from './TextureSlab';
/**
 * This allocator issues render-textures, and is otherwise just like {@link TextureAllocator}.
 *
 * @public
 */
export declare class RenderTextureAllocator extends TextureAllocator<RenderTexture> {
    /**
     * Creates a texture slab backed by a base render-texture.
     */
    protected createSlab(): TextureSlab;
    /**
     * Creates a render-texture from the given base render-texture.
     *
     * @param baseTexture
     * @param frame
     */
    protected createTexture(baseTexture: BaseTexture, frame: Rectangle): RenderTexture;
}
