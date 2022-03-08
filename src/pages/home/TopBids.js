import React, { useEffect } from 'react';
import TopBidsCard from '../../components/elements/cards/TopBidsCard';
import { Typography, Box, Container, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTopBidAssets } from 'redux/topBidAssets/actions';

const TopBids = () => {
    const dispatch = useDispatch();
    const { topBidAssets } = useSelector((state) => state.topBidAssets);

    useEffect(() => {
        dispatch(getTopBidAssets());
    }, [dispatch]);

    if (topBidAssets?.length === 0) return null;

    return (
        <div className="home-top-bids">
            <Container maxWidth="xl">
                <Box mb={4} textAlign="center">
                    <Typography variant="h2">Top Bids</Typography>
                    <Box mb={4} textAlign="center">
                        <Box className="view-all">
                            <Link to="/auction" color="primary">
                                <Button className="view-all-btn">View All</Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>

                <TopBidsCard />
            </Container>
        </div>
    );
};

export default TopBids;
