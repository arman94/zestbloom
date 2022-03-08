import React from 'react';
import lottie_img from 'assets/img/lottie.gif';

const LottieContainer = ({ containerStyles, lottieStyles }) => {
    return (
        <div
            style={{
                ...containerStyles,
                display: 'flex',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            <img src={lottie_img} alt="lottie" style={lottieStyles} />
        </div>
    );
};

export default LottieContainer;
