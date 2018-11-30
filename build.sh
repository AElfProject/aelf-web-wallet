

cat << EOT

    _    _____ _  __
   / \  | ____| |/ _|
  / _ \ |  _| | | |_
 / ___ \| |___| |  _|
/_/   \_\_____|_|_|


EOT

#git checkout package.json
#git checkout package-lock.json

#git pull origin master

if [ $2 == 'reinstall' ]
then
    echo 'rm -rf node_modules';
    #rm -rf node_modules;
    echo 'npm install';
    #npm install;
fi

#npm stop

#npm start


