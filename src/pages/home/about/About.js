import React, { useContext } from 'react';
import { Typography, Box, Container, Grid } from '@material-ui/core';
import { Logo } from 'components/shared';
import { AboutAnchorContext } from '../../../components/elements/MainRoute';

const About = () => {
    const anchorRef = useContext(AboutAnchorContext);
    return (
        <div className="home-about relative desktop-only" ref={anchorRef}>
            <Container maxWidth="xl" className="text-center">
                <Grid container justifyContent="center">
                    <Grid item md={7}>
                        <Box display="flex" justifyContent="center" mb={1}>
                            <Logo type="logoIcon" width="178" />
                        </Box>
                        <Box mb={3}>
                            <Typography variant="h3" component="h2">
                                What is Zestbloom?
                            </Typography>
                        </Box>
                        <Typography className="about-text">
                            ZestBloom is a next generation Digital Media marketplace seeking to
                            offer a brand new way of experiencing Crypto Art while simultaneously
                            supporting and promoting artists for their contributions. We are built
                            on the Algorand, one of the fastest and most efficient blockchains to
                            date allowing us to facilitate purchases and track ownership of assets,
                            with significantly reduced fees and a smaller carbon footprint.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default About;
