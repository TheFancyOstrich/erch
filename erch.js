keyMap = {};
i = 0;
var keys;
browser.storage.local.get(["erch-keys"]).then(function (obj) {
    keys = obj['erch-keys']
    if (keys == null || keys.length < 1) {
        keys = new Set();
        keys.add("Shift")
        keys.add("Control")
        keys.add(" ");
        browser.storage.local.set({ "erch-keys": keys });

    }

});

inputs = document.getElementsByTagName("input");
document.addEventListener("keydown", (e) => {
    keyMap[e.key] = true;
    allDown = true;
    keys.forEach((x) => (allDown = keyMap[x] && allDown));
    if (allDown) {
        inputs[i].focus();
        i = (i + 1) % inputs.length;
    }
});
document.addEventListener("keyup", (e) => {
    keyMap[e.key] = false;
});
