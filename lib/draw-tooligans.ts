import { Tooligan } from "../hooks/use-tooligans"

export const drawTooligans = (ctx: CanvasRenderingContext2D, tooligans: Tooligan[]) => {
  tooligans.forEach(({ image, pos: { x, y } }) => {
    if (!image) return

    if (y > 30) ctx.drawImage(image, x, y, image.width / 4, image.height / 4)
    else ctx.drawImage(image, x, y, image.width / 3, image.height / 3)
  })
}
