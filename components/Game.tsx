import { Level, tooliganDimensions } from "data/levels"
import createGame, { Game } from "gameloop"
import { UseCanvas } from "hooks/use-canvas"
import { useImage } from "hooks/use-image"
import { Tooligan } from "hooks/use-tooligans"
import { collidesWithWall } from "lib/collision"
import { drawBall } from "lib/draw-ball"
import { drawTooligans } from "lib/draw-tooligans"
import { drawWall } from "lib/draw-wall"
import { moveBetweenPoints } from "lib/move-between-points"
import { moveWall } from "lib/move-wall"
import { isEqual, sortBy } from "lodash"
import { useCallback, useEffect, useState } from "react"

type TravelFunction = ReturnType<typeof moveBetweenPoints>

let ballPath: TravelFunction[] = []
let game: Game | null = null

const { width: tooliganWidth, height: tooliganHeight } = tooliganDimensions

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
  setTooligans: (tooligans: Tooligan[]) => void
  onLevelCompleted: () => void
  selectedTooligan?: string
  setSelectedTooligan: (tooligan?: string) => void
}

const mousePos = { x: 0, y: 0 }

const Game = ({
  level,
  canvas,
  ballImage,
  tooligans,
  setTooligans,
  onLevelCompleted,
  selectedTooligan,
  setSelectedTooligan,
}: Props) => {
  const [scored, setScored] = useState(false)
  const [failed, setFailed] = useState(false)

  const { image: wallImage } = useImage("/images/wall-player.png")

  useEffect(() => {
    const el = document.getElementById("main-canvas")

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!game) return

      if (e.key === " ") {
        if (selectedTooligan !== undefined) return

        const players = sortBy(
          tooligans.filter((t) => !isEqual(t.pos, t.originalPos)),
          "order"
        )

        if (scored) {
          onLevelCompleted()
          ballPos.x = ballStartPos.x
          ballPos.y = ballStartPos.y
          setScored(false)
        } else if (failed) {
          ballPos.x = ballStartPos.x
          ballPos.y = ballStartPos.y
          setFailed(false)
        } else if (players.length > 0) {
          ballPath = []

          for (let i = 0; i < players.length; i++) {
            const startPos =
              i === 0
                ? ballStartPos
                : {
                    x: players[i - 1].pos.x + tooliganWidth / 3,
                    y: players[i - 1].pos.y + tooliganHeight / 3,
                  }

            const targetPos = {
              x: players[i].pos.x + tooliganWidth / 3,
              y: players[i].pos.y + tooliganHeight / 3,
            }

            ballPath.push(moveBetweenPoints(3, startPos, targetPos))
          }

          ballPath.push(moveBetweenPoints(3, players[players.length - 1].pos, { ...targetPos }))
        } else {
          ballPath = [moveBetweenPoints(3, { ...ballPos }, { ...targetPos })]
        }
      }
    }

    document.addEventListener("keyup", handleKeyUp)

    const handleMouseDown = (e: MouseEvent) => {
      if (!el || !game) return
      if (scored || failed) return

      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const tooligan = [...tooligans].reverse().find((t: Tooligan) => {
        const w = y > 30 ? tooliganWidth : tooliganWidth
        const h = y > 30 ? tooliganHeight : tooliganHeight

        return x > t.pos.x && x < t.pos.x + w && y > t.pos.y && y < t.pos.y + h
      })

      if (tooligan) setSelectedTooligan(tooligan.asset.onchain_metadata?.name)
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (!el || !game) return

      const tooligan = tooligans.find(
        (t: Tooligan) => t.asset.onchain_metadata?.name === selectedTooligan
      )

      if (!tooligan) return

      const rect = el.getBoundingClientRect()

      const x = e.clientX - rect.left - tooliganWidth / 2
      const y = e.clientY - rect.top - tooliganHeight / 2

      const isAudience = y <= 30 + tooliganHeight / 2

      setTooligans(
        tooligans.map((t) =>
          t.asset.onchain_metadata?.name === tooligan.asset.onchain_metadata?.name
            ? {
                ...t,
                order: tooligan.order || Math.max(...tooligans.map((t) => t.order || 0)) + 1,
                pos: {
                  x: isAudience ? tooligan.originalPos.x : x,
                  y: isAudience ? tooligan.originalPos.y : y,
                },
              }
            : t
        )
      )

      setSelectedTooligan(undefined)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!el || !game) return
      if (selectedTooligan === undefined) return

      const rect = el.getBoundingClientRect()

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      mousePos.x = x
      mousePos.y = y
    }

    el?.addEventListener("mousedown", handleMouseDown)
    el?.addEventListener("mouseup", handleMouseUp)
    el?.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      document.removeEventListener("keyup", handleKeyUp)
      el?.removeEventListener("mousedown", handleMouseDown)
      el?.removeEventListener("mouseup", handleMouseUp)
      el?.removeEventListener("mousemove", handleMouseMove)
    }
  }, [
    canvas,
    tooligans,
    setTooligans,
    scored,
    setScored,
    failed,
    setFailed,
    onLevelCompleted,
    selectedTooligan,
    setSelectedTooligan,
  ])

  const update = useCallback(
    (dt: number) => {
      if (!scored && !failed) for (const wall of level.walls) moveWall(wall, 350, dt)

      if (ballPath.length <= 0) return

      const {
        pos: { x, y },
        targetPos: target,
      } = ballPath[0](dt)

      ballPos.x = x
      ballPos.y = y

      const xDiff = ballPos.x - target.x
      const yDiff = ballPos.y - target.y

      if (Math.abs(xDiff) < 0.1 && Math.abs(yDiff) < 0.1) {
        ballPath.shift()

        if (ballPath.length === 0) {
          setScored(true)
          return
        }
      }

      if (collidesWithWall(level.walls, ballPos)) {
        ballPath = []
        setFailed(true)
      }
    },
    [setScored, setFailed, level.walls, scored, failed]
  )

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      for (const wall of level.walls) drawWall(ctx, wall, wallImage)

      drawTooligans(
        ctx,
        tooligans.map((t) => {
          if (t.asset.onchain_metadata?.name === selectedTooligan)
            return {
              ...t,
              pos: {
                x: mousePos.x - tooliganWidth / 2,
                y: mousePos.y - tooliganHeight / 2,
              },
            }

          return t
        }),
        level.number
      )

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
    [
      level.number,
      canvas.height,
      canvas.width,
      scored,
      failed,
      level.walls,
      tooligans,
      ballImage,
      wallImage,
      selectedTooligan,
    ]
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
