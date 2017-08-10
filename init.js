'use strict';

var state = {
    "model": { "title": "Shadow DOM", "owner": "test3", "v1": "key2" }
};
var jsonPath = new JsonPath(state.model);


(function () {
    if ('registerElement' in document
        && 'import' in document.createElement('link')
        && 'content' in document.createElement('template')) {
        // platform is good!
        loadLocalLibs();

    } else {
        // polyfill the platform!
        loadLib('bower_components/webcomponentsjs/custom-elements-es5-adapter.js');
        loadLib('bower_components/webcomponentsjs/webcomponents-loader.js');

        window.addEventListener('WebComponentsReady', function () {
            loadLocalLibs();
        });
    }

    //load product
    console.log('load product');
    fetch('test-product.json').then((resp) => resp.json()).then(function (data) {
        console.log(data);
        state.modelDef = data;
        console.log(state);

        loadTemplate('start.html', document.querySelector('main'));
    }).catch(function (error) {
        console.log(error);
        console.log('error... ' + error.message);
    })


})();

function loadLocalLibs() {
    //loadLib('jsonpath.js');
    //loadLib('t1.js');
    //use it again...
    //loadLib('t-binding.js');
    loadLib("contract.js");
}

function loadLib(path) {
    var e = document.createElement('script');
    e.src = path;
    document.body.appendChild(e);

}


function loadTemplate(resource, htmlElem) {
    fetch(resource)
        .then((resp) => resp.text())
        .then(function (template) {

            let template2 = eval("`" + template + "`;");
            let tmplContainer = document.createElement("template");
            tmplContainer.innerHTML = template2;
            htmlElem.innerHTML = template2;

            mdc.autoInit();

            //add T-Bindings   
            addTBindings();

        });


}

/**
   * set elem attributes to class variables;
   */
function extractAttrsAsJSON(htmlElement) {
    let attrs = htmlElement.attributes;
    for (let i = 0; i < attrs.length; i++) {
        let attrName = attrs[i].name;
        if (attrName.toLowerCase().startsWith('data-'))
            attrName = attrName.substr(5);
        let v = attrs[i].value.trim();
        if (!(v.startsWith("[") || v.startsWith("{") || v.startsWith("\""))) {
            v = '"' + v.trim() + '"';
        } else
            v = attrs[i].value; //without trim

        htmlElement[attrName] = JSON.parse(v);
    }
}
