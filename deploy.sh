echo 'webpack production start'
rm -rf ./app/public/js
webpack --config webpack.config.production.js
echo 'webpack production end'

echo 'docker image build start'
docker image build -t aelf-web-wallet .
echo 'docker image build end'