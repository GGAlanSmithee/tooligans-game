import { Level } from "data/levels"
import createGame, { Game } from "gameloop"
import { UseCanvas } from "hooks/use-canvas"
import { useImage } from "hooks/use-image"
import { Tooligan } from "hooks/use-tooligans"
import { drawAudience } from "lib/draw-audience"
import { drawBall } from "lib/draw-ball"
import { drawWall } from "lib/draw-wall"
import { easeBetweenPoints } from "lib/ease-between-points"
import { useCallback, useEffect, useState } from "react"

let game: Game | null = null

interface Props {
  level: Level
  canvas: UseCanvas
  ballImage: HTMLImageElement | null
  tooligans: Tooligan[]
  onLevelCompleted: () => void
}

const targetPos = {
  x: 477.5,
  y: 185,
}

const ballStartPos = {
  x: 477.5,
  y: 810,
}

const ballPos = { ...ballStartPos }

type Easing = ReturnType<typeof easeBetweenPoints>

let easing: Easing | undefined

const Game = ({ level, canvas, ballImage, tooligans, onLevelCompleted }: Props) => {
  const [scored, setScored] = useState(false)

  const { image: wallImage } = useImage("/images/wall-player.png")

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!game) return

      if (e.key === " ") {
        if (scored) {
          onLevelCompleted()
          ballPos.x = ballStartPos.x
          ballPos.y = ballStartPos.y
          setScored(false)
        } else {
          easing = easeBetweenPoints(1, { ...ballPos }, { ...targetPos })
        }
      }
    }

    document.addEventListener("keyup", handleKeyUp)

    return () => document.removeEventListener("keyup", handleKeyUp)
  }, [scored, setScored, onLevelCompleted])

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
      }
    },
    [setScored]
  )

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      drawAudience(ctx, tooligans)

      if (scored) {
        ctx.font = "bold 48px sans-serif"
        ctx.fillText("GOAL!", 430, 585)

        ctx.font = "bold 24px sans-serif"
        ctx.fillText("[space] to continue", 400, 615)
      }

      for (const wall of level.walls) {
        drawWall(ctx, wall, wallImage)
      }

      drawBall(ctx, ballImage, ballPos)
    },
    [scored, level.walls, tooligans, ballImage, wallImage]
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
