import { tooliganDimensions } from "../data/levels"
import { Tooligan } from "../hooks/use-tooligans"

const { audienceHeight, audienceWidth, playerWidth, playerHeight } = tooliganDimensions

export const drawTooligans = (ctx: CanvasRenderingContext2D, tooligans: Tooligan[]) => {
  tooligans.forEach(({ order, image, pos: { x, y } }) => {
    if (!image) return

    if (y > 30) {
      ctx.drawImage(image, x, y, playerWidth, playerHeight)

      if (order) {
        ctx.fillStyle = "black"
        ctx.font = "20px Arial"
        ctx.lineWidth = 1
        ctx.fillText(order.toString(), x - 20, y)
      }
    } else {
      ctx.drawImage(image, x, y, audienceWidth, audienceHeight)
    }
  })
}
