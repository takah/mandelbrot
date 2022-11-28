import Mandelbrot from "./mandelbrot.js"

export default class MandelbrotJS extends Mandelbrot {
    async doDraw() {
        for (let x = 0; x < this.pixel; x++) {
            for (let y = 0; y < this.pixel; y++) {
                let cRe = x * this.scale / this.pixel - this.scale / 2 + this.centerX
                let cIm = y * this.scale / this.pixel - this.scale / 2 + this.centerY
                this.drawPoint(x, y, this.color(cRe, cIm))
            }
        }
    }

    color(cRe, cIm) {
        let re = 0
        let im = 0
        for (let n = 0; n < 50; n++) {
            let reNew = re * re - im * im + cRe
            let imNew = 2 * re * im + cIm
            re = reNew
            im = imNew
            let distance = re * re + im * im
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
