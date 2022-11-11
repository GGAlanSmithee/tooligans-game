import { Image } from "./async-image-loading"

interface Pos {
  x: number
  y: number
}

const drawBall = (ctx: CanvasRenderingContext2D, ballImage: Image, ballPos: Pos) => {
  if (!ballImage) return

  ctx.drawImage(ballImage, ballPos.x, ballPos.y, 40, 40)

  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(ballPos.x + 20, ballPos.y + 20, 20, 0, 2 * Math.PI)
  ctx.stroke()
}

export { drawBall }
