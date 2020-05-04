<template>
    <div v-if="authorized" class="md-layout md-gutter md-alignment-top-center">
        <md-button style="margin-top: 5%;" @click="redirectToAuth()">
            <md-icon>verified_user</md-icon> SIGN IN WITH GOOGLE
        </md-button>
    </div>
    <div v-else style="margin-top: 3%;">
        <div class="md-layout md-gutter md-alignment-top-center">
            <md-field class="md-layout-item md-size-50" style="padding-left: 0%">
                <label>Video URL</label>
                <md-input v-model="videoURL" @change="search()"></md-input>
            </md-field>
        </div>
        <div v-if="videoInfo">
            <div class="md-layout md-gutter md-alignment-top-center">
                <md-field class="md-layout-item md-size-50" style="padding-left: 0%">
                    <label>Title</label>
                    <md-input v-model="videoInfo.snippet.title" disabled></md-input>
                </md-field>
            </div>
            <div class="md-layout md-gutter md-alignment-top-center">
                <md-field class="md-layout-item md-size-50" style="padding-left: 0%">
                    <label>Channel</label>
                    <md-input v-model="videoInfo.snippet.channelTitle" disabled></md-input>
                </md-field>
            </div>
            <div class="md-layout md-gutter md-alignment-top-center">
                <md-field class="md-layout-item md-size-50" style="padding-left: 0%">
                    <label>date</label>
                    <md-icon>calendar_today</md-icon>
                    <md-input v-model="this.videoInfo.snippet.publishedAt" disabled></md-input>
                </md-field>
            </div>
            <div class="md-layout md-gutter md-alignment-top-center" style="padding-left: 40px;"
                v-for="(match, i) in matches" :key="i"
            >
                <md-field class="md-layout-item md-size-10" style="padding-left: 0%; margin-left: 2%;">
                    <label>Timestamp URL</label>
                    <md-input v-model="match.timestamp" placeholder="Timestamp URL"></md-input>
                </md-field>
                <md-field class="md-layout-item md-size-10" style="padding-left: 0%; margin-left: 1%;">
                    <label>Player 1</label>
                    <md-input v-model="match.p1.name" placeholder="Unknow Player"></md-input>
                </md-field>
                <md-menu md-direction="bottom-start">
                    <img :src="getCastImage(match.p1.char)" alt="" srcset="" md-menu-trigger style="margin-top: 10%; padding: 0 10px 0 10px">
                    <md-menu-content>
                        <md-menu-item v-for="(char, i) in cast" :key="i" @click="() => { match.p1.char = char }">
                            <div>
                                <img :src="getCastImage(char)" alt="" srcset="">
                                <span style="text-align: left; margin-left: 10px">{{ char }}</span>
                            </div>
                        </md-menu-item>
                    </md-menu-content>
                </md-menu>
                <span class="md-subheading table-span" style="margin-top: 1.1%">VS</span>
                <md-menu md-direction="bottom-start">
                    <img :src="getCastImage(match.p2.char)" alt="" srcset="" md-menu-trigger style="margin-top: 10%; padding: 0 10px 0 10px">
                    <md-menu-content>
                        <md-menu-item v-for="(char, i) in cast" :key="i" @click="() => { match.p2.char = char }">
                            <div>
                                <img :src="getCastImage(char)" alt="" srcset="">
                                <span style="text-align: left; margin-left: 10px">{{ char }}</span>
                            </div>
                        </md-menu-item>
                    </md-menu-content>
                </md-menu>
                <md-field class="md-layout-item md-size-10" style="padding-left: 0%">
                    <label>Player 2</label>
                    <md-input v-model="match.p2.name" placeholder="Unknow Player"></md-input>
                </md-field>
                <div class="md-layout-item md-size-15" style="padding-left: 1%; margin-top: 0.5%;">
                    <md-button class="md-icon-button" size="sm" @click="duplicate(i)">
                        <md-icon>file_copy</md-icon>
                    </md-button>
                    <md-button class="md-icon-button" size="sm" @click="swapPlayers(i)">
                        <md-icon>swap_horiz</md-icon>
                    </md-button>
                    <md-button class="md-icon-button" size="sm" @click="removeMatch(i)">
                        <md-icon>delete</md-icon>
                    </md-button>
                </div>
            </div>
            <div class="md-layout md-gutter md-alignment-top-center">
                <div class="md-layout-item md-size-50" style="padding: 0">
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
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import props from '../../props';

export default {
    data() {
        return {
            videoURL: '',
            videoInfo: null,
            matches: [],
            authorized: false,
        }
    },
    computed: {
        cast() {
            return this.$store.state.cast;
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
        if (this.$route.params.record) {
            this.videoURL = this.$route.params.record.url;
            this.search();
            this.matches = this.$route.params.record.matches;
        }
    },
    mounted() {
        this.authorized = !localStorage.getItem('g_auth');
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
            window.location.replace(url);
        },
        search() {
            let regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
            if (this.videoURL ? !this.videoURL.match(regex) : false) {
                this.videoURL = '';
                this.videoInfo = null;
                alert('Video URL invalid.');
                return;
            }
            const id = this.videoURL.split('?v=')[1];
            axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${props.apiKey}`, {
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('g_auth')).access_token,
                    Accept: 'application/json',
                }
            }).then((response) => {
                this.videoInfo = response.data.items[0];
                this.videoInfo.snippet.publishedAt = moment(this.videoInfo.snippet.publishedAt).format('DD/MM/YYYY');
            }).catch((response) => {
                // auth again i guess, refresh token is was intended to make that we doesn't need to worry with this.
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
            this.matches.forEach((match) => {
                match.p1.name = match.p1.name ? match.p1.name : 'Unknow Player';
                match.p2.name = match.p2.name ? match.p2.name : 'Unknow Player';
                match.timestamp = match.timestamp ? match.timestamp : this.videoURL;
            });
            // save in firestore.
            let record = {};
            if (this.$route.params.record) {
                record = this.$route.params.record;
                record.matches = this.matches;
                this.$store.commit('updateRecord', record);
                //
                this.$route.params.record = null;
                // clear page
                this.$toast.success('Record updated successfully.');
                this.clear();
                return;
            }
            record.id = this.videoInfo.id;
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
        remove(record) {
            this.$store.commit('removeRecord', record);
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
                    char: 'any',
                    name: '',
                },
                p2: {
                    char: 'any',
                    name: '',
                },
                timestamp: '',
            },);
        },
        duplicate(index) {
            let match = {...this.matches[index]};
            this.matches.splice(index, 0, this.deepCopyFunction(match));
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
    },
}
</script>

<style scoped></style>
