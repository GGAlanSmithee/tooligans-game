import { Tooligan } from "hooks/use-tooligans"

import styles from "../styles/index.module.css"

interface Props {
  level: number
  setLevel: (level: number) => void
  tooligans: Tooligan[]
  setTooligans: (tooligans: Tooligan[]) => void
}

export const LevelSelect = ({ level, setLevel, tooligans, setTooligans }: Props) => {
  return (
    <>
      <h2>Level {level}</h2>

      {level > 1 && (
        <>
          <br />
          <h2>Previous levels</h2>

          <ul>
            {Array.from({ length: level - 1 }, (_, i) => (
              <li key={`level-${i}`}>
                <span
                  className={styles.levelSelectItem}
                  onClick={() => {
                    setTooligans(tooligans.map((t) => ({ ...t, pos: t.originalPos })))
                    setLevel(i + 1)
                  }}
                >
                  Level {i + 1}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
