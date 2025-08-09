import React, {useState, useEffect} from 'react';


export default function Popup({ styles, session, submitData }) {
    let storedTime = localStorage.getItem('storedTime');
    if (!storedTime) { 
        storedTime = 10 * 60;
    }
    const [time, setTime] = useState(storedTime);

    useEffect(() => {
        const runTimer = async () => {
            setTime(prevTime => {
                if (prevTime - 1 <= 0) {
                    resetSession();
                    submitData();
                    clearInterval(interval);
                    return prevTime;
                }
                else {
                    localStorage.setItem('storedTime', prevTime - 1);
                    return prevTime - 1;
                } 
            });
        };

        runTimer();

        const interval = setInterval(runTimer, 1000);

        return () => clearInterval(interval);
    }, []);

    function resetSession() {
        localStorage.removeItem('storedTime');
    }

    function handleYesBtn() {
        setExtraTime();
    }

    function handleNoBtn() {
        setExtraTime();
    }

    async function setExtraTime() {
        resetSession();
        const baseUrl = "http://localhost:5000/set-extra-time";
        const params = new URLSearchParams({
            session_id: session.id
        });
        const res = await fetch(`${baseUrl}?${params}`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
            }
        );
        const json = await res.json();
        console.log(json);
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
