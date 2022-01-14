const routes = [
    {
        title: 'MarkYourID',
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
        title: 'Feedback',
        itemId: '/feedback',
    },
];

export default routes;
