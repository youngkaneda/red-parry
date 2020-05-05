import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        cast: [
            'any', 'alex', 'sean', 'ibuki', 'necro', 'urien', 'gouki', 'yun', 'remy', 'q',
            'chunli', 'makoto', '12', 'yang', 'ken', 'hugo', 'elena', 'dudley', 'oro', 'ryu',
        ],
        toEdit: null,
        records: [
            {
                id: '0',
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
            {
                id: '1',
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
        record(state, record) {
            state.records.splice(0, 0, record);
        },
        toEdit(state, record) {
            state.toEdit = record;
        },
        updateRecord(state, record) {
            let index = null;
            state.records.forEach((el, i) => {
                if (el.id === record.id) {
                    index = i;
                }
            });
            state.records.splice(index, 1, record);
        },
        removeRecord(state, record) {
            const index = state.records.indexOf(record);
            state.records.splice(index, 1);
        },
    },
    actions: {
    },
    modules: {
    },
});
