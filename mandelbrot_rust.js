import Mandelbrot from "./mandelbrot.js"
import init, { calc } from "./rust/pkg/rust.js"

export default class MandelbrotRust extends Mandelbrot {
    async doDraw() {
        await init()
        const data = calc(this.pixel, this.scale, this.centerX, this.centerY)
        const blob = new Blob([data])
        createImageBitmap(blob).then(bitmap => {
            this.ctx.drawImage(bitmap, 0, 0)
        })
    }
}
