import { Texture } from '@pixi/core';
import { TextureAllocator } from './TextureAllocator';
import { TextureSlab } from './TextureSlab';
import type { AtlasResourceSource } from './AtlasResource';
/**
 * This texture allocator auto-manages the base-texture with an {@link AtlasResource}. You can also
 * pass a texture source to `allocate`, mimicing {@link Texture.from} functionality.
 *
 * @public
 */
export declare class AtlasAllocator extends TextureAllocator {
    /**
     * Creates a texture slab backed by an {@link AtlasResource}.
     */
    protected createSlab(): TextureSlab;
    /**
     * Allocates a texture backed by the given atlas source, with the given padding.
     *
     * @override
     * @param width
     * @param height
     * @param padding
     * @param source
     */
    allocate(width: number, height: number, padding?: number, source?: AtlasResourceSource): Texture;
    /**
     * Allocates a texture backed by the given source, with default padding.
     *
     * @param width
     * @param height
     * @param source
     */
    allocate(width: number, height: number, source?: AtlasResourceSource): Texture;
    free(texture: Texture): void;
}
