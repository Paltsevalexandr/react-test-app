"use client";

import React, { useState, useEffect } from 'react';
import styles from "./page.module.scss";
import TrackingContent from '../components/tracking/TrackingContent';


export default function page() {
    const [loginId, setLoginId] = useState("");
    const [buildNumber, setBuildNumber] = useState("");
    const [numberOfParts, setNumberOfParts] = useState(null);
    const [timePerPart, setTimePerPart] = useState(null);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const _loginId = localStorage.getItem("loginId");
        const _buildNumber = localStorage.getItem("buildNumber");        

        if (_loginId && _buildNumber) {
            setLoginId(_loginId);
            setBuildNumber(_buildNumber);

            fetch('http://localhost:5000/get-build-data', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ loginId: _loginId, buildNumber: _buildNumber })
            })
            .then(async (response) => {
                if (response.status == 200) {
                    let build = await response.json();
                    const { numberOfParts, timePerPart } = build;

                    setNumberOfParts(numberOfParts);
                    setTimePerPart(timePerPart);
                    setErrors([]);
                }
                else {
                    let responseBody = await response.json();
                    let errors = responseBody.errors;
                    if (errors) {
                        console.log(errors, 'errors');
                        setErrors(errors);
                        setNumberOfParts(null);
                        setTimePerPart(null);
                    }
                    else {
                        setErrors(["Unknown error"]);
                        setNumberOfParts(null);
                        setTimePerPart(null);
                    }
                }
            })
            .catch((error) => {
                setErrors(["Unknown error"]);
                setNumberOfParts(null);
                setTimePerPart(null);
            });
        }
    }, []);
    
    return (
        <main>
            <header className={styles.header}>
                <div className={styles.header__content}>
                    <div className={styles.header__info}>
                        <p className={styles['header__info-label']}>
                            Login ID:
                        </p>
                        <p className={styles['header__info-value']}>
                            {loginId ?? ""}
                        </p>
                    </div>
                    <div className={styles.header__info}>
                        <p className={styles['header__info-label']}>
                            Build Number:
                        </p>
                        <p className={styles['header__info-value']}>
                            {buildNumber ?? ""}
                        </p>
                    </div>
                    <div className={styles.header__info}>
                        <p className={styles['header__info-label']}>
                            Number of Parts:
                        </p>
                        <p className={styles['header__info-value']}>
                            {numberOfParts ?? ""} {numberOfParts ? "items" : ""}
                        </p>
                    </div>
                    <div className={styles.header__info}>
                        <p className={styles['header__info-label']}>
                            Time per Part:
                        </p>
                        <p className={styles['header__info-value']}>
                            {timePerPart ?? ""} {timePerPart ? "min" : ""}
                        </p>
                    </div>
                </div>
            </header>
            <section className={styles.tracking}>
                <div className={styles.tracking__content}>
                    <TrackingContent
                        timePerPart={timePerPart}
                        numberOfParts={numberOfParts}
                        errors={errors}
                        setErrors={setErrors}
                        styles={styles}
                        loginId={loginId}
                        buildNumber={buildNumber}    
                    />
                </div>
            </section>
        </main>
        
    )
}

