
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
        if (!risk.deactivate)
            allRiskCalcData.push(risk);
    });
    
    return allRiskCalcData;
}

function testModifyConditions() {
    state.modelDef.riskCalcData.BUILDING.deactivate = !state.modelDef.riskCalcData.BUILDING.deactivate;
    console.log('change risk data');
    renderContract();
}