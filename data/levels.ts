import { Dictionary } from "lodash"

export interface Pos {
  x: number
  y: number
}

export interface Wall extends Pos {
  count: number
}

export interface Level {
  walls: Wall[]
}

export const defaultLevel: Level = {
  walls: [],
}

export const wallPlayerDimensions = {
  width: 40,
  height: 104,
}

export const tooliganDimensions = {
  imageWidth: 400, // 1 / 10 of original
  imageHeight: 400, // 1 / 10 of original
  audienceWidth: 135,
  audienceHeight: 135,
  playerWidth: 100,
  playerHeight: 100,
}

export const levels: Dictionary<Level> = {
  "2": {
    walls: [{ x: 435, y: 475, count: 3 }],
  },
  "3": {
    walls: [
      { x: 580, y: 525, count: 2 },
      { x: 100, y: 475, count: 2 },
      { x: 600, y: 325, count: 2 },
    ],
  },
}
