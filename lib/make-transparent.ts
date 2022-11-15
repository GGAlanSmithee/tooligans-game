import { tooliganDimensions } from "data/levels"
import { isEqual } from "lodash"

import { Image } from "./async-image-loading"

const { imageHeight: height, imageWidth: width } = tooliganDimensions

const makeTransparent = (img: HTMLImageElement): Image => {
  var buffer = document.createElement("canvas")
  var bufferCtx = buffer.getContext("2d")

  if (!bufferCtx) return null

  buffer.width = width
  buffer.height = height
  bufferCtx.drawImage(img, 0, 0, width, height)

  var imageData = bufferCtx.getImageData(0, 0, buffer.width, buffer.height)

  var data = imageData.data

  const color = [data[0], data[1], data[2]]

  for (var i = 0; i < data.length; i += 4)
    if (isEqual(color, [data[i], data[i + 1], data[i + 2]])) data[i + 3] = 0 // alpha

  bufferCtx.putImageData(imageData, 0, 0)

  return buffer
}

export { makeTransparent }
