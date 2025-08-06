import React, { useState } from 'react';


export default function FormSection({ styles, setNumberOfParts, setTimePerPart }) {
    const [loginId, setLoginId] = useState("");
    const [buildNumber, setBuildNumber] = useState("");

    function submitForm(e) {
		e.preventDefault();

        setNumberOfParts(4);
        setTimePerPart(23);

	}
    return (
        <section className={styles.login}>
            <div className={styles.login__content}>
                <h1 className={styles.login__title}>
                    Login & Build Selection
                </h1>
                <form className={styles.login__form}>
                    <input onChange={(e) => setLoginId(e.target.value)}
                        value={loginId}
                        className={styles.login__input}
                        type="text"
                        name="login_id"
                        id="loginId" />
                    
                    <input
                        onChange={(e) => setBuildNumber(e.target.value)}
                        value={buildNumber}
                        className={styles.login__input}
                        type="text"
                        name="build_number"
                        id="buildNumber"
                    />
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
