import { tooliganDimensions } from "../data/levels"
import { Tooligan } from "../hooks/use-tooligans"

const { width, height } = tooliganDimensions

export const drawTooligans = (
  ctx: CanvasRenderingContext2D,
  tooligans: Tooligan[],
  level: number
) => {
  if (level > 1 && tooligans.length <= 0) {
    ctx.fillStyle = "black"
    ctx.font = "20px Arial"
    ctx.lineWidth = 1
    ctx.fillText("This would be a lot easier with some Tooligans ;)", 300, 80)
  }

  tooligans.forEach(({ order, image, pos: { x, y } }) => {
    if (!image) return

    ctx.drawImage(image, x, y, width, height)

    if (order) {
      ctx.fillStyle = "black"
      ctx.font = "20px Arial"
      ctx.lineWidth = 1
      ctx.fillText(order.toString(), x - 10, y + 20)
    }
  })
}
