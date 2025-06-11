import React from 'react';

export default function InGameClock({ time }) {
    const formatTime = (num) => num.toString().padStart(2, '0');

    return <React.Fragment> 
        {formatTime(time.hours)}:{formatTime(time.minutes)}
    </React.Fragment>;
}
