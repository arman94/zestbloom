import React, { useEffect } from 'react';
import {
    // useSelector,
    useDispatch,
} from 'react-redux';
import { Typography, Container, Grid, Box } from '@material-ui/core';
import StartCollectingSearch from './StartCollectingSearch';
import { getBannerPlaceholder } from 'redux/marketplace/actions';
import { BANNER_LIST } from 'configs';

import image1 from './image-1.svg';
import image2 from './image-2.svg';
import image3 from './image-3.svg';

const Item = ({ icon, text, color }) => {
    return (
        <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            flexDirection="column"
            mr={2}
            style={{
                width: 120,
                height: 130,
            }}
        >
            <Box
                className={`circle bg-${color}`}
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ width: 68, height: 68 }}
            >
                {icon}
            </Box>
            <p style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>
                {text}
            </p>
        </Box>
    );
};

const Wheel = ({ children }) => {
    return (
        <div style={{ position: 'relative', zIndex: 1 }}>
            <svg
                width="680"
                height="694"
                viewBox="0 0 680 694"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 413.078V296.025C73.8599 302.811 92.8896 364.447 93.1719 394.417C66.0674 400.525 19.7637 409.402 0 413.078Z"
                    fill="#EB7A7D"
                />
                <path
                    d="M271.893 523.347C170.251 435.133 60.703 451.531 18.6345 470.758C11.8583 454.472 6.21154 437.96 4.23517 431.74C165.507 372.704 283.186 461.993 321.867 514.016C300.183 518.088 279.516 521.933 271.893 523.347Z"
                    fill="#3EB595"
                />
                <path
                    d="M42.3512 522.498L22.8698 486.024C143.485 443.275 228.977 499.313 256.647 532.676C245.127 544.212 227.566 551.054 220.225 553.033C151.786 504.176 73.1261 512.319 42.3512 522.498Z"
                    fill="#1B6578"
                />
                <path
                    d="M205.825 569.15C193.628 586.114 171.38 625.98 161.78 643.792C117.058 618.685 70.3025 562.647 52.5151 537.766C141.96 512.659 191.991 548.227 205.825 569.15Z"
                    fill="#1B6578"
                />
                <path
                    d="M597.995 571.694C549.206 640.908 448.92 675.176 404.875 683.658C421.137 575.765 501.435 539.745 539.55 535.221C560.556 546.757 587.266 564.343 597.995 571.694Z"
                    fill="#1B6578"
                />
                <path
                    d="M520.069 518.257C492.964 490.436 472.636 451.814 465.859 435.98C396.743 458.373 360.829 504.686 351.512 525.043C368.452 544.721 391.322 605.623 400.639 633.614C426.388 568.471 490.988 529.566 520.069 518.257Z"
                    fill="#3EB595"
                />
                <path
                    d="M608.159 554.73C544.463 540.48 496.352 464.537 480.259 428.346C568.349 397.811 644.58 417.885 671.685 431.739C661.521 492.132 625.099 538.897 608.159 554.73Z"
                    fill="#1B6578"
                />
                <path
                    d="M677.614 412.231C647.121 411.552 601.1 400.073 581.901 394.418C594.606 376.606 603.923 346.07 647.968 354.552C683.204 361.338 682.414 395.832 677.614 412.231Z"
                    fill="#3EB595"
                />
                <path
                    d="M465.86 235.803C450.952 324.017 381.722 352.29 348.971 355.4C345.583 395.436 347.559 466.516 348.971 497.052C411.312 422.409 518.939 396.397 564.961 392.722C577.158 265.151 503.975 234.954 465.86 235.803Z"
                    fill="#C4C4C4"
                />
                <path
                    d="M330.337 497.051C270.029 434.623 196.226 408.837 166.863 403.748C212.263 383.391 249.023 344.373 261.729 327.409C267.827 332.837 310.009 347.766 330.337 354.552V497.051Z"
                    fill="#3EB595"
                />
                <path
                    d="M212.601 193.392C207.18 255.141 232.365 299.984 245.635 314.686C194.814 390.007 137.499 397.528 115.194 391.873C105.03 340.98 113.782 284.15 119.429 262.097C147.889 204.418 193.402 192.261 212.601 193.392Z"
                    fill="#C4C4C4"
                />
                <path
                    d="M227.001 190.848C225.589 221.949 229.203 286.696 254.952 296.875C273.587 264.36 294.084 197.634 227.001 190.848Z"
                    fill="#F4D45D"
                />
                <path
                    d="M288.833 143.348C286.122 163.026 276.974 184.91 272.739 193.392C253.766 185.249 235.753 173.883 229.542 168.794C226.831 134.865 231.8 120.163 234.624 117.053C253.597 120.446 278.669 135.996 288.833 143.348Z"
                    fill="#FBF6A8"
                />
                <path
                    d="M409.109 110.268C370.485 124.518 346.148 162.574 338.807 179.821C335.701 176.711 327.287 167.268 318.478 154.375C309.669 141.482 315.937 128.08 320.172 122.991C324.408 118.185 337.282 105.009 354.9 90.7591C372.518 76.5091 398.38 97.8275 409.109 110.268Z"
                    fill="#FBF6A8"
                />
                <path
                    d="M346.43 335.043C347.842 302.811 370.486 238.008 449.767 236.651C445.531 269.448 418.935 335.043 346.43 335.043Z"
                    fill="#F4D45D"
                />
                <path
                    d="M676.767 286.696C643.564 153.697 520.634 117.054 463.319 115.357L459.931 217.991C560.895 229.527 581.619 315.535 579.36 357.098C629.504 324.526 666.321 345.223 678.461 359.642L676.767 286.696Z"
                    fill="#EB7A7D"
                />
                <path
                    d="M450.862 220.534V118.749C343.799 120.784 337.926 227.603 348.373 280.757C380.898 231.9 430.251 220.251 450.862 220.534Z"
                    fill="#F4D45D"
                />
                <path
                    d="M370.994 61.1382L344.736 0.0669628C519.561 -3.32588 618.04 123.058 645.427 186.673C581.054 117.459 499.458 99.5904 466.707 99.3076C466.707 73.522 463.883 51.2424 462.472 43.3257C438.755 39.2543 391.605 53.5043 370.994 61.1382Z"
                    fill="#F7AE75"
                />
                <path
                    d="M298.15 126.383C179.568 55.133 57.3147 156.07 11.0111 215.445C81.483 51.2312 250.435 4.52304 326.102 1.69568C329.49 32.9098 348.406 59.374 357.441 68.7043L298.15 126.383Z"
                    fill="#F7AE75"
                />
                <path
                    d="M332.878 251.918C332.031 269.73 332.878 335.891 332.878 335.891C295.609 339.962 274.998 318.361 269.352 307.052C275.281 290.653 287.139 250.561 287.139 221.382C287.139 192.204 299.562 164.552 305.773 154.374C333.556 191.016 333.725 234.106 332.878 251.918Z"
                    fill="#F4D45D"
                />
                <path
                    d="M441.296 101.786C402.672 92.2862 389.628 79.1672 387.934 73.7952C417.072 55.4738 437.908 58.2446 444.685 61.9202C454.171 81.5987 446.379 96.6969 441.296 101.786Z"
                    fill="#FBF6A8"
                />
                <path
                    d="M70.302 312.141C51.3288 290.427 17.7869 280.475 3.38759 278.213C1.12888 267.186 9.48611 231.901 60.9848 178.972C112.483 126.044 183.52 116.77 212.601 118.749V175.579C198.484 173.6 161.78 179.481 127.899 218.838C94.0184 258.195 95.1478 317.796 99.9476 342.677C97.9712 341.546 89.2751 333.856 70.302 312.141Z"
                    fill="#F7AE75"
                />
                <path
                    d="M388.781 679.418C382.005 698.417 356.595 691.292 344.736 685.355C344.736 618.177 306.338 558.406 287.139 536.918C304.757 530.811 324.408 530.415 332.031 530.981C365.065 558.123 397.251 655.668 388.781 679.418Z"
                    fill="#1B6578"
                />
                <path
                    d="M227.848 570.846C199.388 594.596 182.109 633.897 177.027 650.578C185.779 655.385 207.858 666.355 226.154 671.783C249.023 678.569 282.904 692.14 302.385 692.989C317.97 693.667 328.643 688.747 332.031 686.203C321.867 600.703 286.01 554.447 269.352 542.007C267.375 541.724 256.308 547.096 227.848 570.846Z"
                    fill="#C4C4C4"
                />
                <circle style={{ cursor: 'pointer' }} cx="338.5" cy="355.5" r="83.5" fill="white" />
                <path
                    style={{ cursor: 'pointer' }}
                    d="M338.949 289.059C302.026 289.059 272.059 319.026 272.059 355.949C272.059 392.872 302.026 422.839 338.949 422.839C375.872 422.839 405.839 392.872 405.839 355.949C405.839 319.026 375.872 289.059 338.949 289.059ZM322.226 386.049V325.848L369.049 355.949L322.226 386.049Z"
                    fill="#EB7A7D"
                />
            </svg>
            {children}
        </div>
    );
};

