document.addEventListener("DOMContentLoaded", function () {
    const acceptRadio = document.getElementById("accept");
    const rejectRadio = document.getElementById("reject");

    // Al cargar la página, se verifica el valor almacenado previamente
    browser.storage.sync.get("accepted").then(function (data) {
        if (data.accepted === "acceptAll") {
            acceptRadio.checked = true;
        } else {
            rejectRadio.checked = true;
        }
    }).catch(function (error) {
        console.error("Error al obtener datos de almacenamiento:", error);
    });

    // Escucha el evento click para los botones de aceptar y rechazar
    acceptRadio.addEventListener("click", function () {
        browser.storage.sync.set({ accepted: "acceptAll" }).then(function () {
            console.log("Opción aceptada guardada con éxito.");
        }).catch(function (error) {
            console.error("Error al guardar la opción aceptada:", error);
        });
    });

    rejectRadio.addEventListener("click", function () {
        browser.storage.sync.set({ accepted: "denyAll" }).then(function () {
            console.log("Opción rechazada guardada con éxito.");
        }).catch(function (error) {
            console.error("Error al guardar la opción rechazada:", error);
        });
    });
});






