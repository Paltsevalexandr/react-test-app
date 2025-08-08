import React, {useState, useEffect} from 'react';


export default function Popup({ styles }) {
    const [time, setTime] = useState(10 * 60);

    useEffect(() => {
        const runTimer = async () => {
            setTime(prevTime => prevTime - 1);
        };

        runTimer();

        const interval = setInterval(runTimer, 1000);

        return () => clearInterval(interval);
    }, []);

    function handleYesBtn() {
        setTime(10 * 60);
    }

    function handleNoBtn() {
        setTime(10 * 60);
    }

    function getFormattedTime(timeSeconds) {
        if (timeSeconds == null) {
            return "--:--:--";
        }
        let isNegative = false;
        if (timeSeconds < 0) {
            timeSeconds *= -1;
            isNegative = true;
        }
        
        let hours = Math.floor(timeSeconds / 60 / 60);
        let minutes = Math.floor((timeSeconds - hours * 3600) / 60);
        let seconds = timeSeconds - hours * 3600 - minutes * 60;
        let result = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
        if (isNegative) {
            result = `-${result}`;
            
        }
        return result;
    }

    function addZero(int) {
        if (int < 10) {
            return `0${int}`;
        }
        return int;
    }

    return (
        <div className={styles.tracking__popup}>
            <div className={styles['tracking__popup-body']}>
                <h2 className={styles['tracking__popup-title']}>
                    Time is up. Do you wish to continue?
                </h2>
                <p className={styles['tracking__popup-time']}>
                    {getFormattedTime(time)}
                </p>
                <div className={styles['tracking__popup-controls']}>
                    <button className={styles['tracking__popup-btn']}
                     onClick={handleYesBtn}>
                        Yes
                    </button>
                    <button className={styles['tracking__popup-btn']}
                     onClick={handleNoBtn}>
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}
