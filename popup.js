document.addEventListener("DOMContentLoaded", function () {
    const acceptRadio = document.getElementById("accept");
    const rejectRadio = document.getElementById("reject");

    // Al cargar la página, se verifica el valor almacenado previamente
    browser.storage.sync.get("accepted", async function(data) {
        if (data.accepted === "acceptAll") {
            acceptRadio.checked = true;
        } else {
            rejectRadio.checked = true;
        }
    });

    // Escucha el evento click para los botones de aceptar y rechazar
    acceptRadio.addEventListener("click", function () {
        browser.storage.sync.set({ accepted: "acceptAll" });
    });

    rejectRadio.addEventListener("click", function () {
        browser.storage.sync.set({ accepted: "denyAll" });
    });
});






