//------------------ FUNCIONES QUE SE UTILIZAN (AJENAS A LA EXTENSION)------------------------------------------------------
async function waitForElementsByIdorClassName(elements) {
  return new Promise(async (resolve, reject) => {
    const observer = new MutationObserver(() => {
        for (const element of elements) {
          const targetElement = document.getElementById(element) ?? document.getElementsByClassName(element)[0];
          if (targetElement != undefined) {
            observer.disconnect();
            elementDetected = true;
            resolve();
          }
        }
    });
    observer.observe(document, { childList: true, subtree: true });
  });
}


//-------------- FUNCIONES DE LA EXTENSIÓN Y RELACIONADAS CON SU COMPORTAMIENTO ---------------------------------------------------------------
async function configurateCookies(handler, preferences) {
  console.log("-------------CONFIGURATE COOKIES --------------");
  console.log(handler.getHostName());
  console.log(preferences);
  console.log("-----------------------------------------------");
  if(preferences == 'acceptAll'){
      handler.manageSiteAsAcceptAll();
  }else if (preferences == "denyAll") {
      handler.manageSiteAsDenyAll();
  }

}



function getHandlerData(){
  handlersArray.forEach(element => {
    if(element.canHandlerSite()){
      handler = element;
    }
  });
}

async function runAplication(){
  waitForElementsByIdorClassName(handlersRootNames)
  .then(async () => {
    browser.storage.local.get("accepted").then(async (data) => {
      preferences = data.accepted;
      getHandlerData();
      await configurateCookies(handler,preferences);
    })
    .catch(error => {
      console.error("Error al guardar la opción rechazada:", error);
    });
  })
  .catch((error) => {
      console.error("Error:", error);
  });

  
  
}
//------------------------ INICIO ----------------------------------------------------------------
var handler = new Handler();
var handlerSetUp = new SetUp();
var handlersArray = handlerSetUp.getAllHandlers();
var handlersRootNames = handlerSetUp.getAllRootNames();
var preferences = "";

runAplication();


   

      