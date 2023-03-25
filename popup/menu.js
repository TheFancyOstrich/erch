document.addEventListener("DOMContentLoaded", function (event) {
    function setToString(set) {
        var out = "";
        set.forEach((value) => (out += (value === " " ? "Space" : value) + "+"));
        return out.substring(0, out.length - 1);
    }
    var keysDiv = document.getElementById("erch-current");
    browser.storage.local.get(["erch-keys"]).then(function (obj) {
        var keys = obj['erch-keys']
        if (keys == null || keys.length < 1) {
            keys = new Set();
            keys.add("Shift")
            keys.add("Control")
            keys.add(" ");
            browser.storage.local.set({ "erch-keys": keys });

        }
        keysDiv.textContent = setToString(keys);

    });

    var button = document.getElementById("erch-recordButton");
    button.addEventListener("click", function () {
        var input = new Set();
        button.innerText = "Recording";
        button.blur()
        function recorder(event) {
            if (event.key !== "Enter") {
                if (input.size > 2) {
                    input.clear()
                }
                input.add(event.key);
                keysDiv.textContent = setToString(input);
            } else {
                document.removeEventListener("keydown", recorder, false);
                button.innerText = "Record";
                browser.storage.local.set({ "erch-keys": input })
            }
        }
        document.addEventListener("keydown", recorder, false);
    });
});
