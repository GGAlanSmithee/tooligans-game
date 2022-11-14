import { Tooligan } from "hooks/use-tooligans"
import { useState } from "react"

import styles from "../styles/index.module.css"

interface Props {
  level: number
  tooligans: Tooligan[]
}

export const LevelInstructions = ({ level, tooligans }: Props) => {
  const [selected, setSelected] = useState("")

  return (
    <>
      <h2>Instructions</h2>

      {level === 1 ? (
        <p>[space] to shoot</p>
      ) : (
        <ul className={styles.instructionsList}>
          <li>Click to place your Tooligans</li>
          <li>Set order to pass</li>
          <li>[space] to shoot</li>
        </ul>
      )}

      {level > 1 && (
        <>
          <br />
          <h2>Tooligans</h2>

          <ul className={styles.instructionsList}>
            {tooligans.map((tooligan, i) => {
              const name = tooligan.asset.onchain_metadata?.name

              if (!name) return null

              return (
                <li key={`${name}.${i}`} className={styles.tooligansListElement}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selected === name}
                      onChange={() => {
                        if (name === selected) setSelected("")
                        else setSelected(name)
                      }}
                    />{" "}
                    {name}
                  </label>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </>
  )
}
