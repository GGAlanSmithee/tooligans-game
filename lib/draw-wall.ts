import { Wall } from "data/levels"

import { Image } from "./async-image-loading"

export const drawWall = (ctx: CanvasRenderingContext2D, wall: Wall, img: Image) => {
  if (!img) return

  for (let i = 0; i < wall.count; i++)
    ctx.drawImage(img, wall.x + i * 35, wall.y, img.width / 6, img.height / 6)
}
