import { Game } from "components/Game"
import { LevelInstructions } from "components/LevelInstructions"
import { useCanvas } from "hooks/use-canvas"
import { useHasNamiExtension } from "hooks/use-has-nami-extension"
import { useImage } from "hooks/use-image"
import { useLucid } from "hooks/use-lucid"
import { useTooligansImages } from "hooks/use-tooligans-images"
import { useState } from "react"

import styles from "../styles/index.module.css"

const Index = () => {
  const [level, setLevel] = useState(1)
  const canvas = useCanvas()
  const { image: ballImage } = useImage("/images/soccer-ball.png")

  const hasNamiExtension = useHasNamiExtension()
  const { lucid, networkId } = useLucid()
  const tooligansImages = useTooligansImages(lucid, networkId)

  // strict equals to avoid undefined
  if (hasNamiExtension === false)
    return <div>This example only works with the Nami extension installed. Please install it.</div>

  // not initialized yet
  if (!lucid) return null

  // not loaded yet
  if (!tooligansImages.length)
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
        <h1>Level {level}</h1>
      </aside>

      <div>
        <div className={styles.header}>
          <h1>TooliGames</h1>
        </div>

        <Game
          canvas={canvas}
          ballImage={ballImage}
          tooligansImages={tooligansImages}
          onLevelCompleted={() => setLevel((lastLevel) => lastLevel + 1)}
        />
      </div>

      <aside className={styles.right}>
        <LevelInstructions level={level} />
      </aside>
    </div>
  )
}

export default Index
