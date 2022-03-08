import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Box, Fab, Drawer } from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import { loadMoreMarketplaceItems, loadMoreMarketplaceUsers } from 'redux/marketplace/actions';
import {
    setValueSearchFromHome,
    setFilterByTagFromSide,
    moveMarketplaceFromFeatured,
    getMinCardPeople,
    afterMakeAnOffer,
} from 'redux/marketplace/actions';
import { setValueBestVoted } from 'redux/bestVotedAssets/actions';
import { getObjectFromLocationSearch } from 'helpers/urls';
import { getAssetsFromWallet } from 'transactions/algorand/validations';
import { FILTER_CONFIG } from 'configs/marketplaceConfig';
import TabSearch from '../../components/shared/TabSearch';
import PeopleMinCard from '../../components/elements/cards/peopleMinCard';
import FeaturedArtworks from './items/FeaturedArtworks';
import Assets from './items/Assets';
import People from './items/People';
import DrawerList from './items/fIlters';
import useWindowDimensions from 'hooks/useWindowDimensions';

const Marketplace = () => {
    const history = useHistory();
    const [viewType, setViewType] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {
        loadMoreMarkURL,
        peopleFromFooter,
        fromFeaturedArtist,
        minCardPeople,
        searchFromHomePage,
        filterByTagFromSide,
    } = useSelector((state) => state.marketplace);
    const { user: authUser } = useSelector((state) => state.auth);
    const { fromBestVoted } = useSelector((state) => state.bestVotedAssets);
    const dispatch = useDispatch();
    const [filterObj, setFilterObj] = useState(FILTER_CONFIG.assetFilter);

    const { isMobile } = useWindowDimensions();
    // FIXME: workaround for users uploading in bulk and flooding "recently"
    // filter is to always select most popular. Need to improve the filter
    // and display capabilities. Change setSearchAssets and setSearchPeople
    // in DrawerList once updated.
    const [sortAssets, setSortAssets] = useState(
        fromBestVoted ? FILTER_CONFIG.popular : FILTER_CONFIG.recently_listed,
    );
    const [filterAssetsByTag, setFilterAssetsByTag] = useState([]);

    const [sortPeople, setSortPeople] = useState(FILTER_CONFIG.mostFollowed);
    const [filterPeopleByTag, setFilterPeopleByTag] = useState([]);
    const [filterPeople, setFilterPeople] = useState('');

    const [searchValue, setSearchValue] = useState(searchFromHomePage || '');

    const [sortPeopleByRole, setSortPeopleByRole] = useState('');
    const [assetsInWallet, setAssetsInWallet] = useState(null);

    const getAccount = useCallback(async () => {
        if (authUser?.wallets?.length) {
            const assets = await getAssetsFromWallet(authUser?.wallets);
            setAssetsInWallet(assets);
        }
    }, [authUser?.wallets]);

    useEffect(() => getAccount(), [getAccount]);

    useEffect(() => {
        if (peopleFromFooter?.sort) {
            // setViewType(peopleFromFooter?.viewType);
            setSortPeopleByRole(peopleFromFooter?.sort);
        }
    }, [peopleFromFooter]);

    useEffect(() => {
        if (fromFeaturedArtist) {
            // setViewType('people');
            setFilterPeople(FILTER_CONFIG.featuredAtrist);
        }
        return () => {
            dispatch(moveMarketplaceFromFeatured(false));
        };
    }, [fromFeaturedArtist, dispatch]);

    useEffect(() => {
        if (filterByTagFromSide) setFilterAssetsByTag([filterByTagFromSide]);
    }, [filterByTagFromSide]);

    useEffect(() => {
        if (!viewType) {
            const currentRequest = axios.CancelToken.source();
            let filter = '';
            if (searchValue) filter = '&search=' + encodeURIComponent(searchValue);
            dispatch(getMinCardPeople(filter, currentRequest));

            return () => currentRequest?.cancel();
        }
    }, [dispatch, searchValue, searchFromHomePage, viewType]);

    useEffect(() => {
        return () => {
            dispatch(setValueSearchFromHome(null));
            dispatch(setValueBestVoted(false));
            dispatch(setFilterByTagFromSide(null));
        };
    }, [dispatch]);

    useEffect(() => {
        const objSearch = getObjectFromLocationSearch(history.location.search);
        if (objSearch?.type) {
            setViewType(objSearch?.type);
        } else {
            setViewType(null);
        }

        if (objSearch?.status) {
            const statuses = objSearch.status.split(',');

            setFilterObj({
                ...filterObj,
                status: statuses,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history.location.search]);

    const loadMoreAssets = (url, category) => {
        if (url && category) {
            dispatch(loadMoreMarketplaceItems(url, category));
        }
    };

    const loadMoreUsers = (url) => {
        if (url) {
            dispatch(loadMoreMarketplaceUsers(url));
        }
    };

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };
    return (
        <div className="marketplace">
            {/*Marketplace Featured Artists*/}
            <FeaturedArtworks assetsInWallet={assetsInWallet} afterMakeAnOffer={afterMakeAnOffer} />
            {!isMobile && (
                <Fab
                    variant="extended"
                    color="primary"
                    onClick={openDrawer}
                    style={{
                        margin: 0,
                        top: 650,
                        right: 'auto',
                        bottom: 'auto',
                        left: 0,
                        position: 'fixed',
                        borderRadius: '0px 100px 100px 0px',
                        zIndex: 10,
                    }}
                >
                    <ChevronRight sx={{ mr: 1 }} />
                </Fab>
            )}

            <div className="marketplace-content">
                <Container maxWidth="xl">
                    {/*Search with tab*/}
                    <TabSearch
                        viewType={viewType}
                        setAssetsType={setViewType}
                        setSearchValue={setSearchValue}
                        searchValue={searchValue}
                    />

                    <Box
                        display={{ sm: 'block', md: 'flex' }}
                        justifyContent="space-between"
                        className="filter-list"
                    ></Box>
                    {/*People mini cards*/}
                    {!viewType && (
                        <Box display="flex" flexWrap="wrap" justifyContent="space-between" py={3}>
                            {minCardPeople?.map((item) => (
                                <PeopleMinCard
                                    key={`min-${item.username}`}
                                    sale_amount={item.sale_amount ?? item.sale_amount}
                                    tags={item.selected_tags}
                                    authorAvatar={item.avatar}
                                    author={item.username}
                                />
                            ))}
                        </Box>
                    )}

                    {/*Search result*/}
                    <div className="marketplace-result">
                        {viewType === 'people' && (
                            <People
                                sortPeople={sortPeople}
                                filterPeopleByTag={filterPeopleByTag}
                                searchValue={searchValue}
                                sortPeopleByRole={sortPeopleByRole}
                                filterPeople={filterPeople}
                                loadMoreUsers={loadMoreUsers}
                                displayVisibility={viewType === 'people'}
                            />
                        )}
                        {/* All Assets */}
                        {viewType !== 'people' && (
                            <Assets
                                title="All Assets"
                                searchValue={searchValue}
                                filterObj={filterObj}
                                sortAssets={sortAssets}
                                filterAssetsByTag={filterAssetsByTag}
                                loadMoreMarkURL={loadMoreMarkURL}
                                loadMoreAssets={loadMoreAssets}
                                displayVisibility={viewType !== 'people'}
                                searchFromHomePage={searchFromHomePage}
                                category={FILTER_CONFIG.all_assets}
                                assetsInWallet={assetsInWallet}
                                afterMakeAnOffer={afterMakeAnOffer}
                            />
                        )}
                        {/* )} */}
                    </div>
                </Container>
            </div>
            <Drawer open={drawerOpen} onClose={closeDrawer}>
                <DrawerList
                    setFilterObj={setFilterObj}
                    filterObj={filterObj}
                    setSortAssets={setSortAssets}
                    sortAssets={sortAssets}
                    setSortPeople={setSortPeople}
                    sortPeople={sortPeople}
                    setSortPeopleByRole={setSortPeopleByRole}
                    sortPeopleByRole={sortPeopleByRole}
                    filterAssetsByTag={filterAssetsByTag}
                    setFilterAssetsByTag={setFilterAssetsByTag}
                    filterPeopleByTag={filterPeopleByTag}
                    setFilterPeopleByTag={setFilterPeopleByTag}
                    viewType={viewType}
                    setSearchValueAsset={setSearchValue}
                    setSearchValuePeople={setSearchValue}
                    setSearchValue={viewType === 'people' ? setSearchValue : setSearchValue}
                />
            </Drawer>
        </div>
    );
};

export default Marketplace;
