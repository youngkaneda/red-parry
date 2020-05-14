<template>
    <div>
        <div class="md-layout md-gutter md-alignment-center-left" style="padding: 0.5% 0 0.5% 0; background-color: black;">
            <div class="md-layout-item md-size-10" style="padding: 0 0 0 1.5%">
                <img src="../assets/rpw.png" alt="" @click="() => { $router.push('/') }" style="cursor: pointer">
            </div>
            <div class="md-layout-item md-size-10" style="display: flex; align-content: center !important; padding-left:0">
                <md-button class="md-icon-button" style="margin-top: 1%" size="sm" @click="() => $router.push('/edit')">
                    <md-icon>add</md-icon>
                </md-button>
            </div>
        </div>
        <div>
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    computed: {
        cast() {
            return this.$store.state.cast;
        },
    },
    methods: {
        getCastImage(char) {
            if (this.cast.indexOf(char) === -1) {
                return null;
            }
            return require('../assets/cast/' + char + '.gif');
        },
    }
};
</script>

<style scoped></style>
