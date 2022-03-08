import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
    Typography,
    Box,
    Container,
    Grid,
    Card,
    CardMedia,
    Avatar,
    Button,
} from '@material-ui/core';
import { ThumbUpOutlined, ThumbUp } from '@material-ui/icons';
import { Tag } from 'components/shared';
import {
    getBestVoted,
    setValueBestVoted,
    upvoteAsset,
    unUpvoteAsset,
} from 'redux/bestVotedAssets/actions';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'components/shared/slider';
import ConfirmModal from 'components/elements/modal/confirmModal';
import { PRIVATE, PRIVATE_OWNER, REDIRECT_TO_ASSET } from 'configs';
import { stopEvent } from 'helpers/functions';

function getPictureData(data) {
    if (!data) return null;
    const { url, mimetype, ipfs_url } = data?.content ?? {};
    const content_url = url ?? ipfs_url;
    const type = mimetype?.split('/')[0];
    switch (type) {
        case 'image':
            return { component: 'img', src: content_url };
        case 'video':
            return { component: 'video', src: content_url, autoplay: 'autoPlay', muted: true };
        case 'audio':
        case 'text':
        case 'application':
            return { component: 'img', src: data?.thumbnail?.url };
        default:
            return { component: 'img', src: content_url };
    }
}

export default function BestVotedCard({ cardData }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { bestVotedAssets } = useSelector((state) => state.bestVotedAssets);
    const { user } = useSelector((state) => state.auth);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [openNsfwModal, setOpenNsfwModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        dispatch(getBestVoted());
    }, [dispatch, isLoggedIn]);

    const onUpvoted = (guid, username) => {
        if (isLoggedIn && user.username !== username) {
            dispatch(upvoteAsset(guid));
        }
    };
    const onUnUpvoted = (guid, username) => {
        if (isLoggedIn && user.username !== username) {
            dispatch(unUpvoteAsset(guid));
        }
    };
    const redirectToMarketplace = () => {
        dispatch(setValueBestVoted(true));
    };

    const redirectToProfile = (e, username) => {
        e.stopPropagation();
        if (username !== PRIVATE) history.push(`/profile/${username}`);
    };
    // if (bestVotedAssets?.length === 0) return null;

    const onCloseNsfwModal = () => {
        setOpenNsfwModal(false);
    };
    const redirectToAsset = () => {
        history.push(`/asset/${selectedId}`);
    };
    const clickOnCard = (e, is_nsfw, assetId) => {
        if (is_nsfw) {
            stopEvent(e);
            setSelectedId(assetId);
            setOpenNsfwModal(true);
        }
    };

    const withPrivateUsers = bestVotedAssets?.map((item) => ({
        ...item,
        creator: item?.creator ?? PRIVATE_OWNER,
    }));

    const pictureData = getPictureData(cardData?.asset);

    return (
        <Grid item xs={12} key={cardData?.guid}>
            <Link className="w-100 h-100" to={`/asset/${cardData?.asset?.asset_id}`}>
                <Card
                    className="h-100"
                    style={{
                        cursor: 'pointer',
                        margin: '12px',
                    }}
                    onClick={(e) =>
                        clickOnCard(e, cardData?.asset?.is_nsfw, cardData?.asset?.asset_id)
                    }
                >
                    <Box p={1.5} className="card-img-wrap">
                        <div
                            className={`card-img ${
                                cardData?.asset?.is_nsfw ? 'card-img-blur' : ''
                            }`}
                        >
                            {pictureData && (
                                <CardMedia
                                    component={pictureData?.component}
                                    src={pictureData?.src}
                                    muted={pictureData?.muted}
                                    // controls
                                    loop
                                    autoPlay={pictureData?.autoplay}
                                    style={{
                                        height: 360,
                                        objectFit: 'cover',
                                    }}
                                />
                            )}
                            <Tag
                                text="TOP"
                                className="brand-red md bottom-left rotated"
                                icon={<i className="icon-fire" style={{ fontSize: 16 }} />}
                            />
                        </div>
                    </Box>

                    <Box
                        className="best-voted-content"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <div>
                            <Box className="best-voted-title" mb={1}>
                                {cardData?.title}
                            </Box>
                            <Box fontSize={16} display="flex" alignItems="center">
                                <Avatar
                                    alt={cardData?.creator?.username}
                                    src={cardData?.creator?.avatar}
                                    className={
                                        cardData?.creator?.username === PRIVATE
                                            ? 'private_user_icon sm'
                                            : 'sm'
                                    }
                                />
                                <Box
                                    fontWeight="bold"
                                    fontFamily="h1.fontFamily"
                                    className="best-voted-username link primary ellipsis"
                                    onClick={(e) =>
                                        redirectToProfile(e, cardData?.creator?.username)
                                    }
                                >
                                    @{cardData?.creator?.username}
                                </Box>
                            </Box>
                        </div>

                        <Box
                            textAlign="right"
                            display="flex"
                            alignItems="center"
                            className={`best-voted-voting ${
                                cardData?.voted ? 'color-primary' : ''
                            }`}
                        >
                            {cardData?.voted ? (
                                <ThumbUp
                                    style={{ fontSize: 24 }}
                                    className="pointer hover-opacity"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onUnUpvoted(cardData?.guid, cardData?.creator?.username);
                                    }}
                                />
                            ) : (
                                <ThumbUpOutlined
                                    style={{ fontSize: 24 }}
                                    className="pointer hover-opacity"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onUpvoted(cardData?.guid, cardData?.creator?.username);
                                    }}
                                />
                            )}
                            <Box component="span" ml={1}>
                                {cardData?.vote_count}
                            </Box>
                        </Box>
                    </Box>
                </Card>
            </Link>
        </Grid>
    );
}
