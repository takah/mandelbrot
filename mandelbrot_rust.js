import Mandelbrot from "./mandelbrot.js"
import init, { color, xxx } from "./rust/pkg/rust.js"

export default class MandelbrotRust extends Mandelbrot {
    constructor(imageId, pixel, scale, centerX, centerY) {
        super(pixel, scale, centerX, centerY)
    }

    async doDraw() {
        await init()
        const data = xxx(200, 3, 0, 0)
        const blob = new Blob([data])
        const url = URL.createObjectURL(blob)
        document.getElementById("xxx").setAttribute("src", url)
    }
}
