import { Image } from "lib/async-image-loading"

const drawAudience = (ctx: CanvasRenderingContext2D, tooliganImages: Image[]) => {
  tooliganImages.forEach((image, i) => {
    if (!image) return

    const x = (((image.width / 3) * i) % 1000) - 10
    const y = -1

    if (image) ctx.drawImage(image, x, y, image.width / 3, image.height / 3)
  })
}

export { drawAudience }
