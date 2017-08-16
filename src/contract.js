function renderContract() {
    loadTemplate('new-contract.html', main);
}


function getAllRiskCalcData() {
    let allRiskCalcData = [];
   
    Object.entries(state.modelDef.riskCalcData).map( ([riskKey, risk]) => {
        if (!risk.deactivate)
            allRiskCalcData.push(risk);
    });
    
    return allRiskCalcData;
}

function testModifyConditions() {
    state.modelDef.riskCalcData.BUILDING.deactivate = !state.modelDef.riskCalcData.BUILDING.deactivate;
    console.log('change risk data');
    
    let t = new Date().getTime();
    let n = window.performance.now();
    renderContract();

    let durationNs = window.performance.now() - n;
    let duration = new Date().getTime() - t;
    console.log('took ' + durationNs + ' ns');
    console.log('took ' + duration + ' ms');
}