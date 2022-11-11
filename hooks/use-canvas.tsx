import { useEffect, useRef, useState } from "react"

import styles from "../styles/index.module.css"

interface UseCanvas {
  canvas?: HTMLCanvasElement
  el: JSX.Element
  ctx: CanvasRenderingContext2D | null
  width: number
  height: number
}

let interval: ReturnType<typeof setInterval>

const useCanvas = (): UseCanvas => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    if (interval) clearInterval(interval)

    // NOTE(Alan): continuously attempt to initialize the canvas until initialized
    interval = setInterval(() => {
      const canvas = document.getElementById("main-canvas") as HTMLCanvasElement

      if (canvas) {
        setCtx(canvas.getContext("2d"))
        setWidth(canvas.width)
        setHeight(canvas.height)

        clearInterval(interval)
      }
    }, 10)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [])

  const CanvasEl = (
    <canvas id="main-canvas" className={styles.mainCanvas} width="1000" height="1000" />
  )

  return { el: CanvasEl, ctx, width, height }
}

export type { UseCanvas }
export { useCanvas }
