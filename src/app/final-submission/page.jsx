"use client";

import React, { useState, useEffect } from 'react';
import styles from "./page.module.scss";
import { useRouter } from 'next/navigation';
import FinalForm from '../components/final-submission/FinalForm';


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
                        setErrors(["Failed to save data"]);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setErrors(["Failed to save data"]);
                });
        }
        catch (error) {
            console.log("Failed to save session");
        }
    }

    return (
        <div className={styles.final}>
            <div className={styles.final__content}>
                <FinalForm
                    styles={styles}
                    totalParts={totalParts}
                    setTotalParts={setTotalParts}
                    errors={errors}
                    finalSubmit={finalSubmit}
                />
            </div>
        </div>
        
    )
}
