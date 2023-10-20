document.addEventListener("DOMContentLoaded", function () {
    const acceptRadio = document.getElementById("accept");
    const rejectRadio = document.getElementById("reject");

    // Al cargar la página, se verifica el valor almacenado previamente
    browser.storage.local.get("accepted").then(data => {
        if (data.accepted === "acceptAll" ) {
            acceptRadio.checked = true;
        } else {
            rejectRadio.checked = true;
        }
    }).catch((err) => {
        console.log(err);
    });

    // Escucha el evento click para los botones de aceptar y rechazar
    acceptRadio.addEventListener("click", function () {
        browser.storage.local.set({ accepted: "acceptAll" }).then(() => {
            console.log("Opción aceptada guardada con éxito.");
          })
          .catch(error => {
            console.error("Error al guardar la opción rechazada:", error);
          });
    });

    rejectRadio.addEventListener("click", function () {
        browser.storage.local.set({ accepted: "denyAll" }).then(() => {
            console.log("Opción aceptada guardada con éxito.");
          })
          .catch(error => {
            console.error("Error al guardar la opción rechazada:", error);
          });
    });
});






