This is just a test by using pure ES6. No further frameworks like Angular or React.
I'm curious to see when I'm running in restrictions.

## Topics: 

- two-way-value binding *[ok]*
- central state *[ok]*
- templating *[ok]*
- modular project structure
- routing
- i18n *[ok]*

The usage of ES6 should work without additional libraries like babel.js

- Chrome *[ok]*
- Firefox *[ok]*
- Edge *[ok]*
- IE *[nok - will work only with babel.js]*


## Material Design

Beside the ES6 check, it is also a check for MDC (material design components) as alternative for Bootstrap.
The challeange for material design: form focused application (many input fields, as usual for enterprise applications).

*[nok]: material design meets not my expectation for formular focused applications with many input fields.*


## Setup 

PRE install

    bower install --save webcomponents/webcomponentsjs
 
Start with 

    browser-sync start --server --files "*.js, *.html"