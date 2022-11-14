import { asyncImageLoading, Image } from "lib/async-image-loading"
import { makeTransparent } from "lib/make-transparent"
import { useEffect, useState } from "react"

import { Responses } from "@blockfrost/blockfrost-js"

const useTooligansImages = (tooligansAssets: Responses["asset"][]): Image[] => {
  const [loaded, setLoaded] = useState(false)
  const [tooligansImages, setTooligansImages] = useState<Image[]>([])

  useEffect(() => {
    if (loaded || tooligansAssets.length <= 0) return

    setLoaded(true)

    Promise.all(
      tooligansAssets.map((tooligan) =>
        asyncImageLoading(
          tooligan?.onchain_metadata?.image
            ?.toString()
            ?.replace("ipfs://", "https://ipfs.blockfrost.dev/ipfs/"),
          makeTransparent
        )
      )
    )
      .then(setTooligansImages)
      .catch(console.error)
  }, [tooligansAssets, loaded])

  return tooligansImages
}

export { useTooligansImages }
