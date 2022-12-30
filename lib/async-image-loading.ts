type Image = HTMLImageElement | HTMLCanvasElement | null

type OnLoad = (img: HTMLImageElement) => Image

const asyncImageLoading = (src?: string, onLoad?: OnLoad): Promise<Image> =>
  new Promise((resolve) => {
    try {
      if (!src) return resolve(null)

      const image = new Image()

      image.onload = function () {
        if (onLoad) {
          const processedImage = onLoad(image)
          resolve(processedImage || null)
        } else {
          resolve(image || null)
        }
      }

      image.src = src
    } catch {
      resolve(null)
    }
  })

export type { Image }
export { asyncImageLoading }
