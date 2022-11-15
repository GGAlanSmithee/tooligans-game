export type Circle = {
  x: number
  y: number
  radius: number
}

export const collides = (a: Circle, b: Circle) => {
  const distanceX = a.x - b.x
  const distanceY = a.y - b.y
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

  return distance < a.radius + b.radius
}
