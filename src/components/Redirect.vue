<template></template>

<script>
import axios from 'axios';
import props from '../../props';
import security from '../security';

export default {
    created() {
        const params = new URLSearchParams(window.location.search);
        // workaround to not lose this value in store when redirect occurs.
        console.log(this.$store.state.edit ? '' : 'Edit not found.');
        //
        if (!params.get('code')) {
            this.$router.push('/');
        }

        this.$router.replace({'query': null});

        const req = new URLSearchParams();
        req.append('grant_type', 'authorization_code');
        req.append('redirect_uri', props.redirectURI);
        req.append('client_secret', props.clientSecret);
        req.append('client_id', props.clientId);
        req.append('code', params.get('code'));

        axios.post('https://www.googleapis.com/oauth2/v4/token', req, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(response => {
            localStorage.setItem('g_auth', security.encrypt(response.data));
            localStorage.setItem('refresh', security.encrypt({token: response.data.refresh_token}));
            this.$router.push('/edit');
            setInterval(() => {
                console.log('Refreshing token.');
                const refreshReq = new URLSearchParams();
                refreshReq.append('grant_type', 'refresh_token');
                refreshReq.append('refresh_token', security.decrypt(localStorage.getItem('refresh')).token);
                refreshReq.append('client_secret', props.clientSecret);
                refreshReq.append('client_id', props.clientId);

                axios.post('https://oauth2.googleapis.com/token', refreshReq, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }).then(response => {
                    localStorage.setItem('g_auth', security.encrypt(response.data));
                });
            }, 1000 * response.data.expires_in);
        });
    }
}
</script>

<style></style>
