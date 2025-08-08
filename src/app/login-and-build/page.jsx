"use client";

import React, { useState } from 'react';
import styles from "./page.module.scss";
import InfoSection from "../components/login_and_build/InfoSection";
import FormSection from "../components/login_and_build/FormSection";
import StartSection from '../components/login_and_build/StartSection';


export default function page() {
	const [loginId, setLoginId] = useState("");
	const [buildNumber, setBuildNumber] = useState("");
	const [numberOfParts, setNumberOfParts] = useState(null);
	const [timePerPart, setTimePerPart] = useState(null);

	return (
		<main>
			<FormSection
				styles={styles}
				setNumberOfParts={setNumberOfParts}
				setTimePerPart={setTimePerPart}
				buildNumber={buildNumber}
				setBuildNumber={setBuildNumber}
				loginId={loginId}
				setLoginId={setLoginId}
			/>
			{
				numberOfParts != null && timePerPart != null
					?
					<>
						<InfoSection
							styles={styles}
							numberOfParts={numberOfParts}
							timePerPart={timePerPart}
						/>
						<StartSection
							styles={styles}
							loginId={loginId}
							buildNumber={buildNumber}
						/>
					</>
				: null
			}
			
		</main>
		
		
	)
}
