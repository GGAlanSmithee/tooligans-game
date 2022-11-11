import { useEffect, useRef, useState } from "react"

const useImage = (src?: string) => {
  const [loaded, setLoaded] = useState(false)
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!src) return

    var loadedImage = new Image()
    loadedImage.crossOrigin = "Anonymous"

    loadedImage.onload = function () {
      setImage(this as HTMLImageElement)
      setLoaded(true)
    }

    loadedImage.src = src
  }, [src])

  return { loaded, image }
}

export { useImage }
