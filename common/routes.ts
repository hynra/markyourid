const routes = [
    {
        title: 'NFT',
        subNav: [
            {
                title: 'Home',
                itemId: '/',
                isGitHubEditDisabled: true,
            },
            {
                title: 'My NFTs',
                itemId: '/dashboard',
            },
            {
                title: 'Create NFT',
                itemId: '/create',
            },
            {
                title: 'View on Rarible',
                itemId: '/rari',
            },
        ],
    },
    {
        title: 'Guides',
        subNav: [
            {
                title: 'How it works',
                itemId: '/hiw',
            },
            {
                title: 'FAQ',
                itemId: '/faq',
            },
            {
                title: 'About',
                itemId: '/about',
            },
        ],
    },
    {
        title: 'Feedback',
        itemId: '/feedback',
    },
];

export default routes;
