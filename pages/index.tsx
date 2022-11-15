import { Game } from "components/Game"
import { LevelInstructions } from "components/LevelInstructions"
import { defaultLevel, levels } from "data/levels"
import { useCanvas } from "hooks/use-canvas"
import { useHasNamiExtension } from "hooks/use-has-nami-extension"
import { useImage } from "hooks/use-image"
import { useLucid } from "hooks/use-lucid"
import { useTooligans } from "hooks/use-tooligans"
import { useEffect, useMemo, useState } from "react"

import styles from "../styles/index.module.css"

const Index = () => {
  const [level, setLevel] = useState(1)

  const levelData = useMemo(() => levels[level] || defaultLevel, [level])

  const canvas = useCanvas()
  const { image: ballImage } = useImage("/images/soccer-ball.png")

  const hasNamiExtension = useHasNamiExtension()
  const { lucid, networkId } = useLucid()
  const tooligans = useTooligans(lucid, networkId)
  const [selectedTooligan, setSelectedTooligan] = useState<string>()

  useEffect(() => {
    if (level > 1 && selectedTooligan === undefined && tooligans.length > 0) {
      const name = tooligans[0].asset.onchain_metadata?.name
      if (name) setSelectedTooligan(name)
    }
  }, [level, selectedTooligan, tooligans])

  // strict equals to avoid undefined
  if (hasNamiExtension === false)
    return <div>This example only works with the Nami extension installed. Please install it.</div>

  // not initialized yet
  if (!lucid) return null

  // not loaded yet
  if (!tooligans.length)
    return (
      <div className={styles.container}>
        <div className={styles.left} />
        <div>
          <h1>Loading ...</h1>
        </div>
        <div className={styles.right} />
      </div>
    )

  return (
    <div className={styles.container}>
      <aside className={styles.left}>
        <h2>Level {level}</h2>

        {level > 1 && (
          <>
            <br />
            <h2>Previous levels</h2>
            <ul>
              {Array.from({ length: level - 1 }, (_, i) => (
                <li key={`level-${i}`}>
                  <span onClick={() => setLevel(i + 1)}>Level {i + 1}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>

      <div>
        <div className={styles.header}>
          <h1>TooliGames</h1>
        </div>

        <Game
          level={levelData}
          canvas={canvas}
          ballImage={ballImage}
          tooligans={tooligans}
          onLevelCompleted={() => {
            tooligans.forEach((t) => {
              t.pos.x = t.originalPos.x
              t.pos.y = t.originalPos.y
            })
            setLevel((lastLevel) => lastLevel + 1)
          }}
          selectedTooligan={selectedTooligan}
        />
      </div>

      <aside className={styles.right}>
        <LevelInstructions
          level={level}
          tooligans={tooligans}
          selected={selectedTooligan}
          setSelected={setSelectedTooligan}
        />
      </aside>
    </div>
  )
}

export default Index
