import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cast: [
            'any', 'alex', 'sean', 'ibuki', 'necro', 'urien', 'gouki', 'yun', 'remy', 'q',
            'chunli', 'makoto', '12', 'yang', 'ken', 'hugo', 'elena', 'dudley', 'oro', 'ryu',
        ],
        records: [
            {
                id: 'hash',
                url: 'https://www.youtube.com/watch?v=0yQTivQbIWM&feature=youtu.be',
                title: 'Zabi (GO) vs. Various',
                channel: {
                    name: '3rd STRIKE',
                    url: 'https://www.youtube.com/channel/UCcpPdn-PzGeQodVc8STGtwA',
                },
                date: 'May 2, 2020',
                matches: [
                    {
                        p1: {
                            char: 'gouki',
                            name: 'zabi',
                        },
                        p2: {
                            char: 'dudley',
                            name: 'fujiwara',
                        },
                        timestamp: 'https://youtu.be/0yQTivQbIWM?t=7',
                    },
                    {
                        p1: {
                            char: 'gouki',
                            name: 'zabi',
                        },
                        p2: {
                            char: 'hugo',
                            name: 'hayao',
                        },
                        timestamp: 'https://youtu.be/0yQTivQbIWM?t=7',
                    },
                ],
            },
        ],
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    },
});
