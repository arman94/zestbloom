import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Container, Grid, Card } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterByTagFromSide } from 'redux/marketplace/actions';

const Products = () => {
    const { assetsStaticTags } = useSelector((state) => state.marketplace);
    const dispatch = useDispatch();

    const onSubmit = (slug) => {
        dispatch(setFilterByTagFromSide(slug));
    };

    return (
        <Container maxWidth="xl" className="desktop-only">
            <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
                className="home-products"
            >
                {assetsStaticTags?.map((item, i) => (
                    <Grid
                        item
                        key={item.slug}
                        className="home-product"
                        onClick={() => onSubmit(item.slug)}
                    >
                        <Card className="hover-shadow">
                            <Link to="/marketplace">
                                <Box textAlign="right" px={1} pt={1} className="home-product-arrow">
                                    <ChevronRight style={{ fontSize: 32 }} />
                                </Box>
                                <Box textAlign="center">
                                    <Box
                                        mb={3}
                                        lineHeight="1"
                                        style={{ fontSize: 48 }}
                                        className="color-primary home-product-icon"
                                    >
                                        <i className={item.icon} />
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        className="text-uppercase home-product-text"
                                    >
                                        {item.name}
                                    </Typography>
                                </Box>
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Products;
