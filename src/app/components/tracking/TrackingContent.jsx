import React, { useState, useEffect } from 'react'
import Errors from "../common/Errors";
import Timer from './Timer';
import Overlay from './Overlay';
import Popup from './Popup';

export default function TrackingContent({
    styles, errors,
    setErrors, loginId,
    buildNumber
}) {
    const [timeLeft, setTimeLeft] = useState(null);
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (loginId) {
                try {
                    const baseUrl = "http://localhost:5000/get-session";
                    const params = new URLSearchParams({
                        login_id: loginId,
                        build_number: buildNumber 
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
                    const { timeLeft, session } = json;
                    setSession(session);
                    setTimeLeft(timeLeft);
                    setErrors([]);
                } catch (err) {
                    console.error('Failed to fetch:', err);
                    setTimeLeft(null);
                    setErrors(["Problem connecting with server"]);
                }
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 1000);

        return () => clearInterval(interval);
    }, [loginId]);

    async function toggleSession(isPaused) {
        try {
            const baseUrl = "http://localhost:5000/toggle-session";
            const params = new URLSearchParams({
                login_id: loginId,
                is_paused: isPaused 
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
            const { session } = json;
            setSession(session);
        }
        catch (err) {
            console.error('Failed to fetch:', err);
        }
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

    const formattedTime = getFormattedTime(timeLeft);
    let textClasses = styles.timer__time;
    if (timeLeft < 0) {
        textClasses += " " + styles['timer__time-highlighted'];
    }

    return (
        <div className={styles.timer}>
            {
                timeLeft < 0
                ? <Popup
                    styles={styles} />
                : errors.length == 0 && session && session.is_paused
                    ? <Overlay
                        styles={styles}
                        resumeSession={() => toggleSession(false)}
                    />
                    : errors.length > 0
                        ? <Errors errors={errors}
                            styles={{ fontSize: "2rem", textAlign: "center" }}
                        />
                        : <Timer
                            styles={styles}
                            textClasses={textClasses}
                            formattedTime={formattedTime}
                            pauseSession={()=>toggleSession(true)}
                        />
            }
        </div>
    );
}
