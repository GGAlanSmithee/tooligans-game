import { Pos, Wall, wallPlayerDimensions } from "data/levels"

export type Circle = {
  x: number
  y: number
  radius: number
}

const { width: wW, height: wH } = wallPlayerDimensions

export const collidesWithWall = (walls: Wall[], { x: pX, y: pY }: Pos) => {
  for (const wall of walls)
    for (let i = 0; i < wall.count; i++) {
      const wX = wall.x + i * wW
      const wY = wall.y

      if (pX + wW > wX && pX < wX + wW && pY + wH > wY && pY < wY + wH) return true
    }

  return false
}
