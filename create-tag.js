const axios = require('axios');

const owner = 'cmgriffing';
const repo = 'euphio';
const version = process.env.npm_package_version;
const token = process.env.GITHUB_TOKEN;

(async () => {
  try {
    const headers = {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    };
    const fetchUrl = `https://uploads.github.com/repos/${owner}/${repo}/tags/${version}`;
    const fetchResponse = await axios.get(fetchUrl, {
      headers,
    }).catch(err => {
      console.log('error fetching tag, presuming 404', err);
      return false;
    });

    if(!fetchResponse) {
      const createUrl = `https://uploads.github.com/repos/${owner}/${repo}/releases`;

      const createResponse = await axios.post(createUrl, {
        headers,
        data: {
          tag_name: version,
          target_committish: 'development'
        }
      });
    }


  } catch(e) {
    console.log('something went terribly wrong', e);
  }
})();