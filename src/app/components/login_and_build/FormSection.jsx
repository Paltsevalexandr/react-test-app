import React, { useState } from 'react';
import Errors from '../common/Errors';


export default function FormSection({
    styles, setNumberOfParts,
    setTimePerPart,
    loginId, setLoginId,
    buildNumber, setBuildNumber
}) {
    const [errors, setErrors] = useState([]);

    function submitForm(e) {
		e.preventDefault();
        fetch('http://localhost:5000/get-build-data', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ loginId, buildNumber })
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

    return (
        <section className={styles.login}>
            <div className={styles.login__content}>
                <h1 className={styles.login__title}>
                    Login & Build Selection
                </h1>
                <form className={styles.login__form}>
                    <label className={styles.login__label} htmlFor="loginId">
                        <span className={styles['login__label-text']}>
                            Login Id
                        </span>
                        <input onChange={(e) => setLoginId(e.target.value)}
                            value={loginId}
                            className={styles.login__input}
                            type="text"
                            name="login_id"
                            id="loginId" />
                    </label>
                    
                    <label className={styles.login__label} htmlFor="buildNumber">
                        <span className={styles['login__label-text']}>
                            Build Number
                        </span>
                        <input
                            onChange={(e) => setBuildNumber(e.target.value)}
                            value={buildNumber}
                            className={styles.login__input}
                            type="text"
                            name="build_number"
                            id="buildNumber"
                        />
                    </label>
                    <Errors errors={errors} />
                    <button type="submit"
                        className={styles.login__button}
                        onClick={submitForm}>
                        Submit
                    </button>
                </form>
            </div>
        </section>
    )
}


