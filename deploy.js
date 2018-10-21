const axios = require('axios');
const fs = require('fs');
const glob = require('glob');

const owner = 'cmgriffing';
const repo = 'euphio';
const version = process.env.npm_package_version;
const token = process.env.GITHUB_TOKEN;
const extension = process.env.ASSET_EXTENSION

glob(`./out/make/**/*.${extension}`, function(files) {

    const url = `https://uploads.github.com/repos/${owner}/${repo}/releases/${version}/assets?name=${filename}`;

    const file = fs.readFileSync(files[0]);

    axios.post(url, {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      data: file
    });

})
