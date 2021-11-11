<template>
<div>
    <div id="header" style="padding: 0.5% 0 0.5% 0; background-color: black; display: flex; align-items: start">
        <div style="padding: 0 0 0 1.5%;">
            <img src="../assets/rpw.png" alt="" @click="() => { $router.push('/') }" style="cursor: pointer; width: 127px !important">
        </div>
        <div style="align-content: center !important; padding-left:0">
            <md-button class="md-icon-button" style="margin-top: 1%" size="sm" @click="() => $router.push('/edit')">
                <md-icon>add</md-icon>
            </md-button>
        </div>
        <a href="https://twitter.com/youngkaneda" style="margin-left: auto; margin-right: 10px">
            <img src="../assets/twitter.webp" style="width: 40px !important"/>
        </a>
        <a href="" style="margin-right: 10px">
            <img src="../assets/bmc_small.png" style="width: 27px !important; filter: drop-shadow(0px 0px 4px white);"/>
        </a>
    </div>
    <div style="padding-top: 1%; display: flex; flex-direction: column;" class="root">
        <div class="content">
            <div style="display: flex;">
                <div style="margin-top: 1.5%; padding-left: 0; padding-right: 1%; width: 71px">
                    <md-menu md-direction="bottom-start">
                        <img :src="getCastImage(p1.char)" alt="" srcset="" md-menu-trigger>
                        <md-menu-content>
                            <md-menu-item v-for="(char, i) in cast" :key="i" @click="p1.char = char; filter()">
                                <div>
                                    <span style="text-align: left; margin-left: 10px">{{ char }}</span>
                                </div>
                            </md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </div>
                <div style="flex-grow: 1;">
                    <md-field style="padding-left: 0%">
                        <label>P1 Name</label>
                        <md-input v-model="p1.name" @keyup="filter()"></md-input>
                    </md-field>
                </div>
            </div>
            <div style="display: flex;">
                <div style="margin-top: 1.5%; padding-left: 0; padding-right: 1%; width: 71px">
                    <md-menu md-direction="bottom-start">
                        <img :src="getCastImage(p2.char)" alt="" srcset="" md-menu-trigger>
                        <md-menu-content>
                            <md-menu-item v-for="(char, i) in cast" :key="i" @click="p2.char = char; filter()">
                                <div>
                                    <span style="text-align: left; margin-left: 10px">{{ char }}</span>
                                </div>
                            </md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </div>
                <div style="flex-grow: 1;">
                    <md-field style="padding-left: 0%">
                        <label>P2 Name</label>
                        <md-input v-model="p2.name" @keyup="filter()"></md-input>
                    </md-field>
                </div>
            </div>
            <div style="flex-grow: 1;">
                <md-field style="padding-left: 0%">
                    <label>Channel</label>
                    <md-input v-model="channel" @keyup="filter()"></md-input>
                </md-field>
            </div>
            <div style="flex-grow: 1;">
                <md-field style="padding-left: 0%">
                    <label>Title</label>
                    <md-input v-model="title" @keyup="filter()"></md-input>
                </md-field>
            </div>
            <div style="margin-top: 1%">
                <div v-for="(record, i) in records.filter(filters.compose(filters.video, filters.hasMatches(filters.match))).slice(this.offset, this.offset + 5)"
                    :key="i"
                >
                    <div style="display: flex;">
                        <div style="padding: 0; flex-grow: 0">
                            <span class="md-body-2 link" @click="openUrl(record.url)" style="cursor: pointer">{{ record.title }}</span>
                            <br>
                            <span class="md-body-1 link" @click="openUrl(record.channel.url)" style="cursor: pointer">{{ record.channel.name }}</span>
                        </div>
                        <div style="padding: 0; flex-grow: 0; align-self: start; margin-left: auto">
                            <div style="display: flex;">
                                <div @click="show(record)" :class="jenkinsOneAtATimeHash(record.title) + 'up_' + i">
                                    <md-icon class="md-size-1x" style="cursor: pointer; margin-left: 10px">arrow_upward</md-icon>
                                </div>
                                <div @click="show(record)" :class="[jenkinsOneAtATimeHash(record.title) + 'down_' + i, 'none']">
                                    <md-icon class="md-size-1x" style="cursor: pointer; margin-left: 10px">arrow_downward</md-icon>
                                </div>
                                <div @click="editRecord(record)">
                                    <md-icon class="md-size-1x" style="cursor: pointer; margin-left: 10px">edit</md-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-for="(match, i) in record.matches.filter(filters.match)" :key="i"
                        style="padding-bottom: 1%; border-bottom: 1px solid gray; margin-bottom: 1%; align-items: flex-start; display: flex;"
                        :class="jenkinsOneAtATimeHash(record.title) + '_' + i"
                    >
                        <div style="width: 50%">
                            <div style="display: flex; align-items: center; justify-content: flex-end">
                                <span class="pname" style="padding: 0 10px 0 0">{{ match.p1.name }}</span>
                                <img class="pimage" :src="getCastImage(match.p1.char)" alt="">
                            </div>
                        </div>
                        <div style="align-self: center">
                            <span style="padding: 0 10px 0 10px">VS</span>
                        </div>
                        <div style="width: 45%">
                            <div style="display: flex; align-items: center; justify-content: flex-start">
                                <img class="pimage" :src="getCastImage(match.p2.char)" alt="">
                                <span class="pname" style="padding: 0 0 0 10px">{{ match.p2.name }}</span>
                            </div>
                        </div>
                        <div @click="openUrl(match.timestamp)" style="align-self: center">
                            <md-icon class="md-size-1x" style="cursor: pointer; padding-left: 10px">play_circle_fill</md-icon>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-bottom: 1%; display: flex; align-items: center; justify-content: center;">
                <Pagination :total="records.filter(filters.video).filter(filters.hasMatches(filters.match)).length"
                    :reason="pagination.reason" :size="pagination.size" @pageChanged="updateDataTable"
                />
            </div>
        </div>
    </div>
