import styles from "../styles/index.module.css"

export const LevelInstructions = () => {
  return (
    <>
      <h2>Instructions</h2>

      <ul className={styles.instructionsList}>
        <li>Drag to place your Tooligans</li>
        <li>[space] to shoot</li>
      </ul>
    </>
  )
}
