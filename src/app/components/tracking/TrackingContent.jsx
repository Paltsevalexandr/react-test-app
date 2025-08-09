import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Errors from "../common/Errors";
import Timer from './Timer';
import Overlay from './Overlay';
import Popup from './Popup';

export default function TrackingContent({
    styles, errors,
    setErrors, loginId,
    buildNumber
}) {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(null);
    const [session, setSession] = useState(null);
    const [defectsAmount, setDefectsAmount] = useState(0);
    const [sessionSubmitted, setSessionSubmitted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (loginId && !sessionSubmitted) {
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
            else if (sessionSubmitted) {
                clearInterval(interval);
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

    async function saveDefects() {
        setSessionSubmitted(true);
        try {
            let defectsAmountValue = defectsAmount;
            if (typeof defectsAmount != 'number' || isNaN(defectsAmount)) {
                defectsAmountValue = 0;
            }
            
            const params = new URLSearchParams({
                session_id: session.id,
                defects_amount: defectsAmountValue,
            });
            const url = `http://localhost:5000/save-defects?${params}`;

            fetch(url, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    },
                }
            )
                .then(async response => {
                    const json = await response.json();
                    const success = json.success;

                    if (success) {
                        router.push("/final-submission");
                        setErrors([]);
                    }
                    else {
                        setErrors(["Failed to save data"]);
                    }
                })
                .catch(error => {
                    setErrors(["Failed to save data"]);
                });
        }
        catch (error) {
            console.log("Failed to save defects");
        }
    }

    async function resetSession() {
        setSessionSubmitted(true);
        try {
            const params = new URLSearchParams({
                session_id: session.id,
            });
            const url = `http://localhost:5000/reset-session?${params}`;

            fetch(url, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    },
                }
            )
                .then(async response => {
                    const json = await response.json();
                    const success = json.success;
                    console.log(json);
                    if (success) {
                        router.push("/");
                        setErrors([]);
                    }
                    else {
                        setErrors(["Failed to reset session"]);
                    }
                })
                .catch(error => {
                    setErrors(["Failed to reset session"]);
                });
        }
        catch (error) {
            console.log("Failed to save defects");
        }
    }

    const formattedTime = getFormattedTime(timeLeft);
    let textClasses = styles.timer__time;
    if (timeLeft < 0) {
        textClasses += " " + styles['timer__time-highlighted'];
    }

    return (
        <div className={styles.timer}>
            {
                !sessionSubmitted && timeLeft < 0
                    ? <Popup
                        styles={styles}
                        session={session}
                        submitData={resetSession}
                    />
                    : null
            }
            {
                sessionSubmitted
                    ? <h1>Session Submitted</h1>
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
                                submitData={saveDefects}
                                defectsAmount={defectsAmount}
                                setDefectsAmount={setDefectsAmount}
                                textClasses={textClasses}
                                formattedTime={formattedTime}
                                pauseSession={()=>toggleSession(true)}
                            />
            }
        </div>
    );
}
