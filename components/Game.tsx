import createGame, { Game } from "gameloop"
import { UseCanvas } from "hooks/use-canvas"
import { Image } from "lib/async-image-loading"
import { drawAudience } from "lib/draw-audience"
import { drawBall } from "lib/draw-ball"
import { drawTarget } from "lib/draw-target"
import { easeBetweenPoints } from "lib/ease-between-points"
import { useCallback, useEffect } from "react"

let game: Game | null = null

interface Props {
  canvas: UseCanvas
  ballImage: HTMLImageElement | null
  tooligansImages: Image[]
}

const targetPos = {
  x: 477.5,
  y: 185,
}

const ballPos = {
  x: 477.5,
  y: 810,
}

type Easing = ReturnType<typeof easeBetweenPoints>

let easing: Easing

const Game = ({ canvas, ballImage, tooligansImages }: Props) => {
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!game) return

      console.log(e.key)

      if (e.key === " ") {
        easing = easeBetweenPoints(1, { ...ballPos }, { ...targetPos })
      }
    }

    document.addEventListener("keyup", handleKeyUp)

    return () => document.removeEventListener("keyup", handleKeyUp)
  }, [])

  const update = useCallback((dt: number) => {
    if (easing) {
      const { x, y } = easing(dt)
      console.log("ball x y ", x, y)
      ballPos.x = x
      ballPos.y = y
    }
  }, [])

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      drawAudience(ctx, tooligansImages)
      drawBall(ctx, ballImage, ballPos)
      drawTarget(ctx, targetPos)
    },
    [ballImage, tooligansImages]
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
