window.onload = function () { 
    function save_options() {
        var select = document.getElementById("direction");
        var direction = select.children[select.selectedIndex].value;
        localStorage["train_direction"] = direction;

        // Update status to let user know options were saved.
        var status = document.getElementById("status");
        status.innerHTML = "設定を保存しました"
        setTimeout(function () {
            status.innerHTML = "";
        }, 1000);
    }

    // Restores select box state to saved value from localStorage.
    function restore_options() {
        var train = localStorage["train_direction"];
        if (!train) {
            return;
        }
        var select = document.getElementById("direction");
        for (var i = 0; i < select.children.length; i++) {
            var child = select.children[i];
            if (child.value == train) {
                child.selected = "true";
                break;
            }
        }
    }

    restore_options();

    var saveBtn = document.getElementById("saveBtn");
    console.log(saveBtn);
    saveBtn.addEventListener("click", function () {
        console.log("hoge");
        save_options();
    });
};
