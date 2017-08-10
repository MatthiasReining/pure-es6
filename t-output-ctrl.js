
class TOutputCtrl extends HTMLElement {

    connectedCallback() {
        extractAttrsAsJSON(this);

        let value = jsonPath.getValue(this.model);
        this.innerHTML = value;

    };

    set value(value) {
        this.innerHTML = value;
    }
}
customElements.define('t-output-ctrl', TOutputCtrl);

