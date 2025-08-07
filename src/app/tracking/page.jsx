"use client";

import React, { useState } from 'react';
import styles from "./page.module.scss";


export default function page() {
    const [numberOfParts, setNumberOfParts] = useState(null);
    const [timePerPart, setTimePerPart] = useState(null);

    return (
        <div>Tracking</div>
    )
}

