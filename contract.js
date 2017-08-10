
function renderContract() {
    console.log('renderContract');
    fetch('administrative-data.html')
        .then((resp) => resp.text())
        .then(function (template) {

            let template2 = eval("`" + template + "`;");
         
            let tmplContainer = document.createElement("template");
            tmplContainer.innerHTML = template2;
            var template3 = tmplContainer;


            let clone = currentDocument.importNode(template3.content, true);
            document.getElementById('content').innerHTML = template2;

            mdc.autoInit();
        });


}
