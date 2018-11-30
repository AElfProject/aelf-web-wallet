#!/bin/sh

cat << EOT

        _    _____ _  __    ___   __  __ _      _       _
       / \  | ____| |/ _|  / _ \ / _|/ _(_) ___(_) __ _| |
      / _ \ |  _| | | |_  | | | | |_| |_| |/ __| |/ _` | |
     / ___ \| |___| |  _| | |_| |  _|  _| | (__| | (_| | |
    /_/   \_\_____|_|_|    \___/|_| |_| |_|\___|_|\__,_|_|

                __        __    _ _      _
                \ \      / /_ _| | | ___| |_
                 \ \ /\ / / _` | | |/ _ \ __|
                  \ V  V / (_| | | |  __/ |_
                   \_/\_/ \__,_|_|_|\___|\__|

EOT

git checkout package.json
git checkout package-lock.json

git pull origin master

if [ $2 == 'reinstall' ]
then
    echo 'rm -rf node_modules';
    rm -rf node_modules;
    echo 'npm install';
    npm install;
fi

npm stop

npm start


