import { Game } from "components/Game"
import { LevelInstructions } from "components/LevelInstructions"
import { LevelSelect } from "components/LevelSelect"
import { defaultLevel, levels } from "data/levels"
import { useCanvas } from "hooks/use-canvas"
import { useImage } from "hooks/use-image"
import { useHasNamiExtension } from "hooks/use-lucid/use-has-nami-extension"
import { useLucid } from "hooks/use-lucid/use-lucid"
import { useTooligans } from "hooks/use-tooligans"
import { useEffect, useMemo, useState } from "react"

import styles from "../styles/index.module.css"

const Index = () => {
  const [level, setLevel] = useState(1)

  const levelData = useMemo(() => {
    const levelData = levels[level] || defaultLevel

    return {
      ...levelData,
      number: level,
    }
  }, [level])

  const canvas = useCanvas()
  const { image: ballImage } = useImage("/images/soccer-ball.png")

  const hasNamiExtension = useHasNamiExtension()
  const { lucid, networkId } = useLucid()
  const { tooligans, setTooligans } = useTooligans(lucid, networkId)
  const [selectedTooligan, setSelectedTooligan] = useState<string>()

  useEffect(() => {
    if (level > 1 && selectedTooligan === undefined && tooligans.length > 0) {
      const name = tooligans[0].asset.onchain_metadata?.name
      if (name) setSelectedTooligan(name)
    }
  }, [level, selectedTooligan, tooligans])

  // strict equals to avoid undefined
  if (hasNamiExtension === false)
    return (
      <div className={styles.container}>
        <div className={styles.left} />
        <div>
          <h1>
            This game currently only works with the Nami extension installed. Please install it.
          </h1>
        </div>
        <div className={styles.right} />
      </div>
    )

  // not initialized yet
  if (!lucid) return null

  return (
    <>
      <a href="https://github.com/GGAlanSmithee/tooligans-game">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          decoding="async"
          loading="lazy"
          width="149"
          height="149"
          src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
          className={styles.forkMe}
          alt="Fork me on GitHub"
          data-recalc-dims="1"
        />
      </a>

      <div className={styles.container}>
        <aside className={styles.left}>
          <LevelSelect
            level={level}
            setLevel={setLevel}
            tooligans={tooligans}
            setTooligans={setTooligans}
          />
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
            setTooligans={setTooligans}
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
            setTooligans={setTooligans}
            selected={selectedTooligan}
            setSelected={setSelectedTooligan}
          />
        </aside>
      </div>
    </>
  )
}

export default Index
