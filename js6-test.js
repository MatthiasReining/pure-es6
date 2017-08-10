class Test {
    constructor() {
        console.log("in constructor");
        this.initUI();
    }

    initUI() {
        this.inputText = document.querySelector("#myField");
        this.output = document.querySelector("#myOutput");
        this.inputText.onkeyup = e => this.output.innerHTML = e.target.value;
    }
}

let test = new Test();

function run() {
    var customer = { name: "Foo" }
    var card = { amount: 7, product: "Bar", unitprice: 42 }
    var message = `Hello ${customer.name},
want to buy ${card.amount} ${card.product} for
a total of ${card.amount * card.unitprice} bucks?`

    console.log(message);


}

class DateSpan extends HTMLSpanElement {
    createdCallback() {
        this.textContent = "Today's date: " + new Date().toJSON().slice(0, 10);
    }

    constructor() {

    }
}
document.registerElement('date-today', DateSpan);
//window.customElements.define('date-today', DateSpan);



let tInputTemplate = `<input type="text" value="qqq" id="myInput"></input>`;
class TInput extends HTMLElement {
    // Monitor the 'name' attribute for changes.
    static get observedAttributes() { return ['name', 'value']; }


    createdCallback() {
        this.createShadowRoot().innerHTML = tInputTemplate;

        this.inputText = this.shadowRoot.querySelector('#myInput');
        this.inputText.style.backgroundColor = "red";
        this.inputText.value = "in callback";

        this.output = document.querySelector("#myOutput");
        this.inputText.onkeyup = e => this.output.innerHTML = e.target.value;
    }

    attachedCallback() {
        console.log('attachedCallback');
        this.inputText.value = 'blub';
    };

    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
        console.log(attributeName + " - " + oldValue + " - " + newValue + " - " + namepsace)
    }
}
document.registerElement('t-input', TInput, { extends: 'input' });
//window.customElements.define('t-input', class extends HTMLTextAreaElement {});

//var tinput = new TInput();

class FancyButton extends HTMLButtonElement {
    constructor() {
        super(); // always call super() first in the ctor.
        this.addEventListener('click', e => this.drawRipple(e.offsetX, e.offsetY));
        this.textContent = 'Fancy button!';
    }

    // Material design ripple animation.
    drawRipple(x, y) {
        let div = document.createElement('div');
        div.classList.add('ripple');
        this.appendChild(div);
        div.style.top = `${y - div.clientHeight / 2}px`;
        div.style.left = `${x - div.clientWidth / 2}px`;
        div.style.backgroundColor = 'currentColor';
        div.classList.add('run');
        div.addEventListener('transitionend', e => div.remove());
    }
}


customElements.define('fancy-button', FancyButton, { extends: 'button' });