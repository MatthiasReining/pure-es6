var currentDocument = document.currentScript.ownerDocument;

class TInputShadowCtrl extends HTMLElement {
    // Fires when an instance of the element is created.
    connectedCallback() {

        extractAttrsAsJSON(this);

        this.shadow = this.attachShadow({ "mode": "open" });

        //XXX use global cache?
        let template = currentDocument.querySelector('template');
        let template2 = eval("`" + template.innerHTML + "`;");

        //let template2 = `<label>${this.def.label}</label>: <input type="text" data-model="${this.def.model}"> ${this.def.model} `;
        let tmplContainer = currentDocument.createElement("template");
        tmplContainer.innerHTML = template2;
        template = tmplContainer;


        let clone = currentDocument.importNode(template.content, true);

        this.shadow.appendChild(clone);

        mdc.autoInit();

        addTBindings(this.shadow);       
    };

    get value() {
        return this.shadow.querySelector('input').value;        
    }
    set value(value) {
        this.shadow.querySelector('input').value = value;        
    }

    get modelDef() {
        return this.def;
    }

    // Fires when an instance was inserted into the document.
    adoptedCallback() {
        console.log('in adoptedCallback');
    }
    // Fires when an instance was removed from the document.
    disconnectedCallback() { };
    // Fires when an attribute was added, removed, or updated.
    attributeChangedCallback(attr, oldVal, newVal) {
        console.log("\n\nAttr changed\n\n", attr);
    };


}
customElements.define('t-input-shadow-ctrl', TInputShadowCtrl);

