class TOutputCtrl extends HTMLElement {

    constructor() {
        super();
    }
    connectedCallback() {
        extractAttrsAsJSON(this);

        let value = jsonPath.getValue(this.model);
        this.render(value);

    };

    set value(value) {
        this.render(value);
    }

    render(value) {
        this.innerHTML = sce(value);
    }
}
customElements.define('t-output', TOutputCtrl);

