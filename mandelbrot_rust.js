import Mandelbrot from "./mandelbrot.js"
import init, { color } from "./mandelbrotlib/pkg/mandelbrotlib.js"

export default class MandelbrotRust extends Mandelbrot {
    doDraw() {
        init().then(() => {
            this.drawing()
        })
    }

    drawing() {
        for (let i=0; i<this.pixel; i++) {
            for (let j=0; j<this.pixel; j++) {
                let re = i*this.scale/this.pixel - this.scale/2 + this.centerX
                let im = j*this.scale/this.pixel - this.scale/2 + this.centerY
                this.drawPoint(i, j, color(re, im), this.ctx)
            }
        }
    }

    drawPoint(x, y, color) {
        let image = this.ctx.createImageData(1, 1)
        if (color) {
            image.data[0] = 0
            image.data[1] = 0
            image.data[2] = 0
        } else {
            image.data[0] = 255
            image.data[1] = 255
            image.data[2] = 255
        }
        image.data[3] = 255
        this.ctx.putImageData(image, x, y)
    }
}
