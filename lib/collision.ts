import { ballDimensions, Pos, Wall, wallPlayerDimensions } from "data/levels"

export type Circle = {
  x: number
  y: number
  radius: number
}

const { width: bW, height: bH } = ballDimensions
const { width: wW, height: wH } = wallPlayerDimensions

export const collidesWithWall = (walls: Wall[], { x: bX, y: bY }: Pos) => {
  for (const wall of walls)
    for (let i = 0; i < wall.count; i++) {
      const wX = wall.x + i * wW
      const wY = wall.y

      if (bX + bW > wX && bX < wX + wW && bY + bH > wY && bY < wY + wH) return true
    }

  return false
}
