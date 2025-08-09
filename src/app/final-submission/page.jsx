"use client";

import React, { useState, useEffect } from 'react';
import styles from "./page.module.scss";
import { useRouter } from 'next/navigation';


export default function page() { 
    const router = useRouter();
    const [totalParts, setTotalParts] = useState(0);
    const [errors, setErrors] = useState([]);
    const [loginId, setLoginId] = useState("");

    useEffect(() => {
        const _loginId = localStorage.getItem("loginId");
    
        if (_loginId) {
            setLoginId(_loginId);
        }
    }, []);

    async function finalSubmit() {
        try {            
            const params = new URLSearchParams({
                login_id: loginId,
                total_parts: totalParts,
            });
            const url = `http://localhost:5000/save-session?${params}`;

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
                        router.push("/");
                        setErrors([]);
                    }
                    else {
                        setErrors(["Failed to save data 1"]);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setErrors(["Failed to save data 2"]);
                });
        }
        catch (error) {
            console.log("Failed to save session");
        }
    }

    return (
        <div className={styles.final}>
            <h1 className={styles.final__title}>
                Final Submission
            </h1>
            <div className={styles.final__content}>
                <label htmlFor="total-parts"
                className={styles.final__label}>
                    <span className={styles['final__label-text']}>
                        Total Parts
                    </span>
                    <input
                        className={styles.final__input}
                        value={totalParts}
                        onChange={(e) => setTotalParts(+e.target.value)}
                        type="number"
                        name="total-parts"
                        id="total-parts" />
                </label>
                {
                    errors.length > 0
                    ?  <p className={styles.final__errors}>
                        {errors}
                    </p>
                    : null
                }
                <button className={styles['final__btn']}
                     onClick={finalSubmit}>
                    Submit
                </button>
            </div>
        </div>
        
    )
}
