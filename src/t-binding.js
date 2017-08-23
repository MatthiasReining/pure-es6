'use strict';

function updateUI(el) {
    if (el == null)
        el = document;

    let dataBind = el.querySelectorAll('[data-model], [data-def]');

     //use for loop instead of foreach / only for Edge
    //see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10638731/
    for(let i=0; i<dataBind.length; i++) {
        let htmlElem = dataBind[i];
        let modelPath = htmlElem.getAttribute("data-model");
        if (modelPath == undefined) {
            console.log(htmlElem);
            console.log(htmlElem.attributes);
            console.log(htmlElem.modelDef);
            console.log(htmlElem['data-def']);
            modelPath = htmlElem.modelDef.model;            
        }
        let val = jsonPath.getValue(modelPath);

        if (htmlElem.nodeName == "INPUT" || htmlElem.nodeName.startsWith('T-')) {
            //console.log('set value for ' + htmlElem.nodeName + '  -> ' + val);            
            htmlElem.value = val;
        } else {
            if (typeof val === 'object')
                val = JSON.stringify(val, null, "  ");
            htmlElem.innerText = val;
        }
    };
}

function addTBindings(el) {
    if (el == null)
        el = document;
    let dataBind = el.querySelectorAll('[data-model], [data-def]');

    //use for loop instead of foreach / only for Edge
    //see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10638731/
    for(let i=0; i<dataBind.length; i++) {
        let htmlElem = dataBind[i];
        addTBinding(htmlElem);
    }
}

function addTBinding(el) {
    if (!el.dataIsBound)
        el.addEventListener("keyup", function () {
            let modelPath = el.getAttribute("data-model");
            if (modelPath == undefined) {
                extractAttrsAsJSON(el);
                modelPath = el.def.model;
            }
            let value = el.value;
            jsonPath.setValue(modelPath, value);
            updateUI();
        });
    el.dataIsBound = true;
}
