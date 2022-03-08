import React from 'react';
import { Box, Typography, Container } from '@material-ui/core';

const TextBannerTop = ({ bannerTitle, subtitle }) => {
    return (
        <>
            <Box textAlign="center" className="text-banner-top">
                <Container maxWidth="xl">
                    <Typography className="text-banner-top-title">{bannerTitle}</Typography>
                    <Typography className="text-banner-top-subtitle">{subtitle}</Typography>
                </Container>
            </Box>
        </>
    );
};

export default TextBannerTop;
