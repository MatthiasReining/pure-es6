'use strict';

class JsonPath {
    constructor(model) {
        this.model = model;
    }

    getValue(path) {
        if (path != "")
            path = "." + path;
        let subPaths = path.split(".");
        let subModel = this.model;
        subPaths.forEach(function (subPath, index) {
            if (subPath != "") {
                if (subModel[subPath] == undefined)
                    subModel[subPath] = (index == subPaths.length - 1) ? "" : {};
                subModel = subModel[subPath];
            }
        });
        let fullPath = "this.model" + path;
        //console.log(' path : ' + path);
        let val = eval('this.model' + path);

        return val;
    }

    setValue(path, value) {
        this.getValue(path);
        if (path != "")
            path = "." + path;
        let fullPath = "this.model" + path;
        value = value.replace(/"/g, "\\\"");
        eval(fullPath + '="' + value + '"');
    }
};