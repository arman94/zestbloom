import React, { useState, useEffect, useCallback, useContext, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Close, Menu, NotificationsNoneOutlined } from '@material-ui/icons';
import {
    setMyAlgoAccount,
    verifyWallets,
    setWallets,
    setNonLoggedMyAlgoAccount,
    setNotification,
} from 'redux/profile/actions';
import { needToLoginAction } from 'redux/auth/actions';
import { AppBar, Toolbar, Container, Box, Button, Avatar, Typography } from '@material-ui/core';
import { Logo, StartCollectingSearch, Notification } from 'components/shared';
import ProfileMenu from './ProfileMenu';
import {
    SignUp,
    VerifyYourEmail,
    Login,
    ForgotPassword,
    VerifyForgotPasswordEmail,
} from 'components/elements';
import algorandLogo from 'assets/img/algorand-logo.svg';
import { AboutAnchorContext } from '../MainRoute';
import { MARKETPLACE } from '../../../configs/routes';
import ChangeWallet from 'components/elements/modal/changeWallet';
import LottieContainer from 'components/shared/LottieContainer';
import UserNotifications from '../user-notifications';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { BookIcon, StoreIcon, HammerIcon, UserIcon, SettingsIcon } from 'assets/img';

import { CREATOR } from 'configs';

import { useReach } from 'hooks/useReach';

