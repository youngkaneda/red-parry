<template>
<div>
    <div id="header" style="padding: 0.5% 0 0.5% 0; background-color: black; display: flex">
        <div style="padding: 0 0 0 1.5%;">
            <img src="../assets/rpw.png" alt="" @click="() => { $router.push('/') }" style="cursor: pointer; width: 127px !important">
        </div>
        <a href="https://twitter.com/youngkaneda" style="margin-left: auto; margin-right: 10px">
            <img src="../assets/twitter.webp" style="width: 40px !important"/>
        </a>
        <a href="" style="margin-right: 10px">
            <img src="../assets/bmc_small.png" style="width: 27px !important; filter: drop-shadow(0px 0px 4px white);"/>
        </a>
    </div>
    <div style="padding-top: 1%; display: flex; flex-direction: column" class="root">
        <div class="content">
            <div v-if="authorized" style="display: flex; flex-direction: column">
                <md-button style="margin-top: 5%; align-self: center" @click="redirectToAuth()">
                    <md-icon>verified_user</md-icon> SIGN IN WITH GOOGLE
                </md-button>
            </div>
            <div v-else style="margin-top: 3%;">
                <div>
                    <md-field style="padding-left: 0%; ">
                        <label>Video URL</label>
                        <md-input v-model="videoURL" @change="search()"></md-input>
                    </md-field>
                </div>
                <div v-if="videoInfo">
                    <div>
                        <md-field style="padding-left: 0%">
                            <label>Title</label>
                            <md-input v-model="videoInfo.snippet.title" disabled></md-input>
                        </md-field>
                    </div>
                    <div>
                        <md-field style="padding-left: 0%">
                            <label>Channel</label>
                            <md-input v-model="videoInfo.snippet.channelTitle" disabled></md-input>
                        </md-field>
                    </div>
                    <div>
                        <md-field style="padding-left: 0%">
                            <label>date</label>
                            <md-icon>calendar_today</md-icon>
                            <md-input v-model="this.videoInfo.snippet.publishedAt" disabled></md-input>
                        </md-field>
                    </div>
                    <div>
                        <div style="padding: 0">
                            <div v-for="(match, i) in matches" :key="i" class="match">
                                <div class="ts">
                                    <md-field style="padding-left: 0%; margin-right: 2%;">
                                        <label>timestamp URL</label>
                                        <md-input v-model="match.timestamp"></md-input>
                                    </md-field>
                                </div>
                                <div style="display: flex; align-items: start;">
                                    <md-field class="p1">
                                        <label>Player1</label>
                                        <md-input v-model="match.p1.name"></md-input>
                                    </md-field>
                                    <div style="margin-top: 1%; padding-right: 0; width: 71px !important">
                                        <md-menu md-direction="bottom-start">
                                            <img :src="getCastImage(match.p1.char)" alt="" srcset="" md-menu-trigger>
                                            <md-menu-content>
                                                <md-menu-item v-for="(char, i) in cast" :key="i" @click="() => { match.p1.char = char }">
                                                    <div>
                                                        <span style="text-align: left; margin-left: 10px">{{ char }}</span>
                                                    </div>
                                                </md-menu-item>
                                            </md-menu-content>
                                        </md-menu>
                                    </div>
                                    <div style="align-self: center">
                                        <span style="margin-top: 2%">VS</span>
                                    </div>
                                    <div style="margin-top: 1%; padding-left: 1%; flex-grow: 0; width: 71px !important">
                                        <md-menu md-direction="bottom-start">
                                            <img :src="getCastImage(match.p2.char)" alt="" srcset="" md-menu-trigger>
                                            <md-menu-content>
                                                <md-menu-item v-for="(char, i) in cast" :key="i" @click="() => { match.p2.char = char }">
                                                    <div>
                                                        <span style="text-align: left; margin-left: 10px">{{ char }}</span>
                                                    </div>
                                                </md-menu-item>
                                            </md-menu-content>
                                        </md-menu>
                                    </div>
                                    <md-field class="p2">
                                        <label>Player2</label>
                                        <md-input v-model="match.p2.name"></md-input>
                                    </md-field>
                                    <div style="margin-top: 0.7%; align-self: center; margin-left: auto">
                                        <md-button style="margin-left: auto" class="md-icon-button" size="sm" @click="duplicate(i)">
                                            <md-icon>file_copy</md-icon>
                                        </md-button>
                                        <md-button class="md-icon-button" size="sm" @click="swapPlayers(i)">
                                            <md-icon>swap_horiz</md-icon>
                                        </md-button>
                                        <md-button class="md-icon-button" size="sm" @click="removeMatch(i)" style="margin-right: 0 !important">
                                            <md-icon>delete</md-icon>
                                        </md-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style="padding: 0; margin-bottom: 1%">
                            <md-button class="md-raised" style="margin: 0 1% 0 0" @click="addMatch()">
                                <md-icon>playlist_add</md-icon>
                                ADD MATCH
                            </md-button>
                            <md-button type="submit" class="md-raised" style="margin: 0 1% 0 0" @click="save()">
                                <md-icon>save</md-icon>
                                SAVE
                            </md-button>
                            <md-button type="submit" class="md-raised" style="margin: 0 1% 0 0" @click="remove()">
                                <md-icon>delete</md-icon>
                                DELETE
                            </md-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import props from '../../props';
