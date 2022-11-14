import { Level } from "data/levels"
import createGame, { Game } from "gameloop"
import { UseCanvas } from "hooks/use-canvas"
import { useImage } from "hooks/use-image"
import { Tooligan } from "hooks/use-tooligans"
import { drawBall } from "lib/draw-ball"
import { drawTooligans } from "lib/draw-tooligans"
import { drawWall } from "lib/draw-wall"
import { easeBetweenPoints } from "lib/ease-between-points"
import { useCallback, useEffect, useState } from "react"

type Easing = ReturnType<typeof easeBetweenPoints>

let easing: Easing | undefined
let game: Game | null = null

const targetPos = {
  x: 477.5,
  y: 185,
}

const ballStartPos = {
  x: 477.5,
  y: 810,
}

const ballPos = { ...ballStartPos }

interface Props {
  level: Level
  canvas: UseCanvas
  ballImage: HTMLImageElement | null
  tooligans: Tooligan[]
  onLevelCompleted: () => void
  selectedTooligan?: string
}

const Game = ({
  level,
  canvas,
  ballImage,
  tooligans,
  onLevelCompleted,
  selectedTooligan,
}: Props) => {
  const [scored, setScored] = useState(false)
  const [failed, setFailed] = useState(false)

  const { image: wallImage } = useImage("/images/wall-player.png")

  useEffect(() => {
    const el = document.getElementById("main-canvas")

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!game) return

      if (e.key === " ") {
        if (scored) {
          onLevelCompleted()
          ballPos.x = ballStartPos.x
          ballPos.y = ballStartPos.y
          setScored(false)
        } else if (failed) {
          ballPos.x = ballStartPos.x
          ballPos.y = ballStartPos.y
          setFailed(false)
        } else {
          easing = easeBetweenPoints(1, { ...ballPos }, { ...targetPos })
        }
      }
    }

    document.addEventListener("keyup", handleKeyUp)

    const handleClick = (e: MouseEvent) => {
      if (!el || !game) return

      const rect = el.getBoundingClientRect()

      const tooligan = tooligans.find((t) => t.asset.onchain_metadata?.name === selectedTooligan)

      if (tooligan) {
        tooligan.pos.x = e.clientX - rect.left - 75
        tooligan.pos.y = e.clientY - rect.top - 75
      }
    }

    el?.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("keyup", handleKeyUp)
      el?.removeEventListener("click", handleClick)
    }
  }, [canvas, tooligans, scored, setScored, failed, setFailed, onLevelCompleted])

  const update = useCallback(
    (dt: number) => {
      if (easing) {
        const { x, y } = easing(dt)
        ballPos.x = x
        ballPos.y = y

        const xDiff = ballPos.x - targetPos.x
        const yDiff = ballPos.y - targetPos.y

        if (Math.abs(xDiff) < 1 && Math.abs(yDiff) < 1) {
          easing = undefined
          setScored(true)
        }

        if (wallImage) {
          const w = wallImage.width / 6
          const h = wallImage.height / 6

          level.walls.forEach((wall) => {
            if (
              ballPos.x + w > wall.x &&
              ballPos.x < wall.x + w &&
              ballPos.y + h > wall.y &&
              ballPos.y < wall.y + h
            ) {
              easing = undefined
              setFailed(true)
            }
          })
        }
      }
    },
    [setScored, level.walls, wallImage]
  )

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      for (const wall of level.walls) drawWall(ctx, wall, wallImage)

      drawTooligans(ctx, tooligans)

      drawBall(ctx, ballImage, ballPos)

      if (scored || failed) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)"
        ctx.fillRect(0, 135, canvas.width, canvas.height - 135)
      }

      if (scored) {
        ctx.fillStyle = "white"
        ctx.font = "bold 48px sans-serif"
        ctx.fillText("GOAL!", 440, 585)

        ctx.font = "bold 24px sans-serif"
        ctx.fillText("[space] to continue", 400, 615)
      }

      if (failed) {
        ctx.fillStyle = "white"
        ctx.font = "bold 48px sans-serif"
        ctx.fillText("INTERCEPTED!", 330, 585)

        ctx.font = "bold 24px sans-serif"
        ctx.fillText("[space] to retry", 415, 615)
      }
    },
    [canvas.height, canvas.width, scored, failed, level.walls, tooligans, ballImage, wallImage]
  )

  useEffect(() => {
    if (!game) {
      if (!canvas.ctx) return

      game = createGame({
        renderer: canvas.ctx,
      })

      game.on("update", function (dt) {
        update(dt)
      })

      game.on("draw", function (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        draw(ctx)
      })

      game.start()
    }

    return () => {
      if (game !== null) {
        game.pause()
        game = null
      }
    }
  }, [canvas.ctx, canvas.width, canvas.height, draw, update])

  return <>{canvas.el}</>
}

export { Game }
