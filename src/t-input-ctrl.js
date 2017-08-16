//var currentDocument = document.currentScript.ownerDocument;

class TInputCtrl extends HTMLElement {
    // Fires when an instance of the element is created.
    connectedCallback() {
        extractAttrsAsJSON(this);

        //XXX use global cache?

        let template = `<div class="mdc-form-field">
                <div class="mdc-textfield " data-mdc-auto-init="MDCTextfield">
                    <input id="${this.def.model}" type="text" class="mdc-textfield__input" data-model="${this.def.model}">
                    <label for="${this.def.model}" class="mdc-textfield__label">
                        ${this.def.label}
                    </label>
                </div>
            </div>`;

        this.innerHTML = template;
        addTBindings(this);

        let modelPath = this.model;
        if (modelPath == undefined)
            modelPath = this.def.model;
        this.value = jsonPath.getValue(modelPath);
        console.log('t-input-ctrl');
        console.log(this);

        /*
                let template = currentDocument.querySelector('template');
        
                let template2 = eval("`" + template.innerHTML + "`;");
                //let template2 = `<label>${this.def.label}</label>: <input type="text" data-model="${this.def.model}"> ${this.def.model} `;
        
                this.innerHTML = template2;
        
                addTBindings(this);
        
                let modelPath = this.model;
                if (modelPath == undefined)
                    modelPath = this.def.model;
                this.value = jsonPath.getValue(modelPath);
                */
    };

    get value() {
        return this.querySelector('input').value;
    }
    set value(value) {
        this.querySelector('input').value = value;
    }

    get modelDef() {
        return this.def;
    }


    // Fires when an instance was removed from the document.
    disconnectedCallback() { };
    // Fires when an attribute was added, removed, or updated.
    attributeChangedCallback(attr, oldVal, newVal) {
        console.log("\n\nAttr changed\n\n", attr);
    };


}
customElements.define('t-input-ctrl', TInputCtrl);

