<template>
    <div style="padding-top: 1%">
        <div class="md-layout md-gutter md-alignment-top-center">
            <md-menu md-direction="bottom-start" class="md-layout-item md-size-5">
                <img :src="getCastImage(p1.char)" alt="" srcset="" md-menu-trigger>
                <md-menu-content>
                    <md-menu-item v-for="(char, i) in cast" :key="i" @click="() => { p1.char = char }">
                        <div>
                            <img :src="getCastImage(char)" alt="" srcset="">
                            <span style="text-align: left; margin-left: 10px">{{ char }}</span>
                        </div>
                    </md-menu-item>
                </md-menu-content>
            </md-menu>
            <md-field class="md-layout-item md-size-35" style="padding-left: 0%">
                <label>P1 Name</label>
                <md-input v-model="p1.name"></md-input>
            </md-field>
        </div>
        <div class="md-layout md-gutter md-alignment-top-center">
            <md-menu md-direction="bottom-start" class="md-layout-item md-size-5">
                <img :src="getCastImage(p2.char)" alt="" srcset="" md-menu-trigger>
                <md-menu-content>
                    <md-menu-item v-for="(char, i) in cast" :key="i" @click="() => { p2.char = char }">
                        <div>
                            <img :src="getCastImage(char)" alt="" srcset="">
                            <span style="text-align: left; margin-left: 10px">{{ char }}</span>
                        </div>
                    </md-menu-item>
                </md-menu-content>
            </md-menu>
            <md-field class="md-layout-item md-size-35" style="padding-left: 0%">
                <label>P2 Name</label>
                <md-input v-model="p2.name"></md-input>
            </md-field>
        </div>
        <div class="md-layout md-gutter md-alignment-center-center">
            <md-field class="md-layout-item md-size-40" style="padding-left: 0%">
                <label>Channel</label>
                <md-input v-model="channel"></md-input>
            </md-field>
        </div>
        <div class="md-layout md-gutter md-alignment-center-center">
            <md-field class="md-layout-item md-size-40" style="padding-left: 0%">
                <label>Title</label>
                <md-input v-model="title"></md-input>
            </md-field>
        </div>
        <div class="md-layout md-gutter md-alignment-center-center" style="margin-top: 2%">
            <div class="md-layout-item md-size-40"
                style="padding: 0; margin-bottom: 20px"
                v-for="record in records.slice(this.offset, this.offset + 5)" :key="record.id"
            >
                <div class="md-layout md-gutter" style="margin-bottom: 10px">
                    <div class="md-layout-item md-size-40" style="display: inline; float: left">
                        <span class="md-title" @click="openUrl(record.url)" style="cursor: pointer">{{ record.title }}</span>
                        <br>
                        <span class="md-subheading" @click="openUrl(record.channel.url)" style="cursor: pointer">{{ record.channel.name }}</span>
                    </div>
                    <div class="md-layout-item md-size-60" style="display: inline">
                        <div @click="openUrl(match.timestamp)" style="float: right">
                            <md-icon class="md-size-2x" style="cursor: pointer">edit</md-icon>
                        </div>
                    </div>
                </div>
                <div class="md-layout-item"
                    style="padding: 10px 0 10px 0; border-bottom: 1px solid lightgray"
                    v-for="(match, i) in record.matches" :key="i"
                >
                    <span class="md-subheading table-span" style="margin-left: 33%">{{ match.p1.name }}</span>
                    <img :src="getCastImage(match.p1.char)" alt="">
                    <span class="md-subheading table-span">VS</span>
                    <img :src="getCastImage(match.p2.char)" alt="">
                    <span class="md-subheading table-span">{{ match.p2.name }}</span>
                    <div @click="openUrl(match.timestamp)" style="display: inline; float: right">
                        <md-icon class="md-size-2x" style="cursor: pointer">play_circle_fill</md-icon>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-layout md-gutter md-alignment-center-center">
            <Pagination :total="records.length" :reason="pagination.reason" :size="pagination.size" @pageChanged="updateDataTable"/>
        </div>
    </div>
</template>

<script>
import Pagination from './Pagination';

export default {
    components: {
        Pagination,
    },
    data: () => ({
        initial: "Initial Value",
        p1: {
            name: '',
            char: 'any',
        },
        p2: {
            name: '',
            char: 'any',
        },
        channel: '',
        title: '',
        offset: 0,
        pagination: {
            reason: 5,
            size: 3,
        }
    }),
    computed: {
        cast() {
            return this.$store.state.cast;
        },
        records() {
            return this.$store.state.records;
        }
    },
    mounted() {
    },
    methods: {
        openUrl(url) {
            window.open(url, '_blank');
        },
        getCastImage(char) {
            if (this.cast.indexOf(char) === -1) {
                return null;
            }
            return require('../assets/cast/' + char + '.gif');
        },
        updateDataTable(val) {
            this.offset = this.pagination.reason * val;
            console.log(this.offset);
        }
    }
}
</script>

<style scoped>
.table-span {
    padding: 0 10px 0 10px !important;
}
</style>
