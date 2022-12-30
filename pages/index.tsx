import { Game } from "components/Game"
import { LevelInstructions } from "components/LevelInstructions"
import { LevelSelect } from "components/LevelSelect"
import { defaultLevel, levels } from "data/levels"
import { useCanvas } from "hooks/use-canvas"
import { useImage } from "hooks/use-image"
import { useTooligans } from "hooks/use-tooligans"
import { useMemo, useState } from "react"
import { CardanoWalletSelector, useCardano } from "use-cardano"

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

  const { lucid, networkId } = useCardano()

  const { tooligans, setTooligans } = useTooligans(lucid, networkId)

  const [selectedTooligan, setSelectedTooligan] = useState<string>()

  return (
    <>
      <div className={styles.connectContainer}>
        <CardanoWalletSelector />
      </div>

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
            setSelectedTooligan={setSelectedTooligan}
            onLevelCompleted={() => {
              setTooligans(
                tooligans.map((t) => ({
                  ...t,
                  order: undefined,
                  pos: t.originalPos,
                }))
              )
              setLevel((lastLevel) => lastLevel + 1)
            }}
            selectedTooligan={selectedTooligan}
          />
        </div>

        <aside className={styles.right}>
          <LevelInstructions />
        </aside>
      </div>
    </>
  )
}

export default Index
