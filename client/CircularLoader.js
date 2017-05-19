class Loader {
    constructor(blockingMethod) {
        this.blockingMethod = blockingMethod
        this.circularLoader = new CircularLoader()
    }
    startLoading() {
      const canvas = this.canvas
      const context = this.context
      const w = canvas.width,h = canvas.height
      context.clearRect(0,0,w,h)
      context.save()
      context.fillStyle = 'black'
      context.globalAlpha = 0.5
      context.fillRect(0,0,w,h)
      this.circularLoader.draw(context)
      this.circularLoader.update()
      context.restore()
    }
    load() {
        this.img = document.createElement('img')
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        document.body.appendChild(this.img)

    }
    class CircularLoader {
        constructor(x,y,r) {
            this.x = x
            this.y = y
            this.r = r
            this.currIndex = 0
        }
        draw(context) {
            for(var i=0;i<6;i++) {
                context.save()
                context.translate(this.x,this.y)
                context.rotate(-3*Math.PI/2+i*Math.PI/3);
                context.save()
                context.globalAlpha = 0.5
                this.drawLine(context)
                context.restore()
                if(i == this.currIndex) {
                    this.drawLine(context)
                }
                context.restore()
            }
        }
        drawLine(context) {
            context.strokeStyle = 'white'
            context.lineWidth(r/5)
            context.beginPath()
            context.moveTo(0,-this.r/3)
            context.lineTo(0,-this.r)
            context.stroke()

        }
        update() {
            this.currIndex++
            this.currIndex %= 6
        }
    }
}
