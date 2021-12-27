function themeChangeByHash() {
  const hashChange = () => {
    const hash = location.hash;
    const themeWrapper = document.getElementById("root");
    if (!themeWrapper) return;
    if (hash.indexOf("/get-wallet") > -1 || hash.indexOf("/connect") > -1) {
      themeWrapper.className = "aelf-bg-style-wallet";
    } else {
      themeWrapper.className = "aelf-bg-theme";
    }
  };
  hashChange();
  window.addEventListener("hashchange", hashChange);
}

module.exports = {
  themeChangeByHash,
};
