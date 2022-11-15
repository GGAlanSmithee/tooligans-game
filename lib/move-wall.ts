import { Wall, wallPlayerDimensions } from "data/levels"

const { width } = wallPlayerDimensions

export const moveWall = (wall: Wall, velocity: number, t: number) => {
  if (!wall.moving) return wall

  wall.x += t * velocity * (wall.direction === "left" ? -1 : 1)

  console.log(wall.x)

  if (wall.x < 0) {
    wall.x = 0
    wall.direction = "right"
  }

  if (wall.x > 1000 - wall.count * width) {
    wall.x = 1000 - wall.count * width
    wall.direction = "left"
  }
}
