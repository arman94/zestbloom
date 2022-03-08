import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Banner from './banner';
import Products from './products';
import About from './about';
import FeaturedArtists from './featured-artists';
import BestVoted from './best-voted';
import TopBids from './TopBids';
import FeaturedAssets from '../marketplace/items/FeaturedAssets';
import zestbloomImg from '../../assets/img/home-page.png';
import PromotionalBanner from './PromotionalBanner';
import { VerifyEmail } from 'components/elements';
import { verifyForgotPassword, verifySignup, verifyEmail } from 'redux/auth/actions';
import AssetsByTag from './AssetsByTag';
import useWindowDimensions from 'hooks/useWindowDimensions';

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const path = location.pathname.split('/');
    const code = path.pop();
    const serviceType = path.join('_');
    const [verifyDialog, setVerifyDialog] = useState(false);
    let isEmailVerification = path.indexOf('email') > -1;

    const { isMobile } = useWindowDimensions();

    const verifyCases = () => {
        if (code && !verifyDialog) {
            switch (serviceType) {
                case '_verify':
                    dispatch(verifySignup(code))
                        .then(() => setVerifyDialog(true))
                        .catch(() => {});
                    break;
                case '_reset_verify':
                    dispatch(verifyForgotPassword(code))
                        .then(() => history.push('/reset'))
                        .catch(() => history.push('/'));
                    break;
                case '_email_verify':
                    dispatch(verifyEmail(code))
                        .then(() => {
                            setVerifyDialog(true);
                            history.push('/');
                        })
                        .catch(() => {
                            history.push('/');
                        });
                    break;
                default:
            }
        }
    };

    useEffect(verifyCases, [code, serviceType, verifyDialog, dispatch, history]);

    useEffect(() => {
        document
            .querySelector('meta[name="description"]')
            .setAttribute('content', 'ZestBloom NFT Marketplace: Digital Art, Fast, Secure, Cheap');
        document
            .querySelector('meta[name="description"]')
            .setAttribute('value', 'ZestBloom NFT Marketplace: Digital Art, Fast, Secure, Cheap');
        document
            .querySelector('meta[name="url"]')
            .setAttribute('content', 'https://zestbloom.com/');
        document.querySelector('meta[name="url"]').setAttribute('value', 'https://zestbloom.com/');
        document.querySelector('meta[name="image"]').setAttribute('content', zestbloomImg);
        document.querySelector('meta[name="image"]').setAttribute('value', zestbloomImg);
        document
            .querySelector('meta[name="twitter:card"]')
            .setAttribute('content', 'summary_large_image');
        document
            .querySelector('meta[name="twitter:card"]')
            .setAttribute('value', 'summary_large_image');
        document
            .querySelector('meta[name="twitter:url"]')
            .setAttribute('content', 'https://zestbloom.com/');
        document
            .querySelector('meta[name="twitter:url"]')
            .setAttribute('value', 'https://zestbloom.com/');
        document.querySelector('meta[name="twitter:title"]').setAttribute('content', 'ZestBloom');
        document.querySelector('meta[name="twitter:title"]').setAttribute('value', 'ZestBloom');
        document
            .querySelector('meta[name="twitter:description"]')
            .setAttribute('content', 'ZestBloom NFT Marketplace: Digital Art, Fast, Secure, Cheap');
        document
            .querySelector('meta[name="twitter:description"]')
            .setAttribute('value', 'ZestBloom NFT Marketplace: Digital Art, Fast, Secure, Cheap');

        document.querySelector('meta[name="twitter:image"]').setAttribute('content', zestbloomImg);
        document.querySelector('meta[name="twitter:image"]').setAttribute('value', zestbloomImg);
        // document.querySelector('meta[property="og:type"]').setAttribute('content', 'website');
        // document
        //     .querySelector('meta[property="og:url"]')
        //     .setAttribute('content', 'https://zestbloom.com/');
        // document
        //     .querySelector('meta[name="og:description"]')
        //     .setAttribute('content', 'ZestBloom NFT Marketplace: Digital Art, Fast, Secure, Cheap');
    }, []);

    const verifyDialogClose = () => {
        setVerifyDialog(false);
    };

    return (
        <div className="homepage">
            <Banner />
            <Products />
            <About />
            {isMobile ? (
                <>
                    <TopBids />
                    <FeaturedAssets mobile />
                    <AssetsByTag isLoggedIn={isLoggedIn} tag="photography" title="Photography" />
                    <AssetsByTag
                        isLoggedIn={isLoggedIn}
                        tag="illustrations"
                        title="Illustrations"
                    />
                    <AssetsByTag isLoggedIn={isLoggedIn} tag="graphic" title="Graphic" />
                </>
            ) : (
                <>
                    <PromotionalBanner />
                    <TopBids />
                    <FeaturedArtists className="home" />
                </>
            )}
            <BestVoted />
            <VerifyEmail
                verifyDialog={verifyDialog}
                verifyDialogClose={verifyDialogClose}
                isEmailVerification={isEmailVerification}
            />
        </div>
    );
};

export default Home;
