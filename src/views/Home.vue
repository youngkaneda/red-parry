<template>
    <div>
        <div class="md-layout md-gutter md-alignment-center-left" style="padding: 0.5% 0 0.5% 0; background-color: black">
            <div class="md-layout-item md-size-15" style="display: flex; align-content: center !important;">
                <span class="md-title"
                    @click="() => { $router.push('/') }"
                    style="cursor: pointer; margin: 5px 7px 0 20px;"
                >
                    Red Parry
                </span>
                <md-button class="md-icon-button" size="sm">
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
};
</script>

<style scoped></style>
