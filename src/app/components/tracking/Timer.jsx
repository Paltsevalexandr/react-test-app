import React from 'react'

export default function Timer({styles, textClasses, formattedTime, pauseSession}) {
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
                <button className={styles.timer__btn}>
                    Next
                </button>
            </div>
        </>
    )
}

