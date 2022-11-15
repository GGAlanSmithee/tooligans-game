import { ballDimensions, Pos } from "data/levels"

import { Image } from "./async-image-loading"

const { width, height } = ballDimensions

const drawBall = (ctx: CanvasRenderingContext2D, ballImage: Image, ballPos: Pos) => {
  if (!ballImage) return

  ctx.drawImage(ballImage, ballPos.x, ballPos.y, width, height)

  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(ballPos.x + width / 2, ballPos.y + height / 2, width / 2, 0, 2 * Math.PI)
  ctx.stroke()
}

export { drawBall }
