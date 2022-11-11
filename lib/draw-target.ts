interface Pos {
  x: number
  y: number
}

const drawTarget = (ctx: CanvasRenderingContext2D, targetPos: Pos) => {
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(targetPos.x + 20, targetPos.y + 20, 20, 0, 2 * Math.PI)
  ctx.stroke()
}

export { drawTarget }
