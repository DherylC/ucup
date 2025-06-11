import React, { useEffect, useRef } from 'react';
import GameClock from './GameClock';

export default function GameTime({ time }) {
    return (
        <div className="m-3 px-4 pt-3 pb-2 rounded bg-light text-start">
            <h5>Time</h5>
            <h3 className="fw-bolder"><GameClock time={time} /></h3>
        </div>
    );
}