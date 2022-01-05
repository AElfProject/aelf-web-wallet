<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <!-- set `maximum-scale` for some compatibility issues -->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
  <title>TxDetail-AElf</title>
  <link href="/favicon.ico" rel="bookmark" type="image/x-icon">
</head>
<link rel="stylesheet" href="../public/style/browser_reset.css?t=<%= htmlWebpackPlugin.options.timestamp %>">
<body>
<!-- react component start -->
<div id="root"></div>
<script type="text/javascript">
  window.defaultConfig = {};
  defaultConfig.httpProvider = '{{httpProvider}}';
  defaultConfig.mainTokenName = '{{mainTokenName}}';
  defaultConfig.chainId = '{{chainId}}';
  defaultConfig.explorerURL = '{{explorerURL}}';
  defaultConfig.ADDRESS_INFO = JSON.parse(decodeURIComponent('{{ADDRESS_INFO}}'));
  defaultConfig.WEB_API_INFO = JSON.parse(decodeURIComponent('{{WEB_API_INFO}}'));
  defaultConfig.TOKEN_CROSS_SUPPORT = JSON.parse(decodeURIComponent('{{TOKEN_CROSS_SUPPORT}}'));
  defaultConfig.WALLET_INFO = JSON.parse(decodeURIComponent('{{WALLET_INFO}}'));
  defaultConfig.mainTokenContract = '{{mainTokenContract}}';
  defaultConfig.commonPrivateKey = '{{commonPrivateKey}}';
</script>
</body>
</html>
