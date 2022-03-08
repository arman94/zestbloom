import React, { useContext } from 'react';
import { Typography, Container } from '@material-ui/core';
// import { Logo } from 'components/shared';
import { AboutAnchorContext } from '../../../components/elements/MainRoute';

import {
    ManyIconsIcon,
    // , HeadphoneIcon, FilmIcon, ArtIcon, SpeakerIcon, CubeIcon, BookIcon
} from 'assets/img';

// const SmallCircle = ({ color, x, y, blured = false }) => {
//     return (
//         <div
//             style={{
//                 width: 35,
//                 height: 35,
//                 position: 'absolute',
//                 top: y,
//                 left: x,
//                 filter: blured ? 'blur(10px)' : 'none',
//             }}
//             className={`circle bg-${color}`}
//         />
//     );
// };

// const CircleIcon = ({ color, x, y, w = 50, h = 50, children }) => {
//     return (
//         <div
//             className={`circle-icon circle bg-${color} color-white`}
//             style={{
//                 width: w,
//                 height: h,
//                 top: y,
//                 left: x,
//             }}
//         >
//             {children}
//         </div>
//     );
// };

const About = () => {
    const anchorRef = useContext(AboutAnchorContext);
    return (
        <Container maxWidth="xl" className="text-center" spacing={16}>
            <div className="home-about relative desktop-only" ref={anchorRef}>
                <div className="home-about-manyIcons">
                    <ManyIconsIcon className="absolute-center" width={'75%'} />
                    {/* <div className="absolute-center" style={{ width: '33%', height: '33%' }}>
                        <Logo type="iconOnly" width={'100%'} />
                    </div>

                    <SmallCircle color="brand-orange" x={'10%'} y={'60%'} />
                    <SmallCircle color="brand-orange" blured x={-140} y={55} />
                    <SmallCircle color="brand-green" x={-35} y={-65} />
                    <SmallCircle color="brand-green" blured x={0} y={-95} />
                    <SmallCircle color="brand-gold" blured x={-100} y={240} />
                    <SmallCircle color="brand-gold" x={10} y={285} />
                    <SmallCircle color="brand-red" blured x={130} y={310} />
                    <SmallCircle color="brand-red" x={280} y={220} />
                    <SmallCircle color="brand-blue" blured x={290} y={180} />
                    <SmallCircle color="brand-blue" x={340} y={-30} />
                    <SmallCircle color="brand-gray" x={130} y={-120} />
                    <SmallCircle color="brand-gray" blured x={200} y={-50} />

                    <CircleIcon color="brand-gold" w={99} h={99} x={-135} y={-50}>
                        <SpeakerIcon />
                    </CircleIcon>
                    <CircleIcon color="brand-orange" w={50} h={50} x={5} y={-155}>
                        <HeadphoneIcon />
                    </CircleIcon>
                    <CircleIcon color="brand-gray" w={77} h={77} x={240} y={-110}>
                        <BookIcon />
                    </CircleIcon>
                    <CircleIcon color="brand-green" w={50} h={50} x={300} y={40}>
                        <CubeIcon />
                    </CircleIcon>
                    <CircleIcon color="brand-blue" w={85} h={85} x={120} y={240}>
                        <ArtIcon />
                    </CircleIcon>
                    <CircleIcon color="brand-red" w={67} h={67} x={-50} y={200}>
                        <FilmIcon />
                    </CircleIcon> */}
                </div>

                <div>
                    <Typography align="left" variant="h2" component="h2">
                        What is Zestbloom?
                    </Typography>

                    <Typography align="left" className="about-text">
                        ZestBloom is a next generation Digital Media marketplace seeking to offer a
                        brand new way of experiencing Crypto Art while simultaneously supporting and
                        promoting artists for their contributions. We are built on the Algorand, one
                        of the fastest and most efficient blockchains to date allowing us to
                        facilitate purchases and track ownership of assets, with significantly
                        reduced fees and a smaller carbon footprint.
                    </Typography>
                </div>
            </div>
        </Container>
    );
};

export default About;
