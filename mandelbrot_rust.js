import Mandelbrot from "./mandelbrot.js"
import init, { calc } from "./rust/pkg/rust.js"

export default class MandelbrotRust extends Mandelbrot {
    constructor(imageId, pixel, scale, centerX, centerY) {
        super(pixel, scale, centerX, centerY)
        this.imageId = imageId
    }

    async doDraw() {
        await init()
        const data = calc(this.pixel, this.scale, this.centerX, this.centerY)
        const blob = new Blob([data])
        const url = URL.createObjectURL(blob)
        document.getElementById(this.imageId).setAttribute("src", url)
    }
}
