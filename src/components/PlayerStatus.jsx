import React from 'react';
const PlayerStatus = ({ hp, hunger, hygiene, mood }) => {
    const bar = (label, value, color) => (
        <div className="col-sm-3">
            <div className="text-white fw-bold mb-1">{label}</div>
            <div className="progress">
                <div
                    className={`progress-bar bg-${color}`}
                    role="progressbar"
                    style={{ width: `${value}%` }}
                >
                {value}
                </div>
            </div>
        </div>
    );

    return (
        <div className="row py-3 rounded">
            {bar('HP', hp, 'danger')}
            {bar('Hunger', hunger, 'warning')}
            {bar('Hygiene', hygiene, 'primary')}
            {bar('Mood', mood, 'success')}
        </div>
    );
};

export default PlayerStatus;
