import React, { useMemo } from 'react';
import { Button } from '@material-ui/core';
import { stopEvent } from 'helpers/functions';
import { useDispatch, useSelector } from 'react-redux';
import { setNonLoggedMyAlgoAccount } from 'redux/profile/actions';
import { nonLoggedConnect } from 'transactions/algorand/connectWallet';

const MakeAnOffer = ({ onOpenOfferModal, currentAsset, assetsInWallet }) => {
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const { total, asset_id } = currentAsset?.asset ?? {};

    const showBtn = useMemo(() => {
        const getMyAssetAmount =
            assetsInWallet?.reduce((acc, curr) => {
                if (curr['asset-id'] === asset_id) return acc + curr['amount'];
                return acc;
            }, 0) ?? 0;

        return total > getMyAssetAmount;
    }, [asset_id, assetsInWallet, total]);

    const setWalletsToUser = async (getAccounts) => {
        return dispatch(setNonLoggedMyAlgoAccount(getAccounts));
    };

    const makeOffer = async (e) => {
        try {
            stopEvent(e);
            if (!isLoggedIn) {
                const account = await nonLoggedConnect(setWalletsToUser);
                if (account?.length === 0) return;
            }
            onOpenOfferModal();
        } catch (err) {
            console.log(err);
        }
    };
    const hasOffer = currentAsset?.offers?.find(
        (offer) => user?.username && offer?.maker?.username === user?.username,
    );

    return (
        showBtn && (
            <Button
                variant="contained"
                color="primary"
                className="asset-card-button"
                onClick={makeOffer}
            >
                {hasOffer ? 'Change offer' : 'Make An Offer'}
            </Button>
        )
    );
};

export default MakeAnOffer;
