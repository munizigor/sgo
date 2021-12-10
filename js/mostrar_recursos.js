//TODO:
// 3. Cronometrar tempo ultima atualização
// 4. REtirar abas de alerta

// Adicionar botao Regul Méd
function inclBtn(){
    document.getElementById("emergencia-form").remove();
    botaoCores = document.getElementById("botaoCores");
    botaoCores.getElementsByTagName("ul")[0].remove();
    nova_ul = document.createElement("ul");
    botaoCores.children[0].appendChild(nova_ul);
    botaoCores = botaoCores.getElementsByTagName("ul")[0];

//     botaoCores.insertAdjacentHTML("beforeend", `
//     <li class="open">
//         <span  id="btn_regul_med" class="btn btn-danger" title="Regulação Médica">Regulação Médica</span>
//     </li>
// `);
    botaoCores.parentNode.insertAdjacentHTML("beforeend", `
        <div class="col-md-12 form-check form-switch">
            <label>Atualização Automática</label>
            <input id="FLG_ATUALIZA" name="ATUALIZAÇÃO AUTOMÁTICA" type="checkbox" checked>
        </div>
    `);
}


function loadRegulMed(e) {

    //Definicao de Variaveis
    
    var cod_agencia = "2";
    var cod_unidade = "";
    var cod_unidade_mesa_atuacao = "";
    var cod_tipo_recurso = "";
    var nm_recurso = "";
    var qtd_registro_pagina = "80000";
    var cod_disponibilidade_recurso = "0";
    var pagina = "0";

      $.ajax({
        type: "POST",
        url: location.origin+"/Recursos/ajaxGetBuscaRecursos/",
        dataType: "json",
        data: {
            cod_agencia: cod_agencia,
            qtd_registro_pagina: qtd_registro_pagina,
            cod_disponibilidade: cod_disponibilidade_recurso,
            pagina: pagina
        },
        success: function (data) {

            $("#resultado table").remove();
            $("#resultado").append("<table border = 1 align=center class='table table-condensed table-hover'></table>");
            $("#resultado table").append('<thead><tr><th>Recurso - Tipo Recurso</th><th>Disponibilidade</th><th>Tempo no Status Atual</th><th>Agência - Unidade</th><th>Mesa / Área Atuação</th><th>Comandante</th></tr></thead>');
            $("#resultado table").append('<tfoot><tr><th>Recurso - Tipo Recurso</th><th>Disponibilidade</th><th>Tempo no Status Atual</th><th>Agência - Unidade</th><th>Mesa / Área Atuação</th><th>Comandante</th></th></tr></tfoot>');
            $("#resultado table").append('<tbody></tbody>');

            ///onMouseOver="javascript:this.style.backgroundColor='#C0B085'" onMouseOut="javascript:this.style.backgroundColor=''"

            total_registro = data.quantidade_registro_retornado.QTD_REGISTRO_RETORNADO;

            linha = 1;
            var urExcluir = "";
            var disponibilidade_class = "";
            var acao = "";
            var cod_disponibilidade = 0;
            var textoBotao = "";
            var id_Tr = "";
            var id_Td = "";

            //Filtrar apenas


            //for (i = pagina * tamanhoPagina; i < total_registro && i < (pagina + 1) * tamanhoPagina; i++) {
            $.each(data.recursos, function (key, value) {
                observacao = ((value.DSC_OBSERVACAO)? value.DSC_OBSERVACAO : "")
                if (observacao.split("|").indexOf("REGULAÇÃO MÉDICA") == -1){
                    return true;
                }
                cod_recurso = value.COD_RECURSO;
                acao = "";
                
                if (value.COD_DISPONIBILIDADE_RECURSO == 1) {

                    disponibilidade_class = "status-ativo";

                }
                else if (value.COD_DISPONIBILIDADE_RECURSO == 2) {
                    disponibilidade_class = "status-alocado";

                }
                else if (value.COD_DISPONIBILIDADE_RECURSO == 3) {
                    disponibilidade_class = "status-desativado";

                }
                else if (value.COD_DISPONIBILIDADE_RECURSO == 7) {
                    disponibilidade_class = "status-em-delegacia-hospital";
                }
                else {
                    disponibilidade_class = "status-em-outra-situacao";

                }

                id_Tr = ("idTr-"+cod_recurso);
                id_Td = ('idTd-'+cod_recurso);


                
                if (value.DT_ULTIMO_UPDATE_STATUS == null) {
                    DT_ULTIMO_UPDATE_STATUS = "";
                } else {
                    DT_ULTIMO_UPDATE_STATUS = value.DT_ULTIMO_UPDATE_STATUS;
                }
                $("#resultado table tbody").append('<tr id=\'' + id_Tr + '\'class = \'' + disponibilidade_class + '\'><td><ul><li><b>'
                    + value.NM_RECURSO + ' - ' + value.DSC_TIPO_RECURSO + '</b><br></li></td><td id=\'' + id_Td + '\'>'
                    + value.LABEL_DISPONIBILIDADE + '<br><b>' + value.DT_ULTIMO_UPDATE_STATUS + '</td><td class="tempo_status" name="'+value.DT_ULTIMO_UPDATE_STATUS
                    +'"></td><td>' + value.NM_SIGLA_AGENCIA + ' - ' + value.NM_SIGLA_UNIDADE
                    + '</td><td><b>' + value.DSC_MESA_ATUACAO + ' - ' + value.LABEL_AREA_ATUACAO + '</b></td><td><b>' + value.NR_MATR_CMT_RECURSO_ATUAL_INTERNO
                    + ' - ' + value.NM_CMT_RECURSO_ATUAL_INTERNO + '<br>' + value.NR_TEL_CMT_RECURSO_ATUAL_INTERNO + '<b></td></tr>');
            }
            )//.then(setInterval(vtrSamu, 1000));

            // $("#resultado").append('</table>');
            $('#numeracao').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(total_registro / qtd_registro_pagina));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
 }

 function vtrSamu(){
    $.ajax({
        type: "GET",
        url: "http://samudf.com.br/maps/radio_operacao/map_points/dynamic.php",
        dataType: "json",
        data: {
            servidor_id: "0"
        },
        success: function (data) {
            $.each(data, function (key, value) {
                // console.log(value.BGCL)
                if (value.BGCL == "000000") { //pRETO - Indisponivel
                    disponibilidade_class = "status-desativado";
                    samu_disponibilidade = "RF AUTORIZADO";
                }
                else if (value.BGCL == "808080") { //CINZA - 
                    disponibilidade_class = "status-desativado";
                    samu_disponibilidade = "INDISPONÍVEL";
                }

                else if (value.BGCL == "008000") { //VERDE - Disponivel
                    disponibilidade_class = "status-ativo";
                    samu_disponibilidade = "DISPONÍVEL";
                }

                else if (value.BGCL == "0000ff") { //azul escuro - Chegada na ocorrencia    
                    disponibilidade_class = "status-alocado";
                    samu_disponibilidade = "ALOCADA - CHEGOU NA OCORRÊNCIA";
                }

                else if (value.BGCL == "5555ff") { //Azul CLaro - em deslocamento
                    disponibilidade_class = "status-alocado";
                    samu_disponibilidade = "ALOCADA - EQUIPE COMUNICADA";
                }

                else if (value.BGCL == "000000") { //Vermelho - Aguardando Deslocamento
                    disponibilidade_class = "status-alocado";
                    samu_disponibilidade = "ALOCADA - AGUARDANDO DESLOCAMENTO";
                }

                else if (value.BGCL == "b02b2c") { //Vermelho Pardo - EM Apoio - Deslocado
                    disponibilidade_class = "status-alocado";
                    samu_disponibilidade = "EM APOIO - DESLOCADO";
                }

                else if (value.BGCL == "ff007f") { //rOSA - Desloc Higienização COVID
                    disponibilidade_class = "status-alocado";
                    samu_disponibilidade = "DESLOC. HIGIENIZAÇÃO COVID";
                }

                else if (value.BGCL == "ff0000") { //rOSA - Desloc Higienização COVID
                    disponibilidade_class = "status-alocado";
                    samu_disponibilidade = "HIGIENIZAÇÃO COVID";
                }
                
                else if (value.BGCL == "ffaa00") { //rOSA - Desloc Higienização COVID
                    disponibilidade_class = "status-alocado";
                    samu_disponibilidade = "RESERVADA";
                }

                else  {
                    disponibilidade_class = "status-desativado";
                    samu_disponibilidade = "NÃO IDENTIFICADO - COR "+value.BGCL;
                }

                id_Tr = ("idTr-"+value.TID);
                id_Td = ('idTd-'+value.TID);
                if($('#'+id_Tr).length){
                    $('#'+id_Tr).remove();
                }
                $("#resultado table tbody").append('<tr id=\'' + id_Tr + '\'class = \'' + disponibilidade_class + '\'><td><ul><li><b>SAMU '
                    + value.TXT + '</b><br></li></td><td id=\'' + id_Td + '\'>'
                    + samu_disponibilidade + '</td><td class="tempo_status">'+value.LAT+', '+value.LON
                    +'</td><td>SAMU</td><td><b>TODO O DF</b></td><td><b> - <b></td></tr>');            

            })
        }
 })
}

 function setTimerFunction(){
    // FUncao ativar timer
    loadRegulMed();
    inicioTimer = setInterval(loadRegulMed, 60000);
    inicioTimer;
    $('#FLG_ATUALIZA').change(function(){  
        this.checked ? inicioTimer : clearInterval(inicioTimer);
        alert(this.checked? "Atualização automática Ativada":"Atualização automática Desativada")
    });
    document.getElementById("ear-alerta-ocorrencias").remove();
    document.getElementById("btn-ear-alerta-ocorrencias").remove();
    document.getElementById("ear-lista-recursos").remove();
    document.getElementById("btn-ear-lista-recursos").remove();
    document.getElementById("btn-ear-comunicado-geral").remove();
    document.getElementById("ear-comunicado-geral").remove();
}

function set_tempo_status (){
    function FormataStringData(data) {
        var dia  = data.split("/")[0];
        var mes  = data.split("/")[1];
        var anohora  = data.split("/")[2];
      
        return mes + '/' + dia + '/' + anohora;
        // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
      }

    $('.tempo_status').each(function (index,element) {
        data_status = FormataStringData(element.getAttribute("name"));
        data_agora = new Date();
        diff_status = data_agora - new Date(data_status);
        options = { hour: 'numeric', minute: 'numeric', second: 'numeric'};

        diff_status_fmt = diff_status.toLocaleString("en-US",options)
        element.innerHTML = new Date(diff_status).toISOString().substr(11, 8);
    })
}


inclBtn();

//     document.getElementById("ear-alerta-ocorrencias").remove();
//     document.getElementById("ear-lista-recursos").remove();
//     document.getElementById("ear-comunicado-geral").remove();

// document.getElementById("btn_regul_med").addEventListener ("click", loadRegulMed, false);
setTimerFunction();
setInterval(set_tempo_status,1000)

