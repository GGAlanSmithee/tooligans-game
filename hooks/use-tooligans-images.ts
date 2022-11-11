import { useTooligansAssets } from "hooks/use-tooligans-assets"
import { asyncImageLoading, Image } from "lib/async-image-loading"
import { makeTransparent } from "lib/make-transparent"
import { Lucid } from "lucid-cardano"
import { useEffect, useState } from "react"

const useTooligansImages = (lucid?: Lucid, networkId?: number) => {
  const [loaded, setLoaded] = useState(false)
  const [tooliganImages, setTooliganImages] = useState<Image[]>([])
  const tooligansAssets = useTooligansAssets(lucid, networkId)

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
      .then(setTooliganImages)
      .catch(console.error)
  }, [tooligansAssets, loaded])

  return tooliganImages
}

export { useTooligansImages }
