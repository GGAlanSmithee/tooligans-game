import { Dictionary } from "lodash"

export interface Wall {
  x: number
  y: number
  count: number
}

export interface Level {
  walls: Wall[]
}

export const defaultLevel: Level = {
  walls: [],
}

export const levels: Dictionary<Level> = {
  "2": {
    walls: [{ x: 380, y: 475, count: 3 }],
  },
}
