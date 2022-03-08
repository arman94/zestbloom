import React from 'react';
import { Box } from '@material-ui/core';
import algoFont from 'assets/img/algo-font.svg';
import algoFontWhite from 'assets/img/algo-font-white.svg';
import BuyNow from 'pages/asset/singlePage/actionsWithAsset/buyNow';
import PlaceABid from './placeABid';
import MakeAnOffer from './makeAnOffer';
import { setNotification } from 'redux/profile/actions';
import { useDispatch } from 'react-redux';

const CardButton = ({
    auction,
    showedPrice,
    activeContract,
    onOpenBidModal,
    onOpenOfferModal,
    base_node,
    currentAsset,
    onOpenSubmittedBuyNow,
    creator,
    assetsInWallet,
}) => {
    const dispatch = useDispatch();

    const giveNotification = (message) => {
        dispatch(setNotification(message));
    };

    const button = () => {
        if (auction)
            return (
                <PlaceABid
                    auction={auction}
                    onOpenBidModal={onOpenBidModal}
                    base_node={base_node}
                />
            );

        if (activeContract)
            return (
                <BuyNow
                    currentAsset={currentAsset}
                    giveNotification={giveNotification}
                    bestSale={base_node}
                    auction={auction}
                    assetCardButton="asset-card-button"
                    onOpenSubmittedBuyNow={onOpenSubmittedBuyNow}
                />
            );
        return (
            <MakeAnOffer
                onOpenOfferModal={onOpenOfferModal}
                currentAsset={currentAsset}
                assetsInWallet={assetsInWallet}
            />
        );
    };

    return (
        <>
            {auction ? (
                <Box>
                    <Box fontSize="0.75rem" color="text.black50">
                        Current Bid
                    </Box>
                    <Box fontSize="1.25rem" mt={1} fontWeight="bold" className="price-algo">
                        <Box fontSize="1.25rem" fontWeight="bold" className="bid-price">
                            {auction?.last_bid?.bid_amount ?? auction?.reserve_price}
                        </Box>
                        <img className="desktop-only" src={algoFont} alt="Algo" />
                        <img className="mobile-only" src={algoFontWhite} alt="Algo" />
                    </Box>
                </Box>
            ) : (
                <Box fontSize="1.25rem" fontWeight="bold" className="price-algo">
                    <span>{showedPrice}</span>
                    {showedPrice && (
                        <>
                            <img className="desktop-only" src={algoFont} alt="Algo" />
                            <img className="mobile-only" src={algoFontWhite} alt="Algo" />
                        </>
                    )}
                </Box>
            )}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-end"
                fontWeight="bold"
                flexGrow={{ xs: 1, sm: 'auto' }}
            >
                <Box
                    fontSize="1rem"
                    width={{ xs: '100%', sm: 'auto' }}
                    mt={{ xs: 0, sm: 1 }}
                    display="flex"
                    alignItems="center"
                >
                    {button()}
                </Box>
            </Box>
        </>
    );
};

export default CardButton;
