import Mandelbrot from "./mandelbrot.js"

export default class MandelbrotJS extends Mandelbrot {
    constructor(canvasId, pixel, scale, centerX, centerY) {
        super(pixel, scale, centerX, centerY)
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d")
    }

    async doDraw() {
        for (let i = 0; i < this.pixel; i++) {
            for (let j = 0; j < this.pixel; j++) {
                let re = i * this.scale / this.pixel - this.scale / 2 + this.centerX
                let im = j * this.scale / this.pixel - this.scale / 2 + this.centerY
                this.drawPoint(i, j, this.color(re, im))
            }
        }
    }

    color(re, im) {
        let r = 0
        let i = 0
        for (let n = 0; n < 50; n++) {
            let rNew = r * r - i * i + re
            let iNew = 2 * r * i + im
            r = rNew
            i = iNew
            let distance = r * r + i * i
            if (distance > 4) {
                return [n / 50 * 255, 255 / (1 + Math.exp(-Math.log(distance))), 0] // diverge
            }
        }
        return [0, 0, 0] // not diverge
    }
    
    drawPoint(x, y, color) {
        let image = this.ctx.createImageData(1, 1)
        image.data[0] = color[0]
        image.data[1] = color[1]
        image.data[2] = color[2]
        image.data[3] = 255
        this.ctx.putImageData(image, x, y)
    }
}
