import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { db } from './firebase';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        cast: [
            'Any', 'Alex', 'Sean', 'Ibuki', 'Necro', 'Urien', 'Gouki', 'Yun', 'Remy', 'Q',
            'Chun-Li', 'Makoto', '12', 'Yang', 'Ken', 'Hugo', 'Elena', 'Dudley', 'Oro', 'Ryu',
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
