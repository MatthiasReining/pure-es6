class TL10nFormatter {

    constructor(lang, currency) {
        this.lang = lang;
        this.l10nNF = new Intl.NumberFormat(lang);
        this.l10nDF = new Intl.DateTimeFormat(lang);
        this.l10nCur = new Intl.NumberFormat(lang, { style: "currency", currency: currency });
    }

    df(value, options) {
        console.log(value);
        console.log(options);
        options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
        };
        return new Intl.DateTimeFormat(this.lang, options).format(value);
        //return this.l10nDF.format(value);


    }
    nf(value, fractionSize) {
        if (fractionSize) {
            let m = Math.pow(10, fractionSize);
            return this.l10nNF.format(Math.round(value * m) / m);
        }
        return this.l10nNF.format(value);
    }

    cur(value) {
        return this.l10nCur.format(value);
    }
}
