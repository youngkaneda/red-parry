<template>
    <div style="padding-top: 1%" class="md-layout md-gutter md-alignment-top-center">
        <div class="md-layout-item md-size-45">
            <div class="md-layout md-gutter md-alignment-top-center">
                <div class="md-layout-item md-size-10" style="margin-top: 1.5%; padding-left: 0">
                    <md-menu md-direction="bottom-start" class="md-layout-item md-size-95">
                        <img :src="getCastImage(p1.char)" alt="" srcset="" md-menu-trigger>
                        <md-menu-content>
                            <md-menu-item v-for="(char, i) in cast" :key="i" @click="p1.char = char; filter()">
                                <div class="md-layout-item md-size-35">
                                    <img :src="getCastImage(char)" alt="" srcset="">
                                    <span style="text-align: left; margin-left: 10px">{{ char }}</span>
                                </div>
                            </md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </div>
                <md-field class="md-layout-item md-size-85" style="padding-left: 0%">
                    <label>P1 Name</label>
                    <md-input v-model="p1.name" @keyup="filter()"></md-input>
                </md-field>
            </div>
            <div class="md-layout md-gutter md-alignment-top-center">
                <div class="md-layout-item md-size-10" style="margin-top: 1.5%; padding-left: 0">
                    <md-menu md-direction="bottom-start" class="md-layout-item md-size-95">
                        <img :src="getCastImage(p2.char)" alt="" srcset="" md-menu-trigger>
                        <md-menu-content>
                            <md-menu-item v-for="(char, i) in cast" :key="i" @click="p2.char = char; filter()">
                                <div class="md-layout-item md-size-35">
                                    <img :src="getCastImage(char)" alt="" srcset="">
                                    <span style="text-align: left; margin-left: 10px">{{ char }}</span>
                                </div>
                            </md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </div>
                <md-field class="md-layout-item md-size-85" style="padding-left: 0%">
                    <label>P2 Name</label>
                    <md-input v-model="p2.name" @keyup="filter()"></md-input>
                </md-field>
            </div>
            <div class="md-layout md-gutter md-alignment-center-center">
                <md-field class="md-layout-item md-size-95" style="padding-left: 0%">
                    <label>Channel</label>
                    <md-input v-model="channel" @keyup="filter()"></md-input>
                </md-field>
            </div>
            <div class="md-layout md-gutter md-alignment-center-center">
                <md-field class="md-layout-item md-size-95" style="padding-left: 0%">
                    <label>Title</label>
                    <md-input v-model="title" @keyup="filter()"></md-input>
                </md-field>
            </div>
            <div class="md-layout md-gutter md-alignment-center-center"
                style="margin-top: 1%"
            >
                <div class="md-layout-item md-size-95" v-for="(record, i) in records.filter(filters.video).slice(this.offset, this.offset + 5)" :key="i">
                    <div class="md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-80" style="display: inline; float: left; padding: 0">
                            <span class="md-body-2 link" @click="openUrl(record.url)" style="cursor: pointer">{{ record.title }}</span>
                            <br>
                            <span class="md-body-1 link" @click="openUrl(record.channel.url)" style="cursor: pointer">{{ record.channel.name }}</span>
                        </div>
                        <div class="md-layout-item md-size-20" style="display: inline; padding: 0">
                            <div style="float: right" @click="editRecord(record)">
                                <md-icon class="md-size-1x" style="cursor: pointer">edit</md-icon>
                            </div>
                        </div>
                    </div>
                    <div class="md-layout md-gutter md-alignment-center-center"
                        v-for="(match, i) in record.matches.filter(filters.match)" :key="i"
                        style="padding-bottom: 1%; border-bottom: 1px solid gray; margin-bottom: 1%"
                    >
                        <div class="md-layout-item md-size-35" style="padding-right: 0;">
                            <span class="md-body-2 table-span text" style="float: right">{{ match.p1.name }}</span>
                        </div>
                        <div class="md-layout-item md-size-10" style="padding-right: 0">
                            <img :src="getCastImage(match.p1.char)" alt="">
                        </div>
                        <div class="md-layout-item md-size-10" style="padding: 0; text-align: center;">
                            <span class="md-body-2 table-span">VS</span>
                        </div>
                        <div class="md-layout-item md-size-10" style="padding-left: 0">
                            <img :src="getCastImage(match.p2.char)" alt="">
                        </div>
                        <div class="md-layout-item md-size-30" style="padding-left: 0">
                            <span class="md-body-2 table-span text" style="float: left;">{{ match.p2.name }}</span>
                        </div>
                        <div @click="openUrl(match.timestamp)" class="md-layout-item md-size-5" style="padding: 0">
                            <md-icon class="md-size-1x" style="cursor: pointer; float: right">play_circle_fill</md-icon>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md-layout md-gutter md-alignment-center-center" style="margin-bottom: 1%">
                <Pagination :total="records.length" :reason="pagination.reason" :size="pagination.size" @pageChanged="updateDataTable"/>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from './Pagination';
import Vue from 'vue';

export default {
    components: {
        Pagination,
    },
    data: () => ({
        test: false,
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
            size: 5,
        },
        filters: {
            video: () => true,
            match: () => true,
        },
    }),
    computed: {
        cast() {
            return this.$store.state.cast;
        },
        records() {
            let records = this.$store.state.records;
            records.sort((a, b) => new Date(a.createdAt.seconds).getTime() < new Date(b.createdAt.seconds).getTime() ? 1 : -1);
            return records;
        }
    },
    mounted() {
        localStorage.removeItem('edit');
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
        },
        editRecord(record) {
            localStorage.setItem('edit', JSON.stringify(record));
            setTimeout(() => {
                this.$router.push({ name: 'edit' });
            }, 500);
        },
        filter() {
            this.filters.video = (record) => {
                const channel = this.channel ? record.channel.name === this.channel : true;
                const title = this.title ? record.title === this.title : true;
                return channel && title;
            }
            this.filters.match = (match) => {
                const p1Char = this.p1.char === 'any' ? true : match.p1.char === this.p1.char;
                const p2Char = this.p2.char === 'any' ? true : match.p2.char === this.p2.char;
                const p1Name = this.p1.name ? match.p1.name === this.p1.name : true;
                const p2Name = this.p2.name ? match.p2.name === this.p2.name : true;
                return p1Char && p2Char && p1Name && p2Name;
            }
        },
        deepCopyFunction(inObject) {
            let outObject, value, key;
            if (typeof inObject !== "object" || inObject === null) {
                return inObject;
            }
            outObject = Array.isArray(inObject) ? [] : {};
            for (key in inObject) {
                value = inObject[key];
                outObject[key] = this.deepCopyFunction(value);
            }
            return outObject;
        },
    }
}
</script>

<style scoped>
[v-cloak] {
  display: none;
}

.table-span {
    padding: 0 10px 0 10px !important;
}
.text {
    text-overflow: ellipsis;
    overflow:hidden;
    white-space:nowrap;
    max-width: 200px;
}
.link:hover {
    color: #797979;
}
</style>
