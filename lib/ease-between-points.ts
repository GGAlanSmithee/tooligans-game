interface Pos {
  x: number
  y: number
}

export function easeBetweenPoints(velocity: number, p1: Pos, p2: Pos) {
  // create a function that takes a number between 0 and 1
  let i = 0
  const pos = { ...p1 }

  return (t: number) => {
    console.log(p2.y - pos.y)

    const distanceX = pos.x - p2.x
    const distanceY = pos.y - p2.y

    pos.x += t * (++i / 3) * velocity * -distanceX
    pos.y += t * (++i / 3) * velocity * -distanceY

    return pos
  }
}

// create a function that moves a point between two points
