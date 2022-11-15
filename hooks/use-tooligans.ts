import { Image } from "lib/async-image-loading"
import { Lucid } from "lucid-cardano"
import { useEffect, useMemo, useState } from "react"

import { Responses } from "@blockfrost/blockfrost-js"

import { tooliganDimensions } from "../data/levels"
import { useTooligansAssets } from "./use-tooligans-assets"
import { useTooligansImages } from "./use-tooligans-images"

export interface Tooligan {
  order?: number
  originalPos: { x: number; y: number }
  pos: { x: number; y: number }
  asset: Responses["asset"]
  image: Image
}

export const useTooligans = (lucid?: Lucid, networkId?: number) => {
  const tooligansAssets = useTooligansAssets(lucid, networkId)
  const tooligansImages = useTooligansImages(tooligansAssets)

  const [tooligans, setTooligans] = useState<Tooligan[]>([])

  const tooligansAssetsAndImages = useMemo(
    () =>
      tooligansAssets.map((asset, i) => ({
        asset,
        image: tooligansImages[i],
      })),
    [tooligansAssets, tooligansImages]
  )

  useEffect(() => {
    setTooligans(
      tooligansAssetsAndImages.map((tooligan, i) => {
        const x = (((tooliganDimensions.imageWidth / 3) * i) % 1000) - 10
        const y = -1

        return {
          originalPos: { x, y },
          pos: { x, y },
          ...tooligan,
        }
      })
    )
  }, [tooligansAssetsAndImages])

  return { tooligans, setTooligans }
}
