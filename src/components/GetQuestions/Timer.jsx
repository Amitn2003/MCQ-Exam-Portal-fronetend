import React, { useEffect, useState } from 'react';

const Timer = ({ timeLeft, formatTime }) => {
    const [time, setTime] = useState(timeLeft);

    useEffect(() => {
        setTime(timeLeft);
    }, [timeLeft]);

    return (
        <div>
            <h4>Time Left: {formatTime(time)}</h4>
        </div>
    );
};

export default Timer;
