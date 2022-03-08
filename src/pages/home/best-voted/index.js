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
    // Button,
} from '@material-ui/core';
import { ThumbUpOutlined, ThumbUp } from '@material-ui/icons';
import { Tag } from 'components/shared';
import {
    getBestVoted,
    // setValueBestVoted,
    upvoteAsset,
    unUpvoteAsset,
} from 'redux/bestVotedAssets/actions';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'components/shared/slider';
import ConfirmModal from 'components/elements/modal/confirmModal';
import {
    PRIVATE,
    //  PRIVATE_OWNER,
    REDIRECT_TO_ASSET,
} from 'configs';
import { stopEvent } from 'helpers/functions';

const FAKE_DATA = [
    {
        guid: 'b5bb63d6-d255-43a3-a277-70474e847c2d',
        url: '/api/marketplace/items/39261884/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'Heatbeat',
        description: 'Be still my beating heart.',
        asset: {
            title: 'Heatbeat',
            description: 'Be still my beating heart.',
            unit_name: 'HRT',
            asset_id: 39261884,
            creator: 'HQR7NF3XVTE6QLA3ICZYUC2L6F4L5TZVFUQN6W5FIN3VF723DTAX42WQ7Q',
            clawback: 'HQR7NF3XVTE6QLA3ICZYUC2L6F4L5TZVFUQN6W5FIN3VF723DTAX42WQ7Q',
            freeze: null,
            manager: 'HQR7NF3XVTE6QLA3ICZYUC2L6F4L5TZVFUQN6W5FIN3VF723DTAX42WQ7Q',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/39261884/QmWt2BemZsjQTh2V1kc3mfAQgmTTtaCGs82UDPmozDeSWP_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmWt2BemZsjQTh2V1kc3mfAQgmTTtaCGs82UDPmozDeSWP',
                mimetype: 'image/jpeg',
                integrity: null,
            },
            content_type: 'image/jpeg',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmWt2BemZsjQTh2V1kc3mfAQgmTTtaCGs82UDPmozDeSWP',
            thumbnail: null,
            total: 1,
        },
        series: null,
        base_node: null,
        creator: null,
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Graphic',
                slug: 'graphic',
                category: 'static',
                icon: 'icon-graphic',
            },
        ],
        favorite: null,
        favorite_count: 0,
        voted: null,
        vote_count: 4,
    },
    {
        guid: '82748c82-49de-4d59-a121-7d48ea484e69',
        url: '/api/marketplace/items/43322917/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'Spooky House',
        description: 'Halloween House',
        asset: {
            title: 'Spooky House',
            description: 'Halloween House',
            unit_name: 'NFT',
            asset_id: 43322917,
            creator: 'HQR7NF3XVTE6QLA3ICZYUC2L6F4L5TZVFUQN6W5FIN3VF723DTAX42WQ7Q',
            clawback: 'HQR7NF3XVTE6QLA3ICZYUC2L6F4L5TZVFUQN6W5FIN3VF723DTAX42WQ7Q',
            freeze: null,
            manager: 'HQR7NF3XVTE6QLA3ICZYUC2L6F4L5TZVFUQN6W5FIN3VF723DTAX42WQ7Q',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/43322917/QmeHWsKjW9rZVeP2RZqJhZk7eQu8WaSLx7MfT8QV2ivg9Q_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmeHWsKjW9rZVeP2RZqJhZk7eQu8WaSLx7MfT8QV2ivg9Q',
                mimetype: 'image/jpeg',
                integrity: null,
            },
            content_type: 'image/jpeg',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmeHWsKjW9rZVeP2RZqJhZk7eQu8WaSLx7MfT8QV2ivg9Q',
            thumbnail: null,
            total: 1,
        },
        series: null,
        base_node: null,
        creator: {
            id: 15,
            first_name: 'Ryan',
            last_name: 'Farrell',
            username: 'whereisrysmind',
            avatar: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/profiles/avatars/05d7f579-9f55-4b58-bd30-1dbe4dec3bc4.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103442Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=82dd13cab267823c5196e21446ad011e5827e1d534fbe183b75db4b103b65bba',
            selected_tags: [
                {
                    name: 'Photographer',
                    slug: 'photographer',
                    type: 'static',
                    icon: 'icon-photo-camera',
                },
            ],
        },
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Graphic',
                slug: 'graphic',
                category: 'static',
                icon: 'icon-graphic',
            },
        ],
        favorite: null,
        favorite_count: 3,
        voted: null,
        vote_count: 4,
    },
    {
        guid: '23897564-ef38-46e4-8946-ad7863cf0ab1',
        url: '/api/marketplace/items/38902384/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'Wasp Up!',
        description: 'A Hornet enjoys the fall flowers',
        asset: {
            title: 'Wasp Up!',
            description: 'A Hornet enjoys the fall flowers',
            unit_name: 'WSP',
            asset_id: 38902384,
            creator: 'HQR7NF3XVTE6QLA3ICZYUC2L6F4L5TZVFUQN6W5FIN3VF723DTAX42WQ7Q',
            clawback: 'HQR7NF3XVTE6QLA3ICZYUC2L6F4L5TZVFUQN6W5FIN3VF723DTAX42WQ7Q',
            freeze: null,
            manager: 'HQR7NF3XVTE6QLA3ICZYUC2L6F4L5TZVFUQN6W5FIN3VF723DTAX42WQ7Q',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/38902384/QmRwuuk21X6cdwfF1uaspVxdCGpbnrexsX5R7s6HzXshCV_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmRwuuk21X6cdwfF1uaspVxdCGpbnrexsX5R7s6HzXshCV',
                mimetype: 'image/jpeg',
                integrity: null,
            },
            content_type: 'image/jpeg',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmRwuuk21X6cdwfF1uaspVxdCGpbnrexsX5R7s6HzXshCV',
            thumbnail: null,
            total: 1,
        },
        series: null,
        base_node: null,
        creator: null,
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Graphic',
                slug: 'graphic',
                category: 'static',
                icon: 'icon-graphic',
            },
        ],
        favorite: null,
        favorite_count: 1,
        voted: null,
        vote_count: 2,
    },
    {
        guid: '7c72c465-e817-4476-ab73-979bdb61f39e',
        url: '/api/marketplace/items/38900142/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'New created asset',
        description: 'New created asset',
        asset: {
            title: 'New created asset',
            description: 'New created asset',
            unit_name: null,
            asset_id: 38900142,
            creator: '3HNNDFA6S5T2MMBQXGUN7LHC3HFW37K4TJBKBVWOJYSVRW5UGRPWVKKGJE',
            clawback: '3HNNDFA6S5T2MMBQXGUN7LHC3HFW37K4TJBKBVWOJYSVRW5UGRPWVKKGJE',
            freeze: null,
            manager: '3HNNDFA6S5T2MMBQXGUN7LHC3HFW37K4TJBKBVWOJYSVRW5UGRPWVKKGJE',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/38900142/QmQmADEiwZi3mkUh343mjiAwjDvaVrJPGoU1x4PBQ1WyyB_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmQmADEiwZi3mkUh343mjiAwjDvaVrJPGoU1x4PBQ1WyyB',
                mimetype: 'image/jpeg',
                integrity: null,
            },
            content_type: 'image/jpeg',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmQmADEiwZi3mkUh343mjiAwjDvaVrJPGoU1x4PBQ1WyyB',
            thumbnail: null,
            total: 1,
        },
        series: null,
        base_node: null,
        creator: {
            id: 96,
            first_name: 'Jo',
            last_name: 'Joo',
            username: 'jo.joo',
            avatar: null,
            selected_tags: [],
        },
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Virtual  Reality',
                slug: 'virtual-reality',
                category: 'static',
                icon: 'icon-virtual-reality',
            },
        ],
        favorite: null,
        favorite_count: 0,
        voted: null,
        vote_count: 2,
    },
    {
        guid: 'c6a25c8f-c040-49ed-a14f-91675ec08f36',
        url: '/api/marketplace/items/69329219/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'Daisy',
        description: 'Marghuerita',
        asset: {
            title: 'Daisy',
            description: 'Marghuerita',
            unit_name: 'NFT',
            asset_id: 69329219,
            creator: 'TJ6TRQQX7OQOVRTLZLOZJVX2BXGUCWJR3WDA5NURDTKNDL4TUVICKWANTU',
            clawback: null,
            freeze: null,
            manager: 'TJ6TRQQX7OQOVRTLZLOZJVX2BXGUCWJR3WDA5NURDTKNDL4TUVICKWANTU',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/69329219/QmT3J7Hii3fKjXtKzirwwwWC1AhbFkqMusRsDZuBBp4eZr_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmT3J7Hii3fKjXtKzirwwwWC1AhbFkqMusRsDZuBBp4eZr',
                mimetype: 'image/jpeg',
                integrity: '4zWm6jMzGKmiA8bRff5qVS0Ec7m2PYDpsH9AUk0IOyA=',
            },
            content_type: 'image/jpeg',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmT3J7Hii3fKjXtKzirwwwWC1AhbFkqMusRsDZuBBp4eZr',
            thumbnail: null,
            total: 5,
        },
        series: null,
        base_node: null,
        creator: {
            id: 28,
            first_name: 'Margarit',
            last_name: 'Marukyan',
            username: 'MMarukyan',
            avatar: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/profiles/avatars/IMG_0317.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103442Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=bf76b0983354751d01c9c0d824d5b44de8d0ae6faf972ccd7a90b03660e8f3bf',
            selected_tags: [
                {
                    name: 'Photographer',
                    slug: 'photographer',
                    type: 'static',
                    icon: 'icon-photo-camera',
                },
            ],
        },
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Photography',
                slug: 'photography',
                category: 'static',
                icon: 'icon-photo-camera',
            },
        ],
        favorite: null,
        favorite_count: 1,
        voted: null,
        vote_count: 2,
    },
    {
        guid: 'b4e428ab-4ddf-4694-b7a4-87587c732669',
        url: '/api/marketplace/items/38910984/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'Dzoraget Canyon',
        description: 'The stunning view of Dzoraget Canyon',
        asset: {
            title: 'Dzoraget Canyon',
            description: 'The stunning view of Dzoraget Canyon',
            unit_name: null,
            asset_id: 38910984,
            creator: 'TJ6TRQQX7OQOVRTLZLOZJVX2BXGUCWJR3WDA5NURDTKNDL4TUVICKWANTU',
            clawback: 'TJ6TRQQX7OQOVRTLZLOZJVX2BXGUCWJR3WDA5NURDTKNDL4TUVICKWANTU',
            freeze: null,
            manager: 'TJ6TRQQX7OQOVRTLZLOZJVX2BXGUCWJR3WDA5NURDTKNDL4TUVICKWANTU',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/38910984/QmZrBgqkJ5YNQboCKkjWKfUzYywgX8x4YZQrY1y7dUFkQv_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmZrBgqkJ5YNQboCKkjWKfUzYywgX8x4YZQrY1y7dUFkQv',
                mimetype: 'image/jpeg',
                integrity: null,
            },
            content_type: 'image/jpeg',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmZrBgqkJ5YNQboCKkjWKfUzYywgX8x4YZQrY1y7dUFkQv',
            thumbnail: null,
            total: 1,
        },
        series: null,
        base_node: null,
        creator: {
            id: 28,
            first_name: 'Margarit',
            last_name: 'Marukyan',
            username: 'MMarukyan',
            avatar: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/profiles/avatars/IMG_0317.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103442Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=bf76b0983354751d01c9c0d824d5b44de8d0ae6faf972ccd7a90b03660e8f3bf',
            selected_tags: [
                {
                    name: 'Photographer',
                    slug: 'photographer',
                    type: 'static',
                    icon: 'icon-photo-camera',
                },
            ],
        },
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Graphic',
                slug: 'graphic',
                category: 'static',
                icon: 'icon-graphic',
            },
        ],
        favorite: null,
        favorite_count: 0,
        voted: null,
        vote_count: 1,
    },
    {
        guid: '8012dba6-3ccc-489e-abb8-9b981326fb8e',
        url: '/api/marketplace/items/37604438/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'New asset',
        description: 'test this must work',
        asset: {
            title: 'New asset',
            description: 'test this must work',
            unit_name: null,
            asset_id: 37604438,
            creator: '3HNNDFA6S5T2MMBQXGUN7LHC3HFW37K4TJBKBVWOJYSVRW5UGRPWVKKGJE',
            clawback: '3HNNDFA6S5T2MMBQXGUN7LHC3HFW37K4TJBKBVWOJYSVRW5UGRPWVKKGJE',
            freeze: null,
            manager: '3HNNDFA6S5T2MMBQXGUN7LHC3HFW37K4TJBKBVWOJYSVRW5UGRPWVKKGJE',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/37604438/QmVri99C2M2RjtcMwDiGm9QkwbJacCRm6qbRkFm7BTNCyJ_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmVri99C2M2RjtcMwDiGm9QkwbJacCRm6qbRkFm7BTNCyJ',
                mimetype: 'image/gif',
                integrity: null,
            },
            content_type: 'image/gif',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmVri99C2M2RjtcMwDiGm9QkwbJacCRm6qbRkFm7BTNCyJ',
            thumbnail: null,
            total: 1,
        },
        series: null,
        base_node: null,
        creator: {
            id: 96,
            first_name: 'Jo',
            last_name: 'Joo',
            username: 'jo.joo',
            avatar: null,
            selected_tags: [],
        },
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Animation',
                slug: 'animation',
                category: 'static',
                icon: 'icon-animation',
            },
        ],
        favorite: null,
        favorite_count: 0,
        voted: null,
        vote_count: 1,
    },
    {
        guid: 'b20abd31-116b-492f-a2dd-ab107a6c0f55',
        url: '/api/marketplace/items/39348810/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'Test',
        description: 'test',
        asset: {
            title: 'Test',
            description: 'test',
            unit_name: 'tets',
            asset_id: 39348810,
            creator: 'RWBXZVP7UAHHSFQIQLKMWW2QCEO7AXNJ6NT6AIDOB25GWB63IM6DGUGR5Q',
            clawback: 'RWBXZVP7UAHHSFQIQLKMWW2QCEO7AXNJ6NT6AIDOB25GWB63IM6DGUGR5Q',
            freeze: null,
            manager: 'RWBXZVP7UAHHSFQIQLKMWW2QCEO7AXNJ6NT6AIDOB25GWB63IM6DGUGR5Q',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/39348810/QmVjnda653hJw7HCa8N5BTWhqTDSPHPZa7CoFH94tnDpCD_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmVjnda653hJw7HCa8N5BTWhqTDSPHPZa7CoFH94tnDpCD',
                mimetype: 'image/jpeg',
                integrity: null,
            },
            content_type: 'image/jpeg',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmVjnda653hJw7HCa8N5BTWhqTDSPHPZa7CoFH94tnDpCD',
            thumbnail: null,
            total: 1,
        },
        series: null,
        base_node: null,
        creator: {
            id: 26,
            first_name: 'Mark',
            last_name: 'Lopes',
            username: 'hrant',
            avatar: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/profiles/avatars/download_5_fyyg99r.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103442Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=07e1c55c9ebabe56bb666fc7b68da884c1fab5b8895f50f990a6fe9c9e47dde5',
            selected_tags: [],
        },
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Graphic',
                slug: 'graphic',
                category: 'static',
                icon: 'icon-graphic',
            },
        ],
        favorite: null,
        favorite_count: 2,
        voted: null,
        vote_count: 1,
    },
    {
        guid: '37f65bd5-0d7d-4150-ac6a-286ecde8a216',
        url: '/api/marketplace/items/41376770/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'TEst',
        description: 'test',
        asset: {
            title: 'TEst',
            description: 'test',
            unit_name: 'e',
            asset_id: 41376770,
            creator: 'RWBXZVP7UAHHSFQIQLKMWW2QCEO7AXNJ6NT6AIDOB25GWB63IM6DGUGR5Q',
            clawback: 'RWBXZVP7UAHHSFQIQLKMWW2QCEO7AXNJ6NT6AIDOB25GWB63IM6DGUGR5Q',
            freeze: null,
            manager: 'RWBXZVP7UAHHSFQIQLKMWW2QCEO7AXNJ6NT6AIDOB25GWB63IM6DGUGR5Q',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/41376770/QmZpc7DS7zh1oKk1X8ng8HitjhiqGVv7eSHvn3qndv1Dwo_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmZpc7DS7zh1oKk1X8ng8HitjhiqGVv7eSHvn3qndv1Dwo',
                mimetype: 'image/jpeg',
                integrity: null,
            },
            content_type: 'image/jpeg',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmZpc7DS7zh1oKk1X8ng8HitjhiqGVv7eSHvn3qndv1Dwo',
            thumbnail: null,
            total: 1,
        },
        series: null,
        base_node: null,
        creator: {
            id: 26,
            first_name: 'Mark',
            last_name: 'Lopes',
            username: 'hrant',
            avatar: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/profiles/avatars/download_5_fyyg99r.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103442Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=07e1c55c9ebabe56bb666fc7b68da884c1fab5b8895f50f990a6fe9c9e47dde5',
            selected_tags: [],
        },
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Graphic',
                slug: 'graphic',
                category: 'static',
                icon: 'icon-graphic',
            },
        ],
        favorite: null,
        favorite_count: 0,
        voted: null,
        vote_count: 1,
    },
    {
        guid: '5d121d87-cd59-4307-b5e1-9dfc602ab7d9',
        url: '/api/marketplace/items/41485582/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'Flowery',
        description: 'Bunch of flowers',
        asset: {
            title: 'Flowery',
            description: 'Bunch of flowers',
            unit_name: 'NFT',
            asset_id: 41485582,
            creator: 'TJ6TRQQX7OQOVRTLZLOZJVX2BXGUCWJR3WDA5NURDTKNDL4TUVICKWANTU',
            clawback: 'TJ6TRQQX7OQOVRTLZLOZJVX2BXGUCWJR3WDA5NURDTKNDL4TUVICKWANTU',
            freeze: null,
            manager: 'TJ6TRQQX7OQOVRTLZLOZJVX2BXGUCWJR3WDA5NURDTKNDL4TUVICKWANTU',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/41485582/QmReYKGV1Ud73uw7Zkv7wTKVU53wy6aVLhKjv4J1SRjESJ_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmReYKGV1Ud73uw7Zkv7wTKVU53wy6aVLhKjv4J1SRjESJ',
                mimetype: 'image/jpeg',
                integrity: null,
            },
            content_type: 'image/jpeg',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmReYKGV1Ud73uw7Zkv7wTKVU53wy6aVLhKjv4J1SRjESJ',
            thumbnail: null,
            total: 1,
        },
        series: null,
        base_node: null,
        creator: null,
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Graphic',
                slug: 'graphic',
                category: 'static',
                icon: 'icon-graphic',
            },
        ],
        favorite: null,
        favorite_count: 1,
        voted: null,
        vote_count: 1,
    },
    {
        guid: '5957a98d-5bd2-4756-bd11-7ea5d1f05f9a',
        url: '/api/marketplace/items/41803836/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'Falgoanna',
        description: 'Feaux Algoanna',
        asset: {
            title: 'Falgoanna',
            description: 'Feaux Algoanna',
            unit_name: 'IgNA',
            asset_id: 41803836,
            creator: 'HQR7NF3XVTE6QLA3ICZYUC2L6F4L5TZVFUQN6W5FIN3VF723DTAX42WQ7Q',
            clawback: 'HQR7NF3XVTE6QLA3ICZYUC2L6F4L5TZVFUQN6W5FIN3VF723DTAX42WQ7Q',
            freeze: null,
            manager: 'HQR7NF3XVTE6QLA3ICZYUC2L6F4L5TZVFUQN6W5FIN3VF723DTAX42WQ7Q',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/41803836/QmbVFEiTQV8Eoz7ZTgJkpAan27Wq6ATtVJ5PjtG1EHqN2h_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmbVFEiTQV8Eoz7ZTgJkpAan27Wq6ATtVJ5PjtG1EHqN2h',
                mimetype: 'image/jpeg',
                integrity: null,
            },
            content_type: 'image/jpeg',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmbVFEiTQV8Eoz7ZTgJkpAan27Wq6ATtVJ5PjtG1EHqN2h',
            thumbnail: null,
            total: 1,
        },
        series: null,
        base_node: {
            guid: 'b8e876bf-2ce0-4baf-989b-dd47eb06fd0c',
            owner: {
                id: 41,
                first_name: 'James',
                last_name: 'Viggers',
                username: 'JimmyVee',
                avatar: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/profiles/avatars/safe.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103442Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=053445a8f5a7dfeed20a1a86983fedae0578e83929e5a118ead26727e31e4b43',
                selected_tags: [],
            },
            holder: 'MUNXXWGS7K46SIMSUH2OYHUJQRBYNDMWSYQYFEUERMRXRJM5VOF2BXVRCA',
            sales: [
                {
                    id: 75,
                    guid: '4d02fd31-76ab-4e3a-87a7-f10ed00e3d47',
                    type: 'SaleByEscrow',
                    status: 'ACTIVE',
                    compiled_teal_address:
                        'FEA6B75YNXVRVGW6NJKGL2FBILD5UD2XJABCVIQVGO7632U5TVJEWYTK2I',
                    compiled_teal_result:
                        'AyAKoB8EAAECvMD3E8iZQ7iTnwT2xsdr+NwVJgMgPCP2l3esyegsG0CzigtL8Xi+zzUtIN9bpUN3Uv9bHMEgZRt72NL6uekhkqH07B6JhEOGjZaWIYKShIsjeKWdq4sgz+roHaQNe0px6/fdvpWk5A5vyldZ/5RdXc26wCiqg0sxASIOMSAyAxIQMRAjEjESJBIQMgQlEhBAAL0xECUSMQkyAxMQQADKMRAjEjESJBIQMgQhBBIQQAClMwAQIxIzAAAxABIQMwARIQUSEDMAEiUSEDMBECUSEDMBBygSEDMBCCEGEhAzASAyAxIQMwEBIg4QMwMQJRIQMwMHKRIQMwMgMgMSEDMDCTIDEhAzAwEiDhAzAwghBxIQMwIBIg4QMwIgMgMSEDMCECMSQAAJMwIQIxNAABRDMwIUKhIzAhIlEhAzAhEhCBIQQzMCByoSMwIIIQkSEEMxESEFEhBDMwAVKRIzABEhBRIQMwEAKRIQQzIEJRIQMQkpEhBD',
                    teal_context: {
                        asset_id: 41803836,
                        new_seller: 'MUNXXWGS7K46SIMSUH2OYHUJQRBYNDMWSYQYFEUERMRXRJM5VOF2BXVRCA',
                        sale_amount: 8899000,
                        asset_creator: 'HQR7NF3XVTE6QLA3ICZYUC2L6F4L5TZVFUQN6W5FIN3VF723DTAX42WQ7Q',
                        royalty_percent: 1101000,
                        voucher_asset_id: 225567606,
                        zestbloom_account:
                            'Z7VOQHNEBV5UU4PL67O35FNE4QHG7SSXLH7ZIXK5ZW5MAKFKQNFRU3PED4',
                        commission_payment: 355960,
                    },
                    created_at: '2021-11-10T16:56:52.112145Z',
                },
            ],
            auctions: [],
            user_type: 'collector',
            visibility: 'public',
            min_offer_price: null,
            price_is_visible: true,
            price: 10,
        },
        creator: null,
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Graphic',
                slug: 'graphic',
                category: 'static',
                icon: 'icon-graphic',
            },
        ],
        favorite: null,
        favorite_count: 0,
        voted: null,
        vote_count: 1,
    },
    {
        guid: 'f6712e9f-a3a0-4d00-80f2-e6d2b0c4634b',
        url: '/api/marketplace/items/43444144/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'Safe Word',
        description: "Isn't it just?",
        asset: {
            title: 'Safe Word',
            description: "Isn't it just?",
            unit_name: 'JVNFT',
            asset_id: 43444144,
            creator: 'MUNXXWGS7K46SIMSUH2OYHUJQRBYNDMWSYQYFEUERMRXRJM5VOF2BXVRCA',
            clawback: 'MUNXXWGS7K46SIMSUH2OYHUJQRBYNDMWSYQYFEUERMRXRJM5VOF2BXVRCA',
            freeze: null,
            manager: 'MUNXXWGS7K46SIMSUH2OYHUJQRBYNDMWSYQYFEUERMRXRJM5VOF2BXVRCA',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/43444144/QmUui5tREPxXTQoxvZLXF6Ra4yi9v83vzqaiguzR5aS56n_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmUui5tREPxXTQoxvZLXF6Ra4yi9v83vzqaiguzR5aS56n',
                mimetype: 'image/jpeg',
                integrity: null,
            },
            content_type: 'image/jpeg',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmUui5tREPxXTQoxvZLXF6Ra4yi9v83vzqaiguzR5aS56n',
            thumbnail: null,
            total: 1,
        },
        series: null,
        base_node: null,
        creator: null,
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Graphic',
                slug: 'graphic',
                category: 'static',
                icon: 'icon-graphic',
            },
        ],
        favorite: null,
        favorite_count: 1,
        voted: null,
        vote_count: 1,
    },
    {
        guid: '80559b2e-a779-4590-8002-6f768aa8eedb',
        url: '/api/marketplace/items/43975695/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'Sunflower',
        description: 'A nice one',
        asset: {
            title: 'Sunflower',
            description: 'A nice one',
            unit_name: 'NFT',
            asset_id: 43975695,
            creator: 'TJ6TRQQX7OQOVRTLZLOZJVX2BXGUCWJR3WDA5NURDTKNDL4TUVICKWANTU',
            clawback: 'TJ6TRQQX7OQOVRTLZLOZJVX2BXGUCWJR3WDA5NURDTKNDL4TUVICKWANTU',
            freeze: 'TJ6TRQQX7OQOVRTLZLOZJVX2BXGUCWJR3WDA5NURDTKNDL4TUVICKWANTU',
            manager: 'TJ6TRQQX7OQOVRTLZLOZJVX2BXGUCWJR3WDA5NURDTKNDL4TUVICKWANTU',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/43975695/QmRhyp6k3shWVL7zsaVFxJkA6HeXZCDc6n1a4Lux9tYjMN_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmRhyp6k3shWVL7zsaVFxJkA6HeXZCDc6n1a4Lux9tYjMN',
                mimetype: 'image/jpeg',
                integrity: null,
            },
            content_type: 'image/jpeg',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmRhyp6k3shWVL7zsaVFxJkA6HeXZCDc6n1a4Lux9tYjMN',
            thumbnail: null,
            total: 1,
        },
        series: null,
        base_node: null,
        creator: null,
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Graphic',
                slug: 'graphic',
                category: 'static',
                icon: 'icon-graphic',
            },
        ],
        favorite: null,
        favorite_count: 1,
        voted: null,
        vote_count: 1,
    },
    {
        guid: 'b34bf85f-cd6f-49cb-ac5c-14c5a6856d6c',
        url: '/api/marketplace/items/44314636/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'TestNet Girl',
        description: 'TestNet Doodle .-.',
        asset: {
            title: 'TestNet Girl',
            description: 'TestNet Doodle .-.',
            unit_name: 'NFT',
            asset_id: 44314636,
            creator: 'UDMVT5PVCT3KJ7YZ2XPXQMZJEYJYIZRRIWMWXE4DJ4TA4EHX73HNPZVLQE',
            clawback: 'UDMVT5PVCT3KJ7YZ2XPXQMZJEYJYIZRRIWMWXE4DJ4TA4EHX73HNPZVLQE',
            freeze: 'UDMVT5PVCT3KJ7YZ2XPXQMZJEYJYIZRRIWMWXE4DJ4TA4EHX73HNPZVLQE',
            manager: 'UDMVT5PVCT3KJ7YZ2XPXQMZJEYJYIZRRIWMWXE4DJ4TA4EHX73HNPZVLQE',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/44314636/QmPnDnvw8kq7f3vZw8EPf5j1yKsGHqRPtih1AuAx5dcZw6_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmPnDnvw8kq7f3vZw8EPf5j1yKsGHqRPtih1AuAx5dcZw6',
                mimetype: 'image/jpeg',
                integrity: null,
            },
            content_type: 'image/jpeg',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmPnDnvw8kq7f3vZw8EPf5j1yKsGHqRPtih1AuAx5dcZw6',
            thumbnail: null,
            total: 1,
        },
        series: null,
        base_node: {
            guid: '76bda9df-b607-4392-ad08-9f9636cfd5e7',
            owner: {
                id: 45,
                first_name: 'Mike',
                last_name: 'Dalzell',
                username: 'MikeDalzellArtist',
                avatar: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/profiles/avatars/Temp1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103442Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=bb67e559e9fa92ad561870782c589a20c5b525f84a31f2159bc129fd1cb5f86c',
                selected_tags: [],
            },
            holder: 'UDMVT5PVCT3KJ7YZ2XPXQMZJEYJYIZRRIWMWXE4DJ4TA4EHX73HNPZVLQE',
            sales: [
                {
                    id: 76,
                    guid: '0d91503a-76f0-4603-9e23-2c7cfa5a0466',
                    type: 'SaleByEscrow',
                    status: 'ACTIVE',
                    compiled_teal_address:
                        'EWSISGD6AWQALTFQ6TBMZSDUJAJAF4PWJEVJ56YXXRDE56ZP2LWGHVSDBE',
                    compiled_teal_result:
                        'AyAJoB8EAAECjOCQFYCt4gT2xsdr4MZbJgIgoNlZ9fUU9qT/GdXfeDMpJhOEZjFFmWuTg08mDhD3/s4gz+roHaQNe0px6/fdvpWk5A5vyldZ/5RdXc26wCiqg0sxASIOMSAyAxIQMRAjEjESJBIQMgQlEhBAAJgxECUSMQkyAxMQQAClMRAjEjESJBIQMgQhBBIQQACAMwAAMQASMwARIQUSEDMAEiUSEDMBBygSEDMBCCEGEhAzASAyAxIQMwEBIg4QMwIBIg4QMwIgMgMSEDEJMgMSEDEVMgMSEDMCECMSQAAJMwIQJRJAABVDMwIUKRIQMwISJRIQMwIRIQcSEEMzAgcpEhAzAgghCBIQQzERIQUSEEMzABUoEjMAESEFEhAzAQAoEhBDMQkoEhAyBCUSEEM=',
                    teal_context: {
                        asset_id: 44314636,
                        sale_amount: 10000000,
                        asset_creator: 'UDMVT5PVCT3KJ7YZ2XPXQMZJEYJYIZRRIWMWXE4DJ4TA4EHX73HNPZVLQE',
                        voucher_asset_id: 225567606,
                        zestbloom_account:
                            'Z7VOQHNEBV5UU4PL67O35FNE4QHG7SSXLH7ZIXK5ZW5MAKFKQNFRU3PED4',
                        commission_payment: 1500000,
                    },
                    created_at: '2021-11-11T19:40:34.868757Z',
                },
            ],
            auctions: [],
            user_type: 'creator',
            visibility: 'public',
            min_offer_price: null,
            price_is_visible: true,
            price: 10,
        },
        creator: {
            id: 45,
            first_name: 'Mike',
            last_name: 'Dalzell',
            username: 'MikeDalzellArtist',
            avatar: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/profiles/avatars/Temp1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103442Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=bb67e559e9fa92ad561870782c589a20c5b525f84a31f2159bc129fd1cb5f86c',
            selected_tags: [],
        },
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Graphic',
                slug: 'graphic',
                category: 'static',
                icon: 'icon-graphic',
            },
        ],
        favorite: null,
        favorite_count: 1,
        voted: null,
        vote_count: 1,
    },
    {
        guid: '3d6f730b-c6c2-4aa2-9e08-3e550a41bea1',
        url: '/api/marketplace/items/49406207/',
        type: 'asset',
        status: 'ACTIVE',
        title: 'Test Text Asset',
        description: 'Test text asset',
        asset: {
            title: 'Test Text Asset',
            description: 'Test text asset',
            unit_name: 'NFT',
            asset_id: 49406207,
            creator: 'Y46K6XSJ6GRCIDO4N54O66GPDTNGFHW24EXZNNN2W3MT2CUWYJ5RX6THTQ',
            clawback: null,
            freeze: 'Y46K6XSJ6GRCIDO4N54O66GPDTNGFHW24EXZNNN2W3MT2CUWYJ5RX6THTQ',
            manager: 'Y46K6XSJ6GRCIDO4N54O66GPDTNGFHW24EXZNNN2W3MT2CUWYJ5RX6THTQ',
            content: {
                url: 'https://zb-media-cache.nyc3.digitaloceanspaces.com/test-cache/49406207/QmUeUGcEKy2xf7iLRr93KStnB3x4qijmwoDexxC7ex6nu7_medium',
                ipfs_url:
                    'https://zestbloom.mypinata.cloud/ipfs/QmUeUGcEKy2xf7iLRr93KStnB3x4qijmwoDexxC7ex6nu7',
                mimetype: 'text/plain',
                integrity: '1e+ZhL4TXsdMvF3uJIJRmcpDPh/9ei+yLbEqPFMk6h0=',
            },
            content_type: 'text/plain',
            content_url:
                'https://zestbloom.mypinata.cloud/ipfs/QmUeUGcEKy2xf7iLRr93KStnB3x4qijmwoDexxC7ex6nu7',
            thumbnail: {
                alt: 'Text Thumbnail',
                url: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/files/writing.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103443Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8a57fb4c4f729a69e24a2e9dabd97160ccd34f13ff9c2003fccfcda124f0be02',
            },
            total: 1,
        },
        series: null,
        base_node: {
            guid: '7bdcaa00-f4aa-436e-b78c-aaedc6fff283',
            owner: {
                id: 28,
                first_name: 'Margarit',
                last_name: 'Marukyan',
                username: 'MMarukyan',
                avatar: 'https://nyc3.digitaloceanspaces.com/zb-static-dev/media/public/profiles/avatars/IMG_0317.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Y2CWCI4WERF7R5M2M5VL%2F20220306%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20220306T103443Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ab04364ee354961d6bb76fc413b590ef9f5acc63fca8757f9db134e8f2e03905',
                selected_tags: [
                    {
                        name: 'Photographer',
                        slug: 'photographer',
                        type: 'static',
                        icon: 'icon-photo-camera',
                    },
                ],
            },
            holder: 'TJ6TRQQX7OQOVRTLZLOZJVX2BXGUCWJR3WDA5NURDTKNDL4TUVICKWANTU',
            sales: [
                {
                    id: 160,
                    guid: 'a1e77d69-7387-4521-8050-1b42df2327dc',
                    type: 'SaleByEscrow',
                    status: 'ACTIVE',
                    compiled_teal_address:
                        '45B4R3TIDWBLMF37WC3A4O6ZUY2T2LGIL5KP5RWHMIAHEINM7HIAYB5UJA',
                    compiled_teal_result:
                        'AyAKoB8EAAMB/8HHF8CaDMDubfbGx2uA8QQmAyDHPK9eSfGiJA3cb3jveM8c2mKe2uEvlrW6ttk9CpbCeyCafTjCF/ug6sZryt2U1voNzUFZMd2GDraRHNTRr5OlUCDP6ugdpA17SnHr992+laTkDm/KV1n/lF1dzbrAKKqDSzEBIg4xIDIDEhAxECMSMRIkEhAyBCUSEDEVMgMSEEAAvDEQIQQSMQkyAxMQQADAMRAjEjESJBIQQACpMwAQIxIzAAAxABIQMwARIQUSEDMAEiEEEhAzARAhBBIQMwEHKBIQMwEIIQYSEDMBIDIDEhAzAQEiDhAzAxAhBBIQMwMHKRIQMwMgMgMSEDMDCTIDEhAzAwEiDhAzAwghBxIQMwIBIg4QMwIgMgMSEDMCECMSQAAJMwIQIxNAABVDMwIUKhIzAhIhBBIQMwIRIQgSEEMzAgcqEjMCCCEJEhBDMREhBRIQQzEVKRIxESEFEhBDMQkpEjEIJBIQQw==',
                    teal_context: {
                        asset_id: 49406207,
                        new_seller: 'TJ6TRQQX7OQOVRTLZLOZJVX2BXGUCWJR3WDA5NURDTKNDL4TUVICKWANTU',
                        sale_amount: 1800000,
                        asset_creator: 'Y46K6XSJ6GRCIDO4N54O66GPDTNGFHW24EXZNNN2W3MT2CUWYJ5RX6THTQ',
                        royalty_percent: 200000,
                        voucher_asset_id: 225567606,
                        zestbloom_account:
                            'Z7VOQHNEBV5UU4PL67O35FNE4QHG7SSXLH7ZIXK5ZW5MAKFKQNFRU3PED4',
                        commission_payment: 80000,
                    },
                    created_at: '2021-12-15T05:12:03.734990Z',
                },
            ],
            auctions: [],
            user_type: 'collector',
            visibility: 'public',
            min_offer_price: null,
            price_is_visible: true,
            price: 2,
        },
        creator: null,
        nodes: null,
        offers: null,
        fees: {
            primary: 8,
            secondary: 4,
        },
        media_types: [
            {
                name: 'Text',
                slug: 'text-f1ny',
                category: 'custom',
                icon: 'icon-label',
            },
        ],
        favorite: null,
        favorite_count: 0,
        voted: null,
        vote_count: 1,
    },
];

const BestVoted = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { bestVotedAssets } = useSelector((state) => state.bestVotedAssets);
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
    // const redirectToMarketplace = () => {
    //     dispatch(setValueBestVoted(true));
    // };

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

    // const withPrivateUsers = bestVotedAssets?.map((item) => ({
    //     ...item,
    //     creator: item?.creator ?? PRIVATE_OWNER,
    // }));
    return (
        <div className="home-best-voted">
            <Container maxWidth="xl">
                <Box className="title-wrapper" mb={4} textAlign="center" marginBottom={'4em'}>
                    <Typography className="desktop-only" variant="h2">
                        Voted best creators & Collections
                    </Typography>
                    <Typography className="mobile-only text-white" variant="h2">
                        Voted Top
                    </Typography>
                    {/* <Box className="view-all">
                        <Link to="/marketplace" color="primary">
                            <Button onClick={redirectToMarketplace} className="view-all-btn">
                                View All
                            </Button>
                        </Link>
                    </Box> */}
                </Box>
                <Grid container spacing={3} className="list-with-link bg-blur-green">
                    <Grid xs={12} item={true}>
                        <Slider
                            options={{
                                slidesToShow: 5,
                                slidesToScroll: 5,
                                infinite: true,
                                arrows: false,
                                dots: true,
                            }}
                            hasArrow={false}
                        >
                            {FAKE_DATA?.map((item) => {
                                const pictureData = getPictureData(item?.asset);
                                return (
                                    <Grid item xs={12} key={item?.guid}>
                                        <Link
                                            className="w-100 h-100"
                                            to={`/asset/${item?.asset?.asset_id}`}
                                        >
                                            <Card
                                                className="h-100"
                                                style={{
                                                    cursor: 'pointer',
                                                    margin: '12px',
                                                }}
                                                onClick={(e) =>
                                                    clickOnCard(
                                                        e,
                                                        item?.asset?.is_nsfw,
                                                        item?.asset?.asset_id,
                                                    )
                                                }
                                            >
                                                <Box p={1.5} className="card-img-wrap">
                                                    <div
                                                        className={`card-img ${
                                                            item?.asset?.is_nsfw
                                                                ? 'card-img-blur'
                                                                : ''
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
                                                            icon={
                                                                <i
                                                                    className="icon-fire"
                                                                    style={{ fontSize: 16 }}
                                                                />
                                                            }
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
                                                            {item?.title}
                                                        </Box>
                                                        <Box
                                                            fontSize={16}
                                                            display="flex"
                                                            alignItems="center"
                                                        >
                                                            <Avatar
                                                                alt={item?.creator?.username}
                                                                src={item?.creator?.avatar}
                                                                className={
                                                                    item?.creator?.username ===
                                                                    PRIVATE
                                                                        ? 'private_user_icon sm'
                                                                        : 'sm'
                                                                }
                                                            />
                                                            <Box
                                                                fontWeight="bold"
                                                                fontFamily="h1.fontFamily"
                                                                className="best-voted-username link primary ellipsis"
                                                                onClick={(e) =>
                                                                    redirectToProfile(
                                                                        e,
                                                                        item?.creator?.username,
                                                                    )
                                                                }
                                                            >
                                                                @{item?.creator?.username}
                                                            </Box>
                                                        </Box>
                                                    </div>

                                                    <Box
                                                        textAlign="right"
                                                        display="flex"
                                                        alignItems="center"
                                                        className={`best-voted-voting ${
                                                            item?.voted ? 'color-primary' : ''
                                                        }`}
                                                    >
                                                        {item?.voted ? (
                                                            <ThumbUp
                                                                style={{ fontSize: 24 }}
                                                                className="pointer hover-opacity"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    onUnUpvoted(
                                                                        item?.guid,
                                                                        item?.creator?.username,
                                                                    );
                                                                }}
                                                            />
                                                        ) : (
                                                            <ThumbUpOutlined
                                                                style={{ fontSize: 24 }}
                                                                className="pointer hover-opacity"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    onUpvoted(
                                                                        item?.guid,
                                                                        item?.creator?.username,
                                                                    );
                                                                }}
                                                            />
                                                        )}
                                                        <Box component="span" ml={1}>
                                                            {item?.vote_count}
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Link>
                                    </Grid>
                                );
                            })}
                        </Slider>
                    </Grid>
                </Grid>
            </Container>
            <ConfirmModal
                open={openNsfwModal}
                onClose={onCloseNsfwModal}
                onConfirm={redirectToAsset}
                info={REDIRECT_TO_ASSET}
            />
        </div>
    );
};

export default BestVoted;

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
