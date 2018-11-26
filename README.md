
Credits: https://gist.github.com/maxogden/a411195a58a6753a40e8a2f34fa58599

## Pre-requisites

* Running MacOS
* Installed [Homebrew](https://brew.sh/)

open `terminal`
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

* Installed NodeJS

in the `terminal`
```
brew install node
```

* Installed SQlite

in the `terminal`
```
brew install sqlite
```


## Setup & Run:

```
cd /ichat2json
npm install
```

then change the path to your `chat.db`.

then run the script:

```
node index.js
```

Your data will be in `sms.json`