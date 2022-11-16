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

const wW = wallPlayerDimensions.width
const wH = wallPlayerDimensions.height
const cO = wallPlayerDimensions.width / 2

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
  "5": {
    walls: [
      ...Array.from({ length: 1000 / wallPlayerDimensions.width / 4 }, (_, i) => ({
        x: i * wallPlayerDimensions.width * 4,
        y: 600,
        count: 1,
        moving: true,
        direction: i % 2 === 0 ? "left" : ("right" as "left" | "right"),
      })),
      ...Array.from({ length: 1000 / wallPlayerDimensions.width / 4 }, (_, i) => ({
        x: i * wallPlayerDimensions.width * 4 + wallPlayerDimensions.width * 2,
        y: 400,
        count: 1,
        moving: true,
        direction: i % 2 === 0 ? "right" : ("left" as "left" | "right"),
      })),
    ],
  },
  // Pay homage
  "6": {
    walls: [
      // C
      { x: wW, y: wH * 6, count: 1 },
      { x: wW, y: wH * 5, count: 1 },
      { x: wW, y: wH * 4, count: 1 },
      { x: wW * 2, y: wH * 3.5, count: 1 },
      { x: wW * 3, y: wH * 3.5, count: 1 },
      { x: wW * 4, y: wH * 4, count: 1 },
      { x: wW * 2, y: wH * 6.5, count: 1 },
      { x: wW * 3, y: wH * 6.5, count: 1 },
      { x: wW * 2, y: wH * 3.5, count: 1 },
      { x: wW * 4, y: wH * 6, count: 1 },

      // N
      { x: wW * 6, y: wH * 3.5, count: 1 },
      { x: wW * 6, y: wH * 4.5, count: 1 },
      { x: wW * 6, y: wH * 5.5, count: 1 },
      { x: wW * 6, y: wH * 6.5, count: 1 },
      { x: wW * 7, y: wH * 4, count: 1 },
      { x: wW * 8, y: wH * 5, count: 1 },
      { x: wW * 9, y: wH * 6, count: 1 },
      { x: wW * 10, y: wH * 6.5, count: 1 },
      { x: wW * 10, y: wH * 5.5, count: 1 },
      { x: wW * 10, y: wH * 4.5, count: 1 },
      { x: wW * 10, y: wH * 3.5, count: 1 },

      // F
      { x: cO * 2 + wW * 12, y: wH * 3.5, count: 1 },
      { x: cO * 2 + wW * 12, y: wH * 4.5, count: 1 },
      { x: cO * 2 + wW * 12, y: wH * 5.5, count: 1 },
      { x: cO * 2 + wW * 12, y: wH * 6.5, count: 1 },
      { x: cO * 2 + wW * 13, y: wH * 3.5, count: 1 },
      { x: cO * 2 + wW * 14, y: wH * 3.5, count: 1 },
      { x: cO * 2 + wW * 15, y: wH * 3.5, count: 1 },
      { x: cO * 2 + wW * 13, y: wH * 5, count: 1 },
      { x: cO * 2 + wW * 14, y: wH * 5, count: 1 },

      // T
      { x: cO * 2 + wW * 17, y: wH * 3.5, count: 1 },
      { x: cO * 2 + wW * 18, y: wH * 3.5, count: 1 },
      { x: cO * 2 + wW * 19, y: wH * 3.5, count: 1 },
      { x: cO * 2 + wW * 20, y: wH * 3.5, count: 1 },
      { x: cO * 2 + wW * 21, y: wH * 3.5, count: 1 },
      { x: cO * 2 + wW * 19, y: wH * 4.5, count: 1 },
      { x: cO * 2 + wW * 19, y: wH * 5.5, count: 1 },
      { x: cO * 2 + wW * 19, y: wH * 6.5, count: 1 },
    ].map((wall) => ({ ...wall, x: wall.x + cO })),
  },
}
