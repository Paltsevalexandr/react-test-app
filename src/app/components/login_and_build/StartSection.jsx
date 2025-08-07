import React from 'react';
import { useRouter } from 'next/navigation';


export default function StartSection({ styles }) {
	const router = useRouter();

	function start() {
		console.log("start");
		fetch('http://localhost:5000/start?login_id=user1')  // TODO - change login id to dynamic
			.then(async (response) => {
				if (response.status == 200) {
					console.log("success")
					const result = await response.json();
					router.push('/tracking');
					console.log(result);
				}
				else {
					console.log("failed")
				}
			});
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

