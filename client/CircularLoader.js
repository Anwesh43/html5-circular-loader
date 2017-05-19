class Loader {
    constructor(url,respType,cb,errcb) {
        this.url = url
        this.respType = respType
        this.cb = cb
        this.errcb = errcb

    }
    startLoading() {
      const canvas = this.canvas
      const context = this.context
      const w = canvas.width,h = canvas.height
      context.clearRect(0,0,w,h)
      context.save()
      context.fillStyle = 'black'
      context.globalAlpha = 0.3
      context.fillRect(0,0,w,h)
      this.circularLoader.draw(context)
      this.circularLoader.update()
      context.restore()
      this.img.src = canvas.toDataURL()
    }
    load() {
        this.img = document.createElement('img')
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        const w = window.innerWidth,h = window.innerHeight
        this.circularLoader = new CircularLoader(w/2,h/2,Math.min(w,h)/10)
        document.body.appendChild(this.img)
        fetch(this.url).then((res)=>{
            if(this.respType == 'text') {
                return res.text()
            }
            if(this.respType == 'json') {
                return res.json()
            }
        }).then((data)=>{
            clearInterval(this.interval)
            document.body.removeChild(this.img)
            this.cb(data)
        }).catch((err)=>{
            this.errcb(err)
        })
        this.interval  =  setInterval(()=>{
            this.startLoading()
        },100)
    }
}
class CircularLoader {
    constructor(x,y,r,n) {
        this.x = x
        this.y = y
        this.r = r
        this.currIndex = 0
        this.n = n || 8
    }
    draw(context) {
        const n = this.n
        for(var i=0;i<n;i++) {
            context.save()
            context.translate(this.x,this.y)
            context.rotate(-3*Math.PI/2+i*(2*Math.PI/n));
            context.save()
            context.globalAlpha = 0.3
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
        context.lineWidth = this.r/5
        context.beginPath()
        context.moveTo(0,-this.r/3)
        context.lineTo(0,-this.r)
        context.stroke()

    }
    update() {
        this.currIndex++
        this.currIndex %= this.n
    }
}
