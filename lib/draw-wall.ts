import { Wall, wallPlayerDimensions } from "data/levels"

import { Image } from "./async-image-loading"

const { width, height } = wallPlayerDimensions

console.log(width, height)

export const drawWall = (ctx: CanvasRenderingContext2D, wall: Wall, img: Image) => {
  if (!img) return

  for (let i = 0; i < wall.count; i++) {
    ctx.drawImage(img, wall.x + i * width, wall.y, width, height)

    if (process.env.NODE_ENV === "development") {
      ctx.strokeRect(wall.x+ i * width , wall.y, width, height)
    }
  }
}
