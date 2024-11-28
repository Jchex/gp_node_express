import React from 'react';

const Event = ({ event }) => {
    return (
        <div style={{ backgroundColor: event.style.backgroundColor, padding: '5px', borderRadius: '5px', color: 'white' }}>
            <strong>{event.title}</strong>
            <div>{event.desc}</div>
        </div>
    );
};

export default Event;