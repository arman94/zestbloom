// import React, { useEffect, useMemo } from 'react';
// import {
// useSelector,
// useDispatch,
// } from 'react-redux';
// import { Link } from 'react-router-dom';
import {
    Typography,
    Box,
    Container,
    //  Grid, Button
} from '@material-ui/core';
import PeopleCard from '../../../components/elements/cards/peopleCardFollowers';
// import Slider from 'components/shared/slider';
import // getFeaturedArtists,
// moveMarketplaceFromFeatured,
'redux/marketplace/actions';
// import axios from 'axios';

const FAKE_DATA = [
    {
        username: 'razmikarm',
        first_name: 'Razmik',
        last_name: 'Poghosyan',
        profile_url: '/api/account/profiles/razmikarm/',
        bio: '',
        avatar: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/profiles/avatars/4350413.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103442Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=0a2892058a6e6a177885f36f484f2fff2c885543ca96e58b8cb18cee0c557364',
        banner: null,
        selected_tags: [
            {
                name: 'Illustrator',
                slug: 'illustrator',
                type: 'static',
                icon: 'icon-graphic',
            },
        ],
        social_facebook: '',
        social_twitter: '',
        social_instagram: '',
        social_pinterest: '',
        creation_visibility: true,
        following_count: 0,
        followers_count: 1,
        sale_amount: null,
        follow: null,
    },
    {
        username: 'Roberto Pazzi',
        first_name: 'Roberto',
        last_name: 'Pazzi',
        profile_url: '/api/account/profiles/Roberto%20Pazzi/',
        bio: 'Award winning and published travel photographer organizing and leading photographic expeditions to remote cultures.',
        avatar: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/profiles/avatars/Logo_Hands_Web.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103442Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5bedfe9bab93c307fe957883c9d7bf41f772e6c234edc35843f8275b8435f050',
        banner: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/profiles/banners/DSC_Backgroung_Portraits.Webshop.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103442Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=46f2a92e2aee16facd96aba4efeeeda73d03a16423b2adcace4cf3b7d5525c4d',
        selected_tags: [],
        social_facebook: '',
        social_twitter: 'https://www.twitter.com/RobertoPazzi/',
        social_instagram: '',
        social_pinterest: '',
        creation_visibility: true,
        following_count: 0,
        followers_count: 0,
        sale_amount: null,
        follow: null,
    },
    {
        username: 'vachagan.grigoryan_2',
        first_name: 'Vachagan',
        last_name: 'Grigoryan',
        profile_url: '/api/account/profiles/vachagan.grigoryan_2/',
        bio: '',
        avatar: null,
        banner: null,
        selected_tags: [],
        social_facebook: '',
        social_twitter: '',
        social_instagram: '',
        social_pinterest: '',
        creation_visibility: true,
        following_count: 0,
        followers_count: 0,
        sale_amount: null,
        follow: null,
    },
    {
        username: 'kanna karuppasamy',
        first_name: 'kanna',
        last_name: 'karuppasamy',
        profile_url: '/api/account/profiles/kanna%20karuppasamy/',
        bio: '',
        avatar: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/profiles/avatars/Sta_XueLxww.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103442Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=924750672567350ac41be78c2402d28f7335df36a38eca3850a25422c07b168b',
        banner: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/profiles/banners/Sta_aCX0oIx.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103442Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5a3298d3b5a026c563edd9168e92fa55e50826164ad79167066a8c59cb9e5227',
        selected_tags: [],
        social_facebook: '',
        social_twitter: '',
        social_instagram: '',
        social_pinterest: '',
        creation_visibility: true,
        following_count: 0,
        followers_count: 1,
        sale_amount: null,
        follow: null,
    },
];

const FeaturedArtists = ({ className }) => {
    // const dispatch = useDispatch();
    // const { featuredArtist } = useSelector((state) => state.marketplace);

    // useEffect(() => {
    //     const currentRequest = axios.CancelToken.source();
    //     dispatch(getFeaturedArtists(currentRequest));
    //     return () => currentRequest?.cancel();
    // }, [dispatch]);

    // const data = useMemo(() => {
    //     return (featuredArtist ?? [])
    //         .map((value) => ({ value, sort: Math.random() }))
    //         .sort((a, b) => a.sort - b.sort)
    //         .map(({ value }) => value);
    // }, [featuredArtist]);

    // const showAllPeoples = () => {
    //     dispatch(moveMarketplaceFromFeatured(true));
    // };

    // if (featuredArtist?.length === 0) return null;

    return (
        <div className={`${className}-featured-artists`}>
            <Container maxWidth="xl">
                <Box className="title-wrapper" mb={4} textAlign="center" marginBottom={'4em'}>
                    <Typography className="desktop-only" variant="h2">
                        Featured Artists
                    </Typography>

                    {/* <Box className="view-all">
                        <Link to="/marketplace" color="primary">
                            <Button onClick={redirectToMarketplace} className="view-all-btn">
                                View All
                            </Button>
                        </Link>
                    </Box> */}
                </Box>

                <Box className="mobile-only">
                    <Box mb={2} display="flex" alignItems="flex-end" justifyContent="space-between">
                        <Typography className="text-white" variant="h2">
                            Featured Artists
                        </Typography>
                    </Box>
                </Box>

                {/* <Grid container spacing={3} className="list-with-link bg-blur-orange">
                    <Grid xs={12} item={true}> */}
                {/* <Slider
                            options={{
                                slidesToShow: 1,
                                slidesToScroll: 5,
                                infinite: true,
                                arrows: false,
                                dots: true,
                                className: 'center',
                                centerMode: true,
                            }}
                            hasArrow={false}
                        >
                            {FAKE_DATA?.map((item) => ( */}
                <Box className="h-100" p={1.5} key={FAKE_DATA[0]?.username}>
                    <PeopleCard
                        key={FAKE_DATA[0]?.username}
                        tags={FAKE_DATA[0]?.selected_tags}
                        img={FAKE_DATA[0]?.banner}
                        author={FAKE_DATA[0]?.username}
                        firstName={FAKE_DATA[0]?.first_name}
                        lastName={FAKE_DATA[0]?.last_name}
                        authorAvatar={FAKE_DATA[0]?.avatar}
                        authorName={FAKE_DATA[0]?.authorName}
                        bio={FAKE_DATA[0]?.bio}
                    />
                </Box>
                {/* ))}
                        </Slider> */}
                {/* </Grid>
                </Grid> */}
            </Container>
        </div>
    );
};

export default FeaturedArtists;
