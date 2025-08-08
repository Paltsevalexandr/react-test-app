import React from 'react';
import { useRouter } from 'next/navigation';


export default function StartSection({ styles, loginId, buildNumber }) {
	const router = useRouter();

	function start() {
		fetch(`http://localhost:5000/start?login_id=${loginId}`)
			.then(async (response) => {
				if (response.status == 200) {
					localStorage.setItem("loginId", loginId);
					localStorage.setItem("buildNumber", buildNumber);
					router.push("/tracking");					
				}
				else {
					console.log("failed")
				}
			})
			.catch((error) => console.log(error));
	}

    return (
        <section className={styles.start}>
			<button onClick={start}
				className={styles.start__button}>
				Start
			</button>
        </section>
    )
}

