import { TextureAllocator } from './TextureAllocator';
import { TextureSlab } from './TextureSlab';
/**
 * This allocator issues texture backed by a canvas. You can draw on to that canvas to soruce
 * each texture.
 *
 * @public
 */
export declare class CanvasTextureAllocator extends TextureAllocator {
    /**
     * Creates a texture slab backed by a canvas.
     */
    protected createSlab(): TextureSlab;
}
