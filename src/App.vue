<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { db } from './store/firebase';

export default {
    created() {
        db.collection('records').onSnapshot(snapshot => {
            let records = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id,
                }
            });
            this.$store.commit('records', records);
        });
    },
}
</script>

<style>
    /* #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    } */
</style>
