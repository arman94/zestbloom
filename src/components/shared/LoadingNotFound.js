import React from 'react';
import NotFound from './notFound';
import LottieContainer from './LottieContainer';
const LoadingNotFound = ({ loading }) => {
    return (
        <>
            {loading ? (
                <div style={{ height: '500px' }} className="not-found-in-pages">
                    <LottieContainer
                        containerStyles={{
                            height: '90px',
                            width: '100%',
                        }}
                        lottieStyles={{ width: '95px' }}
                    />
                </div>
            ) : (
                <NotFound fromPage={true} />
            )}
        </>
    );
};

export default LoadingNotFound;
