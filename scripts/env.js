const fs = require('fs');

fs.writeFileSync(
    './.env',
    `VUE_APP_REDIRECT_URI=${process.env.REDIRECT_URI}\n`
    + `VUE_APP_CLIENT_SECRET=${process.env.CLIENT_SECRET}\n`
    + `VUE_APP_CLIENT_ID=${process.env.CLIENT_ID}\n`
    + `VUE_APP_KEY=${process.env.KEY}\n`
    + `VUE_APP_FB_KEY=${process.env.FB_KEY}\n`
    + `VUE_APP_FB_CLIENT_ID=${process.env.FB_CLIENT_ID}\n`,
);
