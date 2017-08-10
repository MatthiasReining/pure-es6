'use strict';


function updateUI(el) {
    if (el == null)
        el = document;

    let dataBind = el.querySelectorAll('[data-model], [data-def]');

    dataBind.forEach(htmlElem => {
        let modelPath = htmlElem.getAttribute("data-model");
        if (modelPath == undefined) {            
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
    });
}

function addTBindings(el) {
    if (el == null)
        el = document;
    let dataBind = el.querySelectorAll('[data-model], [data-def]');

    dataBind.forEach(function (htmlElem) {
        //console.log('add binding for ' + htmlElem.getAttribute('data-model'));
        addTBinding(htmlElem);
    });
}

function addTBinding(el) {
    console.log('addTBinding');
    if (!el.dataIsBound)
        el.addEventListener("keyup", function () {
            console.log(el);
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
