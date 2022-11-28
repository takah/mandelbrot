export default class Mandelbrot {
    constructor(canvasId, pixel, scale, centerX, centerY) {
        const canvas = document.getElementById(canvasId)
        this.ctx = canvas.getContext("2d")
        this.pixel = pixel
        this.scale = scale
        this.centerX = centerX
        this.centerY = centerY
        this.startTime = null
        this.timeElapsed = null
    }

    async draw() {
        this.beforeDraw()
        await this.doDraw()
        this.afterDraw()
    }

    beforeDraw() {
        this.startTime = Date.now()
    }

    doDraw() {
        throw new Error("doDraw() must be implemented.")
    }

    afterDraw() {
        this.timeElapsed = Date.now() - this.startTime
    }
}
