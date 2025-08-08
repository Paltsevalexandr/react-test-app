import React from 'react'

export default function Overlay({styles, resumeSession}) {
    return (
        <div className={styles.overlay}>
            <button className={styles.timer__btn}
                onClick={resumeSession}>
                Resume
            </button>
        </div>
    )
}
