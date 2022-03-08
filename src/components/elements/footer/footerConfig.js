import {
    FacebookIcon,
    InstagramIcon,
    PintrestIcon,
    TwitterIcon,
    WhatsappIcon,
    YoutubeIcon,
} from '../../../assets/img';

export const FOOTER_MENU = [
    {
        title: 'MY PROFILE',
        list: [
            {
                label: 'Items',
                url: '/profile',
            },
            {
                label: 'Activity',
                url: '/marketplace?type=people',
            },
            {
                label: 'Search',
                url: '/marketplace?type=people',
            },
            {
                label: 'FAQs',
                url: '/marketplace?type=people',
            },
            {
                label: 'Help Center',
                url: '/marketplace?type=people',
            },
            {
                label: 'Report Content',
                url: '/marketplace?type=people',
            },
        ],
    },
    {
        title: 'Marketplace',
        list: [
            {
                label: 'Browse and Discover',
                slug: 'virtual-reality',
                url: '/marketplace',
            },
            {
                label: 'Recently Sold',
                slug: 'audio',
                url: '/marketplace',
            },
            {
                label: 'Biggest Sales',
                slug: 'graphic',
                url: '/marketplace',
            },
            {
                label: 'Ending Soon',
                slug: 'animation',
                url: '/marketplace',
            },
            {
                label: 'Most Viewed',
                slug: 'video',
                url: '/marketplace',
            },
            {
                label: 'Latest Updates',
                slug: 'video',
                url: '/marketplace',
            },
            {
                label: 'Community Guidelines',
                slug: 'video',
                url: '/marketplace',
            },
        ],
    },
    {
        title: 'Company',
        list: [
            {
                label: 'Email Us',
                url: '#',
            },
            {
                label: 'About',
                url: '#',
            },
            {
                label: 'Press',
                url: '#',
            },
            {
                label: 'Our Newsletter',
                url: '#',
            },
        ],
    },
    {
        title: 'Join',
        list: [
            {
                label: 'Join the Team',
                url: '#',
            },
            {
                label: 'Blog',
                url: '#',
            },
        ],
    },
];

export const SOCIAL_MENU = [
    {
        icon: <FacebookIcon className="facebook-social-link" />,
        url: 'http://facebook.com/Zestbloom',
    },
    {
        icon: <TwitterIcon />,
        url: 'https://twitter.com/zestbloom',
    },
    {
        icon: <InstagramIcon />,
        url: 'https://www.instagram.com/zestbloom.io/',
    },
    {
        icon: <YoutubeIcon />,
        url: 'https://www.youtube.com/channel/UCXfwJgQRly7ZPo0qNZjsWiw',
    },
    {
        icon: <WhatsappIcon />,
        url: 'https://discord.com/invite/jG3pSUPPMA',
    },
    {
        icon: <PintrestIcon className="pintrest-social-link" />,
        url: 'https://www.reddit.com/r/ZestBloom/',
    },
];
