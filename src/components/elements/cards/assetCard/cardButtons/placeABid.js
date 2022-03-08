import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { COMPLETED, NOTIFICATIONS } from 'configs';
import { stopEvent } from 'helpers/functions';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from 'redux/profile/actions';
import { setNonLoggedMyAlgoAccount } from 'redux/profile/actions';
import { nonLoggedConnect } from 'transactions/algorand/connectWallet';

const PlaceABid = ({ auction, onOpenBidModal, base_node }) => {
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const [isEnded, setIsEnded] = useState(false);
    const isCompleted = auction?.status === COMPLETED;
    const isMine = user?.username && base_node?.owner?.username === user?.username;

    const giveNotification = (message) => {
        dispatch(setNotification(message));
    };

    const checkEndTime = useCallback(
        (timer) => {
            const end = new Date(auction?.end_time * 1000);
            const now = new Date();
            if (now - end > 0) {
                setIsEnded(true);
                clearInterval(timer);
            }
        },
        [auction],
    );

    useEffect(() => {
        const timer = setInterval(() => {
            checkEndTime(timer);
        }, 30000);
        checkEndTime(timer);

        return () => clearInterval(timer);
    }, [checkEndTime]);

    const checkTime = () => {
        const now = new Date();
        const start = new Date(auction?.start_time * 1000);
        const end = new Date(auction?.end_time * 1000);

        if (start - now > 0) {
            giveNotification(NOTIFICATIONS.warning.auctionDontstarted);
            return false;
        }
        if (now - end > 0) {
            giveNotification(NOTIFICATIONS.warning.auctionFinished);
            return false;
        }
        return true;
    };

    const setWalletsToUser = async (getAccounts) => {
        return dispatch(setNonLoggedMyAlgoAccount(getAccounts));
    };

    const openPlaceABid = async (e) => {
        stopEvent(e);
        if (!isLoggedIn) {
            const account = await nonLoggedConnect(setWalletsToUser);
            if (account?.length === 0) return;
        }
        if (checkTime()) {
            onOpenBidModal();
        }
    };

    const showBtn = !isEnded && !isCompleted && !isMine;
    return (
        <>
            {showBtn && (
                <Button
                    variant="contained"
                    color="primary"
                    className="asset-card-button"
                    onClick={openPlaceABid}
                >
                    Place a bid
                </Button>
            )}
            {/* // <Button
                    //     variant="contained"
                    //     color="primary"
                    //     className="asset-card-button"
                    //     onClick={onOpenAuctionCloseModal}
                    // >
                    //     Close An Auction
                    // </Button> */}
        </>
    );
};

export default PlaceABid;
