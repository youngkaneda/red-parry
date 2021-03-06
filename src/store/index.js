import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { db } from './firebase';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        cast: [
            'any', 'alex', 'sean', 'ibuki', 'necro', 'urien', 'gouki', 'yun', 'remy', 'q',
            'chunli', 'makoto', '12', 'yang', 'ken', 'hugo', 'elena', 'dudley', 'oro', 'ryu',
        ],
        records: [],
        edit: null,
    },
    mutations: {
        records(state, records) {
            state.records = records;
        },
        record(state, record) {
            db.collection('records').add(record);
        },
        updateRecord(state, record) {
            db.collection('records').doc(record.id).set(record);
        },
        removeRecord(state, docId) {
            db.collection('records').doc(docId).delete();
        },
        edit(state, obj) {
            state.edit = obj;
        },
    },
    modules: {
    },
});
