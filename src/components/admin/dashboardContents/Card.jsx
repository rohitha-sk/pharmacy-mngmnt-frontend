/* eslint-disable react/prop-types */
import React from 'react';

const Card = ({ children, style }) => {
    return (
        <div
            className="bg-white rounded-lg shadow-md p-4"
            style={{ ...style, height: '100%' }}
        >
            {children}
        </div>
    );
};

export default Card;
