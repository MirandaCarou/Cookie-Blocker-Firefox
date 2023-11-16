//------------------ FUNCIONES QUE SE UTILIZAN (AJENAS A LA EXTENSION)------------------------------------------------------
async function waitForElementsByIdorClassName(elements) {
  return new Promise( (resolve, reject) => {
    var elementDetected = false;
    for (const element of elements) {
      const targetElement = document.getElementById(element) ?? document.getElementsByClassName(element)[0];
      if (targetElement != undefined) {
        elementDetected = true;
        resolve();
      }
    }
    if (!elementDetected) {
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
    }
  });
}


//-------------- FUNCIONES DE LA EXTENSIÓN Y RELACIONADAS CON SU COMPORTAMIENTO ---------------------------------------------------------------
async function configurateCookies(handler, preferences) {
  if(preferences == 'acceptAll'){
      handler.manageSiteAsAcceptAll();
  }else if (preferences == "denyAll") {
      handler.manageSiteAsDenyAll();
  }

}



function getHandlerData(){
  var found = false;
  handlersArray.forEach(element => {
    if(!found && element.canHandlerSite()){
      handler = element;
      found = true;
    }
  });
}

async function runAplication(){
  handlerSetUp = new SetUp();
  handlersArray = handlerSetUp.getAllHandlers();
  handlersRootNames = handlerSetUp.getAllRootNames();
  handler = new Handler();
  waitForElementsByIdorClassName(handlersRootNames)
  .then(async () => {
    browser.storage.local.get("accepted").then(async (data) => {
      if (data.accepted === undefined || data.accepted == "doNothing") {
        data.accepted = "doNothing";
      }else{
        preferences = data.accepted;
        getHandlerData();
        await configurateCookies(handler,preferences);
      }
    })
    .catch(error => {
      console.error("Error al obtener la opción 'accepted' del storage:", error);
    });
  })
  .catch((error) => {
      console.error("Error:", error);
  });

  
  
}
//------------------------ INICIO ----------------------------------------------------------------

runAplication();


   

      