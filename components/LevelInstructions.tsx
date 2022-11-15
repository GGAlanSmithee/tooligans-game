import { Tooligan } from "hooks/use-tooligans"
import { isEqual } from "lodash"
import { useState } from "react"

import styles from "../styles/index.module.css"

interface Props {
  level: number
  tooligans: Tooligan[]
  setTooligans: (tooligans: Tooligan[]) => void
  selected?: string
  setSelected: (selected?: string) => void
}

export const LevelInstructions = ({
  level,
  tooligans,
  setTooligans,
  selected,
  setSelected,
}: Props) => {
  return (
    <>
      <h2>Instructions</h2>

      {level === 1 ? (
        <p>[space] to shoot</p>
      ) : (
        <ul className={styles.instructionsList}>
          <li>Place your Tooligans</li>
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

              const isPlaced = !isEqual(tooligan.originalPos, tooligan.pos)

              return (
                <li key={`${name}.${i}`} className={styles.tooligansListElement}>
                  <label className={styles.tooligansLabel}>
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

                  {isPlaced && (
                    <small
                      className={styles.tooligansResetButton}
                      onClick={() => {
                        setTooligans(
                          tooligans.map((t) => {
                            if (t.asset.onchain_metadata?.name === name)
                              return {
                                ...t,
                                pos: t.originalPos,
                              }

                            return t
                          })
                        )
                      }}
                    >
                      ⭯
                    </small>
                  )}
                </li>
              )
            })}
          </ul>

          {selected && (
            <>
              <br />
              <h4>← Click to place {selected}</h4>
            </>
          )}
        </>
      )}
    </>
  )
}
