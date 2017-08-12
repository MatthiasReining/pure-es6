
function renderContract() {
    console.log('renderContract');

    loadTemplate('new-contract.html', main);
}

function getAllRiskCalcData() {
    let allRiskCalcData = [];
    console.log( state.modelDef.riskCalcData);

    Object.entries(state.modelDef.riskCalcData).map( ([riskKey, risk]) => {
        console.log('riskKey');
        console.log(riskKey);
        allRiskCalcData.push(risk);
    });
    
    return allRiskCalcData;
}