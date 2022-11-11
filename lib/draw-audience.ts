import { Tooligan } from "../hooks/use-tooligans"

const drawAudience = (ctx: CanvasRenderingContext2D, tooligans: Tooligan[]) => {
  tooligans.forEach(({ image, pos: { x, y } }) => {
    if (!image) return

    ctx.drawImage(image, x, y, image.width / 3, image.height / 3)
  })
}

export { drawAudience }