const Header = ({ hasSearch }) => {
    const reach = useReach();
    const history = useHistory();
    const path = history.location.pathname;

    /*User Notifications State*/
    const [userNotifications, setNotifications] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [signupDialog, setSignupDialog] = useState(false);
    const [verifyDialog, setVerifyDialog] = useState(false);
    const [loginDialog, setLoginDialog] = useState(false);
    // const [notificationMessage, setNotificationMessage] = useState(initialErrorMessage);
    const [forgotPasswordDialog, setForgotPasswordDialog] = useState(false);
    const [emailFromForgotPassword, setEmailFromForgotPassword] = useState(false);
    const [verifyForgotPasswordDialog, setVerifyForgotPasswordDialog] = useState(false);
    const [profileMenuEl, setProfileMenuEl] = useState(null);
    const [connectLoading, setConnectLoading] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const { user, isLoggedIn, needToLogin } = useSelector((state) => state.auth);
    const { selectedWallet, notifications } = useSelector((state) => state.profile);
    const { allNotifications, unReadedNotifyCount } = useSelector((state) => state.notifications);

    const anchorRef = useContext(AboutAnchorContext);
    const dispatch = useDispatch();
    const [changeWallet, setChangeWallet] = useState(false);
    const { isMobile } = useWindowDimensions();

    const notifyRef = useRef(null);

    const unreadedNotifications = useMemo(() => {
        const unreaded = allNotifications?.find((x) => x.is_unread);
        return !!unreaded; // TODO unread
    }, [allNotifications]);

    const notificationsToShow = useMemo(() => {
        return isMobile ? (notifications ?? []).slice(0, 1) : notifications;
    }, [isMobile, notifications]);

    // TODO rename, connect to wallet while signed in
    const connectToMyAlgo = async () => {
        try {
            const acc = await reach.getDefaultAccount();
            setConnectLoading(true);
            // TODO rename setMyAlgoAccount
            await dispatch(setMyAlgoAccount([{ address: acc.networkAccount.addr }]));
            setConnectLoading(false);
        } catch (err) {
            setConnectLoading(false);
            console.error(err);
        }
    };

    // TODO rename, this function is called on connect wallet click
    const nonLoggedConnect = async () => {
        try {
            const {
                networkAccount: { addr: address },
            } = await reach.getDefaultAccount();
            // TODO rename setNonLoggedMyAlgoAccount
            dispatch(setNonLoggedMyAlgoAccount([{ address }]));
        } catch (err) {
            console.log(err);
        }
    };

    const openUserNotifications = async (withDelay = false) => {
        if (withDelay) await onClickMenu();
        setNotifications(!userNotifications);
    };

    const closeUserNotifications = () => {
        setNotifications(false);
    };

    const onScroll = useCallback(() => {
        setScrolled(window.pageYOffset > 20);

        if (hasSearch) {
            const searchOffset = document
                .getElementById('banner-search')
                ?.getBoundingClientRect().top;
            setShowSearch(searchOffset < 30);
        }
    }, [hasSearch]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', onScroll);
        }
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [onScroll]);

    useEffect(() => {
        const conectedWallets = JSON.parse(localStorage.getItem('wallets'));
        if (conectedWallets) {
            dispatch(setWallets(conectedWallets));
        }
    }, [dispatch]);

    useEffect(() => {
        const inSingleAsset = path.split('/').includes('asset');
        if (inSingleAsset) {
            setShowSearch(true);
        }
    }, [path]);

    useEffect(() => {
        if (needToLogin) {
            setLoginDialog(true);
            dispatch(needToLoginAction(false));
        }
    }, [needToLogin, dispatch]);

    useEffect(() => {
        const notificationIcon = notifyRef?.current;
        if (notificationIcon) notificationIcon.title = unReadedNotifyCount;
    }, [notifyRef, unReadedNotifyCount]);

    const onOpenChangeWallet = () => {
        setChangeWallet(true);
    };
    const onCloseChangeWallet = () => {
        setChangeWallet(false);
    };

    const onScrollToAbout = () =>
        window.scrollTo({ top: anchorRef.current.offsetTop, behavior: 'smooth' });

    const giveNotification = (message) => {
        dispatch(setNotification(message));
    };

    const setWalletsToUser = async (getAccounts, loggedIn = true) => {
        return loggedIn
            ? dispatch(setMyAlgoAccount(getAccounts))
            : dispatch(setNonLoggedMyAlgoAccount(getAccounts));
    };
    const toVerifyWallets = (wallets) => {
        return dispatch(verifyWallets(wallets));
    };

    const openProfileMenu = (e) => {
        setProfileMenuEl(e.currentTarget);
    };

    const closeProfileMenu = () => {
        setProfileMenuEl(null);
    };

    const onOpenSignupDialog = () => {
        onCloseLoginDialog();
        setSignupDialog(true);
    };

    const onCloseSignupDialog = () => {
        setSignupDialog(false);
    };

    const onOpenVerifyDialog = () => {
        setVerifyDialog(true);
    };

    const onCloseVerifyDialog = () => {
        setVerifyDialog(false);
    };

    const onOpenLoginDialog = async (withDelay = false) => {
        if (withDelay) await onClickMenu();
        if (isLoggedIn) {
            history.push(`/profile/${user.username}/collection`);
            return;
        }
        onCloseSignupDialog();
        setLoginDialog(true);
    };

    const onCloseLoginDialog = () => {
        setLoginDialog(false);
    };

    const onOpenForgotPasswordDialog = () => {
        onCloseLoginDialog();
        setForgotPasswordDialog(true);
    };

    const onCloseForgotPasswordDialog = () => {
        setForgotPasswordDialog(false);
    };

    const onOpenVerifyForgotPasswordDialog = () => {
        setVerifyForgotPasswordDialog(true);
    };

    const onCloseVerifyForgotPasswordDialog = () => {
        setVerifyForgotPasswordDialog(false);
    };

    const onClickMenu = (cb) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                closeUserNotifications();
                setMobileMenuVisible(!mobileMenuVisible);
                resolve(true);
            }, 500);
        });
    };

    const onClickProfile = async () => {
        if (user?.username) {
            await onClickMenu();
            history.push(`/profile/${user.username}`);
        }
    };

    const onClickMarketplace = async () => {
        await onClickMenu();
        history.push('/marketplace');
    };

    const onClickAuction = async () => {
        await onClickMenu();
        history.push('/marketplace?status=auction');
    };
    const canCreate = user?.role === CREATOR && window.location.pathname !== '/upload-asset';

    const onConnectWallet = async () => {
        await onClickMenu();
        isLoggedIn
            ? connectToMyAlgo(
                  setWalletsToUser,
                  giveNotification,
                  toVerifyWallets,
                  setConnectLoading,
              )
            : nonLoggedConnect(setWalletsToUser);
    };

    return (
        <>
            {/*  modals start */}
            <SignUp
                signupDialog={signupDialog}
                onCloseSignupDialog={onCloseSignupDialog}
                onOpenLoginDialog={onOpenLoginDialog}
                onOpenVerifyDialog={onOpenVerifyDialog}
            />
            <VerifyYourEmail
                verifyDialog={verifyDialog}
                onCloseVerifyDialog={onCloseVerifyDialog}
            />
            {loginDialog && (
                <Login
                    loginDialog={loginDialog}
                    onCloseLoginDialog={onCloseLoginDialog}
                    onOpenSignupDialog={onOpenSignupDialog}
                    onOpenForgotPasswordDialog={onOpenForgotPasswordDialog}
                />
            )}
            <VerifyForgotPasswordEmail
                verifyForgotPasswordDialog={verifyForgotPasswordDialog}
                onCloseVerifyForgotPasswordDialog={onCloseVerifyForgotPasswordDialog}
                emailFromForgotPassword={emailFromForgotPassword}
            />
            <ForgotPassword
                forgotPasswordDialog={forgotPasswordDialog}
                onCloseForgotPasswordDialog={onCloseForgotPasswordDialog}
                onOpenLoginDialog={onOpenLoginDialog}
                onOpenVerifyForgotPasswordDialog={onOpenVerifyForgotPasswordDialog}
                setEmailFromForgotPassword={setEmailFromForgotPassword}
            />
            {selectedWallet && (
                <ChangeWallet
                    changeWallet={changeWallet}
                    onCloseChangeWallet={onCloseChangeWallet}
                />
            )}
            {/*User Notifications*/}
            {isLoggedIn && (
                <UserNotifications
                    notifications={userNotifications}
                    setNotifications={setNotifications}
                    onClose={closeUserNotifications}
                />
            )}
            <Box className="notification-container">
                {notificationsToShow?.map((notification, i) => (
                    <Notification
                        key={notification?.guid}
                        type={notification?.status}
                        title={notification?.status}
                        message={notification?.message}
                        guid={notification?.guid}
                    />
                ))}
            </Box>
            {/* modals end */}

            {isMobile ? (
                <>
                    <Box className="header">
                        <Link to="" className="logo full-width">
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Logo type="logoIcon" width="24" />
                                <Typography className="header-zb-title" variant="h3">
                                    ZESTBLOOM
                                </Typography>
                            </Box>
                        </Link>
                    </Box>

                    <Box className="menu-container">
                        <Box onClick={onClickMenu} py={4}>
                            {mobileMenuVisible ? (
                                <Close className="menu-icon" fontSize="large" />
                            ) : (
                                <Menu className="menu-icon" fontSize="large" />
                            )}
                        </Box>
                        {mobileMenuVisible && (
                            <Box className="mobile-menu-active">
                                <Box
                                    className="mobile-menu-item"
                                    onClick={() => onOpenLoginDialog(true)}
                                >
                                    <img src={UserIcon} alt="Sign in" />
                                    <span>{isLoggedIn ? 'My Collections' : 'Sign In'}</span>
                                </Box>
                                <Box className="mobile-menu-item" onClick={onConnectWallet}>
                                    {connectLoading ? (
                                        <div className="menu-btn menu-btn-algo">
                                            <LottieContainer
                                                containerStyles={{
                                                    height: '46px',
                                                    width: '100%',
                                                    marginTop: 12,
                                                }}
                                                lottieStyles={{ width: '50px' }}
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <img src={BookIcon} alt="Connect Wallet" />
                                            <span>{`${
                                                selectedWallet ? 'Change' : 'Connect'
                                            } Wallet`}</span>
                                        </>
                                    )}
                                </Box>
                                <Box
                                    className={`mobile-menu-item ${isLoggedIn ? '' : 'disabled'}`}
                                    onClick={onClickProfile}
                                >
                                    <img src={SettingsIcon} alt="Profile" />
                                    <span>Profile</span>
                                </Box>
                                <Box className="mobile-menu-item" onClick={onClickMarketplace}>
                                    <img src={StoreIcon} alt="Marketplace" />
                                    <span>Marketplace</span>
                                </Box>
                                <Box
                                    className={`mobile-menu-item ${isLoggedIn ? '' : 'disabled'}`}
                                    onClick={() => openUserNotifications(true)}
                                >
                                    <NotificationsNoneOutlined className="mui-icon" />
                                    <span>Notifications</span>
                                </Box>
                                <Box className="mobile-menu-item" onClick={onClickAuction}>
                                    <img src={HammerIcon} alt="Auction" />
                                    <span>Auction</span>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </>
            ) : (
                <Box>
                    <AppBar
                        position="fixed"
                        style={{ padding: '0 140px' }}
                        className={`header ${scrolled ? 'shadow' : ''}`}
                    >
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                {/*For window width > 980*/}
                                <Box
                                    display={{ xs: 'none', md: 'flex' }}
                                    alignItems="center"
                                    flexGrow="1"
                                >
                                    {!showSearch ? (
                                        <Link to="/" className="logo">
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Logo type="iconOnly" width="60" />
                                                <Typography
                                                    style={{
                                                        float: 'right',
                                                        padding: '0 20px',
                                                        fontWeight: 'bold',
                                                        fontSize: 30,
                                                    }}
                                                >
                                                    ZESTBLOOM
                                                </Typography>
                                            </Box>
                                        </Link>
                                    ) : (
                                        <Box display="flex" alignItems="center">
                                            <Link to="" className="logo">
                                                <Logo type="logoIcon" width="53" />
                                            </Link>
                                            <StartCollectingSearch />
                                        </Box>
                                    )}
                                </Box>
                                {/*For window width (600-980) */}
                                <Box
                                    display={{ xs: 'none', sm: 'flex', md: 'none' }}
                                    alignItems="center"
                                    flexGrow="1"
                                >
                                    <Link to="/" className="logo">
                                        <Logo type="logo" width="160" />
                                    </Link>
                                </Box>

                                <ul className="menu">
                                    <li className="menu-link menu-link-about">
                                        <button onClick={onScrollToAbout}>About Us</button>
                                    </li>
                                    {canCreate && (
                                        <li className={'menu-btn menu-btn-marketplace'}>
                                            <Link to="/upload-asset">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="large"
                                                >
                                                    Create
                                                </Button>
                                            </Link>
                                        </li>
                                    )}

                                    <li
                                        className={`menu-btn menu-btn-marketplace ${
                                            path === MARKETPLACE ? 'menu-btn-arrow' : ''
                                        }`}
                                    >
                                        <li className="menu-link menu-link-about">
                                            <Link to="/marketplace">Marketplace</Link>
                                        </li>
                                    </li>
                                    <>
                                        {!selectedWallet && !connectLoading && (
                                            <li className="menu-btn menu-btn-wallet">
                                                <div onClick={onConnectWallet}>Connect Wallet</div>
                                            </li>
                                        )}
                                        {isLoggedIn && (
                                            <>
                                                <li className="menu-link" onClick={openProfileMenu}>
                                                    <Avatar
                                                        alt={user?.first_name}
                                                        src={user?.avatar}
                                                    />
                                                </li>
                                                <ProfileMenu
                                                    anchorEl={profileMenuEl}
                                                    closeMenu={closeProfileMenu}
                                                    setNotifications={setNotifications}
                                                />
                                                <li className="menu-notif">
                                                    <button
                                                        className={`notif-btn hover-opacity ${
                                                            unreadedNotifications &&
                                                            unReadedNotifyCount
                                                                ? 'unread'
                                                                : ''
                                                        }`}
                                                        ref={notifyRef}
                                                        onClick={openUserNotifications}
                                                    >
                                                        <i
                                                            className="icon-notifications-outline"
                                                            style={{ fontSize: 24 }}
                                                        />
                                                    </button>
                                                </li>
                                            </>
                                        )}
                                        {selectedWallet && !connectLoading && (
                                            <li
                                                className="menu-btn menu-btn-algo"
                                                onClick={onOpenChangeWallet}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <img src={algorandLogo} alt="Algorand" />
                                            </li>
                                        )}
                                        {connectLoading && (
                                            <li
                                                style={{ width: '100px' }}
                                                className="menu-btn menu-btn-algo"
                                            >
                                                <LottieContainer
                                                    containerStyles={{
                                                        height: '46px',
                                                        width: '100%',
                                                    }}
                                                    lottieStyles={{ width: '50px' }}
                                                />
                                            </li>
                                        )}
                                    </>
                                    {!isLoggedIn && (
                                        <li
                                            style={{ padding: '10px 50px' }}
                                            className="menu-btn menu-btn-signin"
                                        >
                                            <div onClick={onOpenLoginDialog}>Sign In</div>
                                        </li>
                                    )}
                                </ul>
                            </Toolbar>
                        </Container>
                    </AppBar>
                </Box>
            )}
        </>
    );
};

export default Header;