const Image = ({ x, y, width, height, src, zIndex = 1 }) => {
    const hasXorY = typeof x !== 'undefined' && typeof y !== 'undefined';
    return (
        <img
            style={{
                position: hasXorY ? 'absolute' : 'static',
                top: y,
                left: x,
                width,
                height,
                zIndex,
            }}
            alt="nft"
            src={src}
        />
    );
};

const Banner = () => {
    const dispatch = useDispatch();
    // const { bannerPlaceholder } = useSelector((state) => state.marketplace);

    useEffect(() => {
        dispatch(getBannerPlaceholder());
    }, [dispatch]);

    // const getAsset = (size) => bannerPlaceholder?.find((x) => x.size === size);

    return (
        <div className="banner-home">
            <div className="banner-home-bg" />
            <div className="banner-home-bg" />
            <div className="banner-home-bg" />
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" spacing={3} alignItems="center">
                    <Grid item md={6} className="banner-left">
                        <Typography style={{ fontSize: 60, fontWeight: 600 }}>
                            FIND YOUR TREASURE
                        </Typography>
                        <Box my={3}>
                            <Typography className="text-capitalize" variant="h4">
                                Algorand Digital Asset Exchange
                            </Typography>
                        </Box>
                        <Box style={{ display: 'flex' }} mt={4}>
                            {BANNER_LIST.map((item, i) => (
                                <Item key={i} {...item} />
                            ))}
                        </Box>
                        <Box mt={3}>
                            <StartCollectingSearch id="banner-search" />
                        </Box>
                    </Grid>

                    <Box md={6} className="banner-right">
                        <Wheel>
                            <Image src={image1} x={450} y={100} width={273.58} height={303.81} />
                            <Image src={image2} x={-40} y={100} />
                            <Image src={image3} x={70} y={560} zIndex={2} />
                        </Wheel>
                        {/* <div className="banner-images">
                            <div className="left">
                                <ImgTag
                                    src={getAsset('217x210')?.content ?? bannerImg1}
                                    alt="Banner image"
                                    className="img-1 rounded"
                                    asset_id={getAsset('217x210')?.asset_id}
                                />
                                <ImgTag
                                    src={getAsset('370x233')?.content ?? bannerImg2}
                                    alt="Banner image"
                                    className="img-2 rounded"
                                    asset_id={getAsset('370x233')?.asset_id}
                                />
                            </div>
                            <div className="right">
                                <ImgTag
                                    src={getAsset('145x137')?.content ?? bannerImg3}
                                    alt="Banner image"
                                    className="img-3 rounded"
                                    asset_id={getAsset('145x137')?.asset_id}
                                />
                                <ImgTag
                                    src={getAsset('283x346')?.content ?? bannerImg4}
                                    alt="Banner image"
                                    className="img-4 rounded"
                                    asset_id={getAsset('283x346')?.asset_id}
                                />
                            </div>
                        </div> */}
                    </Box>
                </Grid>
            </Container>
        </div>
    );
};

export default Banner;
