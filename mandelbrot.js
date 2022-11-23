export default class Mandelbrot {
    constructor(canvasId, pixel, scale, centerX, centerY) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d")
        this.pixel = pixel
        this.scale = scale
        this.centerX = centerX
        this.centerY = centerY
        this.startTime = null
        this.timeElapsed = null
    }

    draw() {
        this.beforeDraw()
        this.doDraw()
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