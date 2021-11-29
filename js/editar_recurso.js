function alterarDOM(){
    obs = document.getElementById("DSC_OBSERVACAO")
    obs_txt = obs.value.split("|")
    obs_div = obs.parentNode
    // obs_div.hidden = true if(army.indexOf("Marcos") !== -1)  
    bool_regul_med = ((obs_txt.indexOf("REGULAÇÃO MÉDICA")!== -1) ? "checked":"")
    obs_div.parentNode.insertAdjacentHTML("beforeend", `
    <div class="col-md-2 form-check form-switch">
        <label>Regulação Médica?</label>
        <input id="FLG_REGUL_MED" name="REGULAÇÃO MÉDICA" type="checkbox" `+bool_regul_med+`>
    </div>
`)

console.log(obs.value)

}

function lerParams(){
    $('#FLG_REGUL_MED').change(function(){
        
        var val_regul_med = this.checked ? '|REGULAÇÃO MÉDICA' : '';
        $('#DSC_OBSERVACAO').val(val_regul_med);
    });
}

alterarDOM();
lerParams();