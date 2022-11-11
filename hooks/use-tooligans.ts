import { Image } from "lib/async-image-loading"
import { Lucid } from "lucid-cardano"
import { useMemo } from "react"

import { useTooligansImages } from "./use-tooligans-images"

export interface Tooligan {
  pos: {
    x: number
    y: number
  }
  image: Image
}

export const useTooligans = (lucid?: Lucid, networkId?: number) => {
  const tooligansImages = useTooligansImages(lucid, networkId)

  const tooligans = useMemo<Tooligan[]>(
    () =>
      tooligansImages.map((image, i) => {
        const x = ((((image?.width || 0) / 3) * i) % 1000) - 10
        const y = -1

        return {
          pos: { x, y },
          image,
        }
      }),
    [tooligansImages]
  )

  return tooligans
}
