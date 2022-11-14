import { Image } from "lib/async-image-loading"
import { Lucid } from "lucid-cardano"
import { useMemo } from "react"

import { Responses } from "@blockfrost/blockfrost-js"

import { useTooligansAssets } from "./use-tooligans-assets"
import { useTooligansImages } from "./use-tooligans-images"

export interface Tooligan {
  pos: {
    x: number
    y: number
  }
  asset: Responses["asset"]
  image: Image
}

export const useTooligans = (lucid?: Lucid, networkId?: number) => {
  const tooligansAssets = useTooligansAssets(lucid, networkId)
  const tooligansImages = useTooligansImages(tooligansAssets)

  const tooligansAssetsAndImages = useMemo(
    () =>
      tooligansAssets.map((asset, i) => ({
        asset,
        image: tooligansImages[i],
      })),
    [tooligansAssets, tooligansImages]
  )

  const tooligans = useMemo<Tooligan[]>(
    () =>
      tooligansAssetsAndImages.map((tooligan, i) => {
        const x = ((((tooligan.image?.width || 0) / 3) * i) % 1000) - 10
        const y = -1

        return {
          pos: { x, y },
          ...tooligan,
        }
      }),
    [tooligansAssetsAndImages]
  )

  return tooligans
}
