import React from 'react'

export default function Timer({
    styles, textClasses,
    formattedTime, pauseSession,
    defectsAmount, setDefectsAmount,
    submitData
}) {
    
    return (
        <>
            <div className={styles['timer__time-wrap']}>
                <p className={textClasses}>
                    {formattedTime}
                </p>
            </div>
            <div className={styles.timer__controls}>
                <button className={styles.timer__btn}
                    onClick={pauseSession}>
                    Pause
                </button>
                <button className={styles.timer__btn}
                    onClick={submitData}>
                    Next
                </button>
            </div>
            <div className={styles['timer__inputs-wrap']}>
                 <label htmlFor='defects-entry' className={styles.timer__label}>
                    <span className={styles['timer__label-text']}>
                        Number of Defects:
                    </span>
                    <input
                        className={styles.timer__input}
                        onChange={(e) => setDefectsAmount(+e.target.value)}
                        value={defectsAmount}
                        type="number"
                        name="defects-entry"
                        id="defects-entry" />
                </label>
            </div>
        </>
    )
}

