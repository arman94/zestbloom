import React from 'react';
import { Box, Dialog, Typography } from '@material-ui/core';
import ComingSoonImage from '../../../assets/img/comming-soon-image.svg';
import { Link } from 'react-router-dom';

const MiniInfoModal = ({ open, close, email, title }) => {
    return (
        <>
            <Dialog open={open} onClose={close} scroll="body" maxWidth="xs" className="mini-modal">
                <Box className="modal-body">
                    {title && <Typography variant="h4">{title}</Typography>}
                    <Box className="mini-modal-image">
                        <Box className="image">
                            <img src={ComingSoonImage} alt="Coming Soon" />
                        </Box>
                    </Box>
                    {email && (
                        <Typography variant="subtitle2">
                            Email us at <Link to="">{email}</Link>
                        </Typography>
                    )}
                </Box>
            </Dialog>
        </>
    );
};

export default MiniInfoModal;
