[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![GitHub top language](https://img.shields.io/github/languages/top/alexdanieldm/crypto)

# Crypto
Crypto it's a **cross-platform desktop application that let's you encrypt and decrypt** files without size limitation using a custom system of private and public key using python

> "In a world where everyone is overexposed, the coolest thing you can do is maintain your mystery.”

### Requirements

You will need to have install *`python >= 2.7.16`* and *`pip >= 19.1.1`* in order for this to work properly

To check your `python` version run:
```sh
python --version
```

And to install `pip` run:
```sh
sudo easy_install pip
```

### Installation
Firts you'll have to run:
```sh
npm install
```

Then to install the python modules run:

```sh
pip install -r requirements.txt
```

And then have your environment variables on place by runnning:
```sh
cp env.sample .env
```
Here you'll need to fill the following values:
* `DB_URL`: the connection to your [mongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_footprint_row_search_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=7326400240) cluster 
* `JWT_SECRET`: an arbitrary value without spaces

After all that you should be good to go, to start the project by running:
```sh
npm start
```

#### Social Media
_Twitter: [@alexdanieldm](https://twitter.com/alexdanieldm)_

_Instagram: [@alexdanieldm](https://www.instagram.com/alexdanieldm/)_
