import React from 'react';
import { Typography, Box, Card, CardMedia, Avatar } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { needToLoginAction } from 'redux/auth/actions';
import defaultBg from 'assets/img/defaultBg.png';

const PeopleCard = ({ tags, img, authorName, authorAvatar, author, lastName, firstName, bio }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    const openSignIn = () => dispatch(needToLoginAction(true));

    const onSubmit = () => {
        if (isLoggedIn) {
            return history.push(`/profile/${author}`);
        }
        openSignIn();
    };

    const staticTag = tags?.find((tag) => tag.type === 'static');
    const customTag = tags?.find((tag) => tag.type === 'custom');

    return (
        <Card
            className="h-100"
            onClick={onSubmit}
            onMouseOver={(e) => {
                e.target.style.cursor = 'pointer';
            }}
        >
            <Box className="featured-artist-img-wrap">
                <Box style={{ borderRadius: '10px 10px 0 0' }} overflow="hidden">
                    <CardMedia image={img || defaultBg} />
                </Box>
                <div className="featured-artist-img-bg" />
                <div className="featured-artist-img-main">
                    <div className="featured-artist-img circle">
                        <Avatar alt={authorName} src={authorAvatar} className="xl" />
                    </div>
                    <Box className="featured-artist-tags">
                        {staticTag?.name && <span>{staticTag.name}</span>}
                        {customTag?.name && <span>{customTag.name}</span>}
                    </Box>
                </div>
            </Box>

            <Box className="featured-artist-names-wrapper">
                <Typography gutterBottom variant="h5" className="featured-artist-fullname">
                    {firstName} {lastName}
                </Typography>

                <Box
                    fontSize={16}
                    lineHeight="18px"
                    fontWeight="bold"
                    fontFamily="h1.fontFamily"
                    className="link primary ellipsis featured-artist-username"
                >
                    @{author}
                </Box>
            </Box>
            {/* </Box> */}
            <div className="card-bio">
                <Typography>{bio.length > 180 ? `${bio?.substring(0, 180)} ...` : bio}</Typography>
            </div>
        </Card>
    );
};

export default PeopleCard;
