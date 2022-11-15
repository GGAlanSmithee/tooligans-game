interface Pos {
  x: number
  y: number
}

export function moveBetweenPoints(velocity: number, p1: Pos, p2: Pos) {
  let i = 0
  const pos = { ...p1 }

  return (t: number) => {
    const distanceX = p1.x - p2.x
    const distanceY = p1.y - p2.y

    pos.x += t * velocity * -distanceX
    pos.y += t * velocity * -distanceY

    return {
      pos,
      targetPos: p2,
    }
  }
}
