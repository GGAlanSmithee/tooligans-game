import { isEqual } from "lodash"

import { Image } from "./async-image-loading"

const makeTransparent = (img: HTMLImageElement): Image => {
  var buffer = document.createElement("canvas")
  var bufferCtx = buffer.getContext("2d")

  if (!bufferCtx) return null

  buffer.width = img.width / 10
  buffer.height = img.height / 10
  bufferCtx.drawImage(img, 0, 0, img.width / 10, img.height / 10)

  var imageData = bufferCtx.getImageData(0, 0, buffer.width, buffer.height)

  var data = imageData.data

  const color = [data[0], data[1], data[2]]

  for (var i = 0; i < data.length; i += 4)
    if (isEqual(color, [data[i], data[i + 1], data[i + 2]])) data[i + 3] = 0 // alpha

  bufferCtx.putImageData(imageData, 0, 0)

  return buffer
}

export { makeTransparent }
