#!/bin/bash

cat << EOT

            _    _____ _  __
           / \  | ____| |/ _|
          / _ \ |  _| | | |_
         / ___ \| |___| |  _|
        /_/   \_\_____|_|_|

EOT

#当变量a为null或为空字符串时则var=b
start_mode=${1:-'production'}
node_modules_action=${2:-'default'}
echo ${node_modules_action} ${start_mode}

git checkout package-lock.json

git pull && echo "git pull done"

if [ ${node_modules_action} = 'reinstall' ]
then
    echo 'npm install'
    npm install && echo 'install done'
    sleep 3
    npm install && echo 'install check done'
    sleep 3
fi

echo 'running webpack'
webpack && echo 'webpack done'

if [ ${start_mode} = 'dev' ]
then
    npm run dev
    echo 'npm run dev'
else
    npm stop && npm start
    echo 'npm stop && npm start'
fi


