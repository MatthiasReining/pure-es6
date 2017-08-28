'use strict';


var state = {
    "model": { "title": "Shadow DOM", "owner": "test3", "v1": "key2" }
};
var jsonPath = new JsonPath(state.model);
var i18nMessages = {};

(function () {

    const supportsCustomElementsV1 = 'customElements' in window;
    const supportsShadowDOMV1 = !!HTMLElement.prototype.attachShadow;

    let loadCustomElementsV1 = null;
    if (!supportsCustomElementsV1)
        loadCustomElementsV1 = loadScript('bower_components/custom-elements/custom-elements.min.js');

    Promise.all([loadCustomElementsV1]).then(e => {
        if (loadCustomElementsV1 != null)
            console.log("Polyfill 'custom-elements' is loaded...");

        let p1 = loadScript('src/t-binding.js');
        let p2 = loadScript('src/t-input-ctrl.js')
        let p3 = loadScript('src/contract.js')

        Promise.all([p1, p2, p3]).then(e => {
            bootstrapApp();
        });
    });
})();


function bootstrapApp() {
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

    loadLanguages();
    initRouter();
}

function initRouter() {
    // configuration
    //Router.config({ mode: 'history' });
    Router.config({ mode: 'hash' });

    // returning the user to the initial state
    //Router.navigate();

    // adding routes
    Router
        .add(/contract\/?$/, function () {
            console.log('router contract 2');
            renderContract();
        })
        .add(/contract/, function () {
            console.log('router contract');
            renderContract();
        })
        .add(/products\/(.*)\/edit\/(.*)/, function () {
            console.log('products', arguments);
        })
        .add(function () {
            console.log('router default');
        })
        .check('/products/12/edit/22').listen();

    Router.check('/contract').listen();
    Router.check('/contract/').listen();
    Router.check('/').listen();
    Router.check();

    // forwarding
    Router.navigate('/');

}

function loadLanguages() {
    //load i18n
    state.lang = {
        'availableLanguages': ['de', 'en'],
        'fallback': 'de'
    };

    //load default language
    if (state.lang.availableLanguages.indexOf(navigator.language) > -1)
        state.lang.current = navigator.language;
    else if (state.lang.availableLanguages.indexOf(navigator.language.split['_'][0]) > -1)
        state.lang.current = navigator.language.split['_'][0];
    else
        state.lang.current = 'de'; //default value
    console.log('set language to ' + state.lang.current);

    loadLanguage(state.lang.current);
}

function loadLanguage(lang) {
    //TODO change
    let tmpCurrency = "EUR";
    //load default language
    if (state.lang.availableLanguages.indexOf(lang) > -1) {
        state.lang.current = lang;
        state.lang.i18nFormatter = new TL10nFormatter(lang, tmpCurrency);
    } else {
        console.log('Language ' + lang + ' is not available');
        return;
    }
    fetch('contract_' + state.lang.current + '.json').then((resp) => resp.json()).then(function (data) {
        i18nMessages[state.lang.current] = data;
    });


}


function loadScript(src) {
    return new Promise(function (resolve, reject) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function loadTemplate(resource, htmlElem) {
    console.log('loadTemplate: ' + resource);
    fetch(resource)
        .then((resp) => resp.text())
        .then(function (template) {
            let template2 = eval("`" + template + "`;");
            let tmplContainer = document.createElement("template");
            tmplContainer.innerHTML = template2;
            htmlElem.innerHTML = template2;

            //only for material design
            //mdc.autoInit();

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

/**
 * Strict Contextual Escaping
 * see also https://docs.angularjs.org/api/ng/service/$sce sce.html();
 * 
 * @param {*} data 
 */
function sce(data) {
    if (typeof (data) !== "string")
        return;
    // Escape special characters in the substitution.
    return data.replace(/&/g, "&amp;")
        .replace(/"/g, "&quot")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}


function transl(key) {
    return i18nMessages[state.lang.current][key];
}

function i18n() {
    return state.lang.i18nFormatter;
}

