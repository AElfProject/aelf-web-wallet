<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!-- set `maximum-scale` for some compatibility issues -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
    <title>Wallet-AElf</title>
    <link href="/favicon.ico" rel="bookmark" type="image/x-icon">
    <!-- fastclick 使用有点问题... -->
    <!-- script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script-->
    <!-- script src="../public/fastclick.js?t=201910"></script>
      <script>
      if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
          FastClick.attach(document.body);
        }, false);
      }
      if(!window.Promise) {
        document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
      }
    </script -->
</head>
<link rel="stylesheet" href="../public/style/browser_reset.css?t=20181127">

<!-- <link rel="stylesheet" href="../style/browser_reset.css"> -->
<body>
<div id="welcome-page">
    <div class="welcome-page-message">
        <div class="aelf-logo-container">
            <div class="aelf-logo"></div>
        </div>
        <p class="aelf-wallet-description">aelf Wallet</p>
    </div>
    <div class="welcome-page-bg"></div>
</div>

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

<script type="text/javascript">
  // TODO: 微信浏览器的底部前进返回按钮。
  // document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
  //   alert(window.history.length);
  //   if (window.history.length === 1) {
  //     window.location.href = window.location.href + '?t=1';
  //   }
  //   if (window.history.length === 2) {
  //     window.location.href = window.location.href + '?t=2';
  //   }
  //   // WeixinJSBridge.call('hideToolbar');
  // });
</script>

<!--   <script id="__bs_script__">//<![CDATA[
    document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.24.5'><\/script>".replace("HOST", location.hostname));
//]]></script> -->
</body>
</html>
