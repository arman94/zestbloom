import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Grid, Box, List, ListItem } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import { StartCollectingSearch, ImgTag } from 'components/shared';
import bannerImg1 from 'assets/img/banner-img1.png';
import bannerImg2 from 'assets/img/banner-img2.png';
import bannerImg3 from 'assets/img/banner-img3.png';
import bannerImg4 from 'assets/img/banner-img4.png';
import { getBannerPlaceholder } from 'redux/marketplace/actions';
import { BANNER_LIST } from 'configs';
import useWindowDimensions from 'hooks/useWindowDimensions';

const Banner = () => {
    const dispatch = useDispatch();
    const { bannerPlaceholder } = useSelector((state) => state.marketplace);
    const { isMobile } = useWindowDimensions();

    useEffect(() => {
        dispatch(getBannerPlaceholder());
    }, [dispatch]);

    const getAsset = (size) => bannerPlaceholder?.find((x) => x.size === size);

    return (
        <div className="banner">
            {isMobile ? (
                <Container maxWidth="sm">
                    <StartCollectingSearch id="banner-search" />
                </Container>
            ) : (
                <Container maxWidth="xl">
                    <Grid container justifyContent="space-between" spacing={3} alignItems="center">
                        <Grid item md={6} className="banner-left">
                            <Typography variant="h1">DISCOVER</Typography>
                            <Box mt={2} mb={3}>
                                <Typography variant="h4" className="text-capitalize">
                                    Algorand Digital Asset Exchange
                                </Typography>
                            </Box>
                            <StartCollectingSearch id="banner-search" />
                            <Box mt={4}>
                                <List>
                                    {BANNER_LIST.map((item, i) => (
                                        <ListItem key={i} disableGutters>
                                            <Box
                                                height={24}
                                                width={24}
                                                mr={2}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                className={`circle bg-${item.color}`}
                                            >
                                                <ArrowForward style={{ fontSize: 12 }} />
                                            </Box>
                                            <Box
                                                width={'calc(100% - 24px'}
                                                fontWeight="fontWeightBold"
                                                fontSize={'1.125rem'}
                                                lineHeight={'1.5rem'}
                                            >
                                                {item.text}
                                            </Box>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Grid>

                        <Grid item md={6} className="banner-right">
                            <div className="banner-images">
                                <div className="left">
                                    <ImgTag
                                        src={getAsset('217x210')?.content ?? bannerImg1}
                                        alt="Banner image"
                                        className="img-1 rounded"
                                        asset_id={getAsset('217x210')?.asset_id}
                                    />
                                    <ImgTag
                                        src={getAsset('370x233')?.content ?? bannerImg2}
                                        alt="Banner image"
                                        className="img-2 rounded"
                                        asset_id={getAsset('370x233')?.asset_id}
                                    />
                                </div>
                                <div className="right">
                                    <ImgTag
                                        src={getAsset('145x137')?.content ?? bannerImg3}
                                        alt="Banner image"
                                        className="img-3 rounded"
                                        asset_id={getAsset('145x137')?.asset_id}
                                    />
                                    <ImgTag
                                        src={getAsset('283x346')?.content ?? bannerImg4}
                                        alt="Banner image"
                                        className="img-4 rounded"
                                        asset_id={getAsset('283x346')?.asset_id}
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </div>
    );
};

export default Banner;
