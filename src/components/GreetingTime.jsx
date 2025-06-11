import React from 'react';

export default function Greeting({ time }) {
    const getGreeting = () => {
        const { hours } = time;
        if (hours >= 5 && hours < 12) return 'Good morning, ';
        if (hours >= 12 && hours < 17) return 'Good afternoon, ';
        if (hours >= 17 && hours < 21) return 'Good evening, ';
        return 'Good night, ';
    };

    return getGreeting();
}
