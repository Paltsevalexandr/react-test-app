"use client";

import React, { useState } from 'react';
import styles from "./page.module.scss";
import InfoSection from "../components/login_and_build/InfoSection";
import FormSection from "../components/login_and_build/FormSection";
import StartSection from '../components/login_and_build/StartSection';


export default function page() {
	const [numberOfParts, setNumberOfParts] = useState(null);
	const [timePerPart, setTimePerPart] = useState(null);

	return (
		<>
			<FormSection
				styles={styles}
				setNumberOfParts={setNumberOfParts}
				setTimePerPart={setTimePerPart}
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
						/>
					</>
				: null
			}
			
		</>
		
		
	)
}
