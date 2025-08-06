import React from 'react'

export default function InfoSection({ styles, numberOfParts, timePerPart }) {
  return (
    <section className={styles.parts}>
        <div className={styles.parts__info}>
            <p className="parts__label">
                Number of parts: 
            </p>
            <p className="parts__number">
                { numberOfParts ?? "Unknown" }
            </p>
        </div>
        <div className={styles.parts__info}>
            <p className="parts__label">
                Time per part: 
            </p>
            <p className="parts__time">
                { timePerPart ?? "Unknown"}
            </p>
        </div>
    </section>
  )
}