</div>    
</template>

<script>
import Pagination from './Pagination';
import Vue from 'vue';
import $ from 'jquery';

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
            reason: 3,
            size: 3,
        },
        filters: {
            video: () => true,
            match: () => true,
            hasMatches: (filter) => (record) => record.matches.filter(filter).length > 0,
            compose: (...filters) => (element) => {
                let partial = true;
                filters.forEach(filter => {
                    partial = partial && filter(element);
                })
                return partial;
            },
        },
    }),
    computed: {
        cast() {
            let cast = this.deepCopy(this.$store.state.cast);
            cast.splice(cast.indexOf('any'), 1);
            cast.sort();
            cast.splice(0, 0, 'any');
            return cast;
        },
        records() {
            let records = this.$store.state.records;
            records.sort((a, b) => new Date(a.createdAt.seconds).getTime() < new Date(b.createdAt.seconds).getTime() ? 1 : -1);
            return records;
        },
    },
    mounted() {
        localStorage.removeItem('edit');
        localStorage.removeItem('temp_url')
        this.$store.commit('edit', null);
    },
    methods: {
        jenkinsOneAtATimeHash(keyString) {
            let hash = 0;
            for (let charIndex = 0; charIndex < keyString.length; ++charIndex) {
                hash += keyString.charCodeAt(charIndex);
                hash += hash << 10;
                hash ^= hash >> 6;
            }
            hash += hash << 3;
            hash ^= hash >> 11;
            //4,294,967,295 is FFFFFFFF, the maximum 32 bit unsigned integer value, used here as a mask.
            return (((hash + (hash << 15)) & 4294967295) >>> 0).toString(16)
        },
        show(record) {
            if (record.visible === undefined) {
                record.visible = true;
            }
            let selector = $(`[class^=${this.jenkinsOneAtATimeHash(record.title)}_]`);
            selector.toggle();
            selector = $(`[class^=${this.jenkinsOneAtATimeHash(record.title)}up_]`);
            selector.toggle();
            selector = $(`[class^=${this.jenkinsOneAtATimeHash(record.title)}down_]`);
            selector.toggleClass('none');
            record.visible = !record.visible;
        },
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
            this.$router.push({ name: 'edit', params: { edit: record } });
        },
        filter() {
            this.filters.video = (record) => {
                const channel = this.channel ? record.channel.name.toLowerCase().includes(this.channel.toLowerCase()) : true;
                const title = this.title ? record.title.toLowerCase().includes(this.title.toLowerCase()) : true;
                return channel && title;
            }
            this.filters.match = (match) => {
                const p1Char = this.p1.char === 'any' ? true : match.p1.char === this.p1.char;
                const p2Char = this.p2.char === 'any' ? true : match.p2.char === this.p2.char;
                const p1Name = this.p1.name ? match.p1.name.toLowerCase().includes(this.p1.name.toLowerCase()) : true;
                const p2Name = this.p2.name ? match.p2.name.toLowerCase().includes(this.p2.name.toLowerCase()) : true;
                return p1Char && p2Char && p1Name && p2Name;
            }
        },
        deepCopy(inObject) {
            let outObject, value, key;
            if (typeof inObject !== "object" || inObject === null) {
                return inObject;
            }
            outObject = Array.isArray(inObject) ? [] : {};
            for (key in inObject) {
                value = inObject[key];
                outObject[key] = this.deepCopy(value);
            }
            return outObject;
        },
    },
}
</script>

<style scoped>
.none {
    display: none;
}
.content {
    width: 45%;
    align-self: center;
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

.pname {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.pimage { }

@media (max-width: 758px) {
    .content {
        width: 80%;
    }
}

@media (max-width: 410px) {
    .pimage {
        display: none;
    }
}

@media (max-width: 359px) {
    .root, #header {
        width: 359px !important;
    }
    .content {
        width: 287px !important;
    }
}
</style>
