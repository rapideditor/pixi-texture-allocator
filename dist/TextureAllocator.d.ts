import { BaseTexture, Texture } from '@pixi/core';
import { Rectangle } from '@pixi/math';
import type { TextureSlab } from './TextureSlab';
/**
 * The texture allocator dynamically manages space on base-texture slabs. It can be used to generate
 * atlases on demand, which improve batching efficiency.
 *
 * @public
 */
export declare class TextureAllocator<T extends Texture = Texture> {
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
    protected textureSlabs: TextureSlab[];
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
     * To upload a texture source, you will have to create an atlas-managing {@link Resource}
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
     * Creates a texture slab. The slab's base-texture is not backed by any resource. You
     * will have to manage that yourself. See {@link AtlasAllocator} or {@link CanvasTextureAllocator}
     * for better resource semantics.
     */
    protected createSlab(): TextureSlab;
    /**
     * Creates a texture on the given base-texture at {@code frame}.
     *
     * @param baseTexture - The base texture that will hold the texture's space.
     * @param frame - The frame in which the texture will be stored.
     */
    protected createTexture(baseTexture: BaseTexture, frame: Rectangle): T;
    /**
     * Issues a texture from the given texture slab, if possible.
     *
     * @param slab - The texture slab to allocate frame.
     * @param width - The width of the requested texture.
     * @param height - The height of the requested texture.
     * @param padding - Padding required around the texture.
     * @return The issued texture, if successful; otherwise, `null`.
     */
    protected issueTexture(slab: TextureSlab, width: number, height: number, padding?: number): T;
}
