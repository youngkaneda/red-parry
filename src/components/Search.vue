<template>
    <div style="padding-top: 1%">
        <div class="md-layout md-gutter md-alignment-top-center">
            <md-menu md-direction="bottom-start">
                <img :src="getCastImage(p1.char)" alt="" srcset="" md-menu-trigger style="margin-left: 10px">
                <md-menu-content>
                    <md-menu-item v-for="(char, i) in cast" :key="i" @click="p1.char = char; filter()">
                        <div>
                            <img :src="getCastImage(char)" alt="" srcset="">
                            <span style="text-align: left; margin-left: 10px">{{ char }}</span>
                        </div>
                    </md-menu-item>
                </md-menu-content>
            </md-menu>
            <md-field class="md-layout-item md-size-35" style="margin-left: 0.4%; padding-left: 0">
                <label>P1 Name</label>
                <md-input v-model="p1.name" @keyup="filter()"></md-input>
            </md-field>
        </div>
        <div class="md-layout md-gutter md-alignment-top-center">
            <md-menu md-direction="bottom-start">
                <img :src="getCastImage(p2.char)" alt="" srcset="" md-menu-trigger style="margin-left: 10px">
                <md-menu-content>
                    <md-menu-item v-for="(char, i) in cast" :key="i" @click="p2.char = char; filter()">
                        <div>
                            <img :src="getCastImage(char)" alt="" srcset="">
                            <span style="text-align: left; margin-left: 10px">{{ char }}</span>
                        </div>
                    </md-menu-item>
                </md-menu-content>
            </md-menu>
            <md-field class="md-layout-item md-size-35" style="margin-left: 0.4%; padding-left: 0">
                <label>P2 Name</label>
                <md-input v-model="p2.name" @keyup="filter()"></md-input>
            </md-field>
        </div>
        <div class="md-layout md-gutter md-alignment-center-center">
            <md-field class="md-layout-item md-size-40" style="padding-left: 0%">
                <label>Channel</label>
                <md-input v-model="channel" @keyup="filter()"></md-input>
            </md-field>
        </div>
        <div class="md-layout md-gutter md-alignment-center-center">
            <md-field class="md-layout-item md-size-40" style="padding-left: 0%">
                <label>Title</label>
                <md-input v-model="title" @keyup="filter()"></md-input>
            </md-field>
        </div>
        <div class="md-layout md-gutter md-alignment-center-center"
            v-for="(record, i) in filteredRecords.slice(this.offset, this.offset + 5)" :key="i"
            style="margin-top: 1%">
            <div class="md-layout-item md-size-40"
                style="padding: 0; margin-bottom: 20px"
            >
                <div class="md-layout md-gutter" style="margin-bottom: 5px">
                    <div class="md-layout-item md-size-80" style="display: inline; float: left">
                        <span class="md-title link" @click="openUrl(record.url)" style="cursor: pointer">{{ record.title }}</span>
                        <br>
                        <span class="md-subheading link" @click="openUrl(record.channel.url)" style="cursor: pointer">{{ record.channel.name }}</span>
                    </div>
                    <div class="md-layout-item md-size-20" style="display: inline">
                        <div style="float: right" @click="editRecord(record)">
                            <md-icon class="md-size-2x" style="cursor: pointer">edit</md-icon>
                        </div>
                    </div>
                </div>
                <div class="md-layout-item"
                    style="padding: 10px 0 10px 0; border-bottom: 1px solid lightgray"
                    v-for="(match, i) in record.matches" :key="i"
                >
                    <div class="md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-35" style="padding-right: 0;">
                            <span class="md-subheading table-span text" style="float: right">{{ match.p1.name }}</span>
                        </div>
                        <div class="md-layout-item md-size-30" style="padding: 0; text-align: center;">
                            <img :src="getCastImage(match.p1.char)" alt="">
                            <span class="md-subheading table-span">VS</span>
                            <img :src="getCastImage(match.p2.char)" alt="">
                        </div>
                        <div class="md-layout-item md-size-25" style="padding-left: 0">
                            <span class="md-subheading table-span text" style="float: left;">{{ match.p2.name }}</span>
                        </div>
                        <div @click="openUrl(match.timestamp)" class="md-layout-item md-size-10">
                            <md-icon class="md-size-2x" style="cursor: pointer; float: right">play_circle_fill</md-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-layout md-gutter md-alignment-center-center" style="margin-bottom: 1%">
            <Pagination :total="records.length" :reason="pagination.reason" :size="pagination.size" @pageChanged="updateDataTable"/>
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
        filteredRecords: [],
    }),
    computed: {
        cast() {
            return this.$store.state.cast;
        },
        records() {
            return this.$store.state.records;
        }
    },
    created() {
        this.$store.commit('toEdit', null);
        this.filteredRecords = this.records;
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
            this.$store.commit('toEdit', record);
            this.$router.push({ name: 'edit' });
        },
        filter() {
            let records = this.deepCopyFunction(
                this.records.filter((record) => {
                    const channel = this.channel ? record.channel.name === this.channel : true;
                    const title = this.title ? record.title === this.title : true;
                    return channel && title;
                })
            );
            records.forEach((record) => {
                record.matches = record.matches.filter((match) => {
                    const p1Char = this.p1.char === 'any' ? true : match.p1.char === this.p1.char;
                    const p2Char = this.p2.char === 'any' ? true : match.p2.char === this.p2.char;
                    const p1Name = this.p1.name ? match.p1.name === this.p1.name : true;
                    const p2Name = this.p2.name ? match.p2.name === this.p2.name : true;
                    return p1Char && p2Char && p1Name && p2Name;
                });
            });
            console.log(this.records);
            this.filteredRecords = records;
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
