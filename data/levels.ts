import { Dictionary } from "lodash"

export interface Pos {
  x: number
  y: number
}

export interface Wall extends Pos {
  count: number
  moving?: boolean
  direction?: "left" | "right"
}

export interface Level {
  walls: Wall[]
  number: number 
}

export const defaultLevel: Level = {
  walls: [],
  number: 1,
}

export const ballDimensions = {
  width: 40,
  height: 40,
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

export const levels: Dictionary<Omit<Level, "number">> = {
  "2": {
    walls: [{ x: 435, y: 475, count: 3 }],
  },
  "3": {
    walls: [
      { x: 435, y: 475, count: 3 },
      { x: 635, y: 375, count: 2 },
      { x: 285, y: 675, count: 2 },
    ],
  },
  "4": {
    walls: [
      { x: 435, y: 475, count: 3, moving: true, direction: "left" },
      { x: 435, y: 275, count: 3, moving: true, direction: "right" },
      { x: 235, y: 600, count: 3 },
      { x: 435, y: 600, count: 3 },
      { x: 635, y: 600, count: 3 },
    ],
  },
}
