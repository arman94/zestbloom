import React, { useState } from 'react';
import { Box, Typography, Link } from '@material-ui/core';
import { setMyAlgoAccount, dissconnectMyAlgo } from 'redux/profile/actions';
import { useDispatch } from 'react-redux';
import { Logo } from '.';
import algorandLogo from 'assets/img/algorand-logo.svg';
import WalletInfoModal from '../elements/modal/miniWalletInfoModal';
import { useHistory } from 'react-router';
import { useReach } from 'hooks/useReach';

const WalletCard = ({ id, label, connected, address, infoFromMkOff }) => {
    const reach = useReach();
    const dispatch = useDispatch();
    const history = useHistory();
    const [openModal, setOpenModal] = useState(false);

    const onSubmit = async (e) => {
        try {
            e.stopPropagation();
            if (!connected) {
                const acc = await reach.getDefaultAccount();
                dispatch(setMyAlgoAccount([{ address: acc.networkAccount.addr }]));
            } else {
                dispatch(dissconnectMyAlgo(address));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const openInfo = async () => {
        if (connected) {
            setOpenModal(true);
        }
    };

    const onCloseModal = () => {
        setOpenModal(false);
    };
    return (
        <>
            <Box
                className="wallet-card"
                key={id}
                style={{ cursor: connected ? 'pointer' : 'default', marginTop: '10px' }}
                component="li"
                mx={0}
                onClick={openInfo}
            >
                {connected ? (
                    <img src={algorandLogo} alt="Algorand" style={{ margin: '21px auto' }} />
                ) : (
                    <Logo type="logoIconGray" width="53" />
                )}

                <Typography variant="body2" component="strong" className="name">
                    {label}
                </Typography>
                <Link
                    to={history.location.pathname}
                    color={connected ? 'error' : 'primary'}
                    onClick={onSubmit}
                >
                    {connected ? 'Disconnect' : 'Connect'}
                </Link>
            </Box>
            {openModal && (
                <WalletInfoModal
                    open={openModal}
                    close={onCloseModal}
                    info={infoFromMkOff}
                    address={address}
                />
            )}
        </>
    );
};

export default WalletCard;
