This is just a test by using pure ES6. No further frameworks like Angular or React.
I'm curious to see when I'm running in restrictions.

## Topics: 

- two-way-data binding *[ok]*
- central state *[ok]*
- templating *[ok]*
- modular project structure
- routing
- i18n 

### two-way-data binding

see t-binding.js

### central state

in init.js global variable *state*

### templating

init.js#loadTemplate 

### modular project structure

### routing

see http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url

### i18n

init.js#transl()


## Browsers

The usage of ES6 should work without translation libraries like babel.js.  
For enabling ES6 functionality only polyfill should be used. With polyfill can be removed in an easy way as soon as all browsers supports the extended functionality (see https://www.webcomponents.org/polyfills/)

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