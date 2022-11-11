import styles from "../styles/index.module.css"

interface Props {
  level: number
}

export const LevelInstructions = ({ level }: Props) => {
  const content =
    level === 1 ? (
      <p>[space] to shoot</p>
    ) : (
      <ul className={styles.instructionsList}>
        <li>Drag to place your Tooligans</li>
        <li>Set order to pass</li>
        <li>[space] to shoot</li>
      </ul>
    )

  return (
    <>
      <h2>Instructions</h2>

      {content}
    </>
  )
}
