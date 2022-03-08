import React from 'react';
import { Box, Button } from '@material-ui/core';

const LoadMoreBtn = ({ loadMoreAssets }) => {
    return (
        <Box textAlign="center" mt={5}>
            <Button
                className="btn-load-more"
                variant="outlined"
                size="large"
                onClick={loadMoreAssets}
            >
                Load More
            </Button>
        </Box>
    );
};

export default LoadMoreBtn;
