import { tooliganDimensions } from "../data/levels"
import { Tooligan } from "../hooks/use-tooligans"

const { audienceHeight, audienceWidth, playerWidth, playerHeight } = tooliganDimensions

export const drawTooligans = (ctx: CanvasRenderingContext2D, tooligans: Tooligan[]) => {
  tooligans.forEach(({ image, pos: { x, y } }) => {
    if (!image) return

    if (y > 30) ctx.drawImage(image, x, y, playerWidth, playerHeight)
    else ctx.drawImage(image, x, y, audienceWidth, audienceHeight)
  })
}
