import React from 'react';
import { Button, Box, Dialog, Typography } from '@material-ui/core';

const ConfirmModal = (props) => {
    const { open, onClose, onConfirm, info } = props;
    return (
        <Dialog open={open} onClose={onClose} scroll="body" className="cancel-popup">
            <Box className="cancel-popup-content">
                <Typography variant="body1" className="title">
                    {info.title}
                </Typography>
                <Typography className="desc">{info.description}</Typography>
                <Box display="flex" alignItems="center" mt={5} justifyContent="flex-end">
                    <Box mr={1}>
                        <Button color="secondary" onClick={onClose}>
                            No
                        </Button>
                    </Box>
                    <Box>
                        <Button color="primary" onClick={onConfirm}>
                            Yes
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
};

export default ConfirmModal;