import security from '../security';

export default {
    data() {
        return {
            videoURL: '',
            videoInfo: null,
            matches: [],
            authorized: false,
        };
    },
    computed: {
        cast() {
            let cast = this.deepCopy(this.$store.state.cast);
            cast.splice(cast.indexOf('Any'), 1);
            cast.sort();
            cast.splice(0, 0, 'Any');
            return cast;
        },
        recordsURL() {
            return this.$store.state.records.map(el => el.url);
        },
        edit() {
            return this.$store.state.edit;
        },
    },
    watch: {
        videoURL(val) {
            if (!val) {
                this.videoURL = '';
                this.videoInfo = null;
                this.matches = [];
            }
        }
    },
    created() {
        if (this.$route.params.edit) {
            this.$store.commit('edit', this.$route.params.edit);
            localStorage.setItem('edit', JSON.stringify(this.$route.params.edit));
        }
    },
    mounted() {
        this.authorized = !localStorage.getItem('g_auth');
        if (this.edit) {
            let record = this.edit;
            this.videoURL = record.url;
            this.search();
            this.matches = this.deepCopy(record.matches);
        }else if (localStorage.getItem('temp_url')) {
            this.videoURL = localStorage.getItem('temp_url');
            this.search();
        }
    },
    methods: {
        openSnackbar(message) {
            this.snackbar.show = true;
            this.snackbar.message = message;
        },
        getCastImage(char) {
            if (this.cast.indexOf(char) === -1) {
                return null;
            }
            return require('../assets/cast/' + char + '.gif');
        },
        redirectToAuth() {
            const url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
                `client_id=${props.clientId}&` +
                'response_type=code&' +
                `scope=${props.scopes}&` +
                `redirect_uri=${props.redirectURI}&` +
                'access_type=offline'
            setTimeout(() => {
                window.location.replace(url);
            }, 100);
        },
        search() {
            if (this.videoURL.length <= 0) {
                return;
            }
            if (!localStorage.getItem('g_auth')) {
                return ;
            }
            let regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
            if (this.videoURL ? !this.videoURL.match(regex) : false) {
                this.videoURL = '';
                this.videoInfo = null;
                this.$toast.error('Invalid URL.');
                return;
            }
            if (this.recordsURL.indexOf(this.videoURL) !== -1 && !this.edit) {
                this.$toast.warning('This video has already been saved.');
                return;
            }
            const id = this.videoURL.split('?v=')[1];
            localStorage.setItem('temp_url', this.videoURL);
            axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${props.apiKey}`, {
                headers: {
                    Authorization: 'Bearer ' + security.decrypt(
                        localStorage.getItem('g_auth') ? localStorage.getItem('g_auth') : {}
                    ).access_token,
                    Accept: 'application/json',
                }
            }).then((response) => {
                this.videoInfo = response.data.items[0];
                this.videoInfo.snippet.publishedAt = moment(this.videoInfo.snippet.publishedAt).format('DD/MM/YYYY');
                localStorage.removeItem('temp_url');
            }).catch((response) => {
                // auth again i guess, refresh token was the thing that intended to make we doen't need to worry with this.
                const url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
                `client_id=${props.clientId}&` +
                'response_type=code&' +
                `scope=${props.scopes}&` +
                `redirect_uri=${props.redirectURI}&` +
                'access_type=online'
                window.location.replace(url);
            });
        },
        save() {
            if (this.matches.length === 0) {
                this.$toast.error('Add at least one match.');
                return;
            }
            this.matches.forEach((match) => {
                match.p1.name = match.p1.name ? match.p1.name : 'Unknow Player';
                match.p2.name = match.p2.name ? match.p2.name : 'Unknow Player';
                match.timestamp = match.timestamp ? match.timestamp : this.videoURL;
            });
            // save in firestore.
            let record = {};
            if (this.edit) {
                record = this.edit;
                record.matches = this.matches;
                this.$store.commit('updateRecord', record);
                this.$store.commit('edit', null);
                // clear page
                this.$toast.success('Record updated successfully.');
                this.clear();
                return;
            }
            record.createdAt = new Date();
            record.matches = this.matches;
            record.url = this.videoURL;
            record.date = this.videoInfo.snippet.publishedAt;
            record.title = this.videoInfo.snippet.title;
            record.channel = {
                name: this.videoInfo.snippet.channelTitle,
                url: 'https://www.youtube.com/channel/' + this.videoInfo.snippet.channelId,
            }
            this.$store.commit('record', record);
            // clear page
            this.$toast.success('Record saved successfully.');
            this.clear();
        },
        remove() {
            if (this.edit) {
                this.$store.commit('removeRecord', this.edit.id);
                this.$store.commit('edit', null);
            }
            this.$toast.success('Record removed successfully.');
            this.clear();
        },
        clear() {
            this.videoURL = '';
            this.videoInfo = null;
            this.matches = [];
        },
        addMatch() {
            this.matches.push({
                p1: {
                    char: 'Any',
                    name: '',
                },
                p2: {
                    char: 'Any',
                    name: '',
                },
                timestamp: '',
            },);
        },
        duplicate(index) {
            let match = {...this.matches[index]};
            this.matches.splice(index, 0, this.deepCopy(match));
        },
        swapPlayers(index) {
            let match = this.matches[index];
            let auxPlayer = match.p2;
            match.p2 = match.p1;
            match.p1 = auxPlayer;
            this.matches[index] = match;
        },
        removeMatch(index) {
            this.matches.splice(index, 1);
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
.content {
    width: 45%;
    align-self: center;
}
.md-input {
    box-sizing: border-box !important;
    width: 100% !important;
}
.table-span {
    padding: 0 10px 0 10px !important;
    margin-top: 2%;
}
.md-menu-content {
    width: fit-content !important;
}
.p1 {
    margin-left: 2%;
    padding-left: 0%;
    margin-right: 1%;
    width: 25%;
}
.p2 {
    padding-left: 0%;
    width: 25%
}
.match {
    display: flex;
    flex-direction: row;
}
.ts {
    width: 20%;
}
@media (max-width: 1721px) {
    .content {
        width: 50%;
    }
}
@media (max-width: 1555px) {
    .content {
        width: 55%;
    }
}
@media (max-width: 1452px) {
    .content {
        width: 62%;
    }
}
@media (max-width: 1291px) {
    .content {
        width: 75%;
    }
}
@media (max-width: 1074px) {
    .content {
        width: 90%;
    }
    .p1, .p2 {
        width: 20%;
    }
}
@media (max-width: 780px) {
    .match {
        flex-direction: column;
    }
    .ts {
        width: 100%;
    }
    .p1 {
        margin-left: 0;
    }
}
@media (max-width: 632px) {
    .root, #header {
        width: 632px !important;
    }
}
</style>
