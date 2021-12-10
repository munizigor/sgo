//TODO:
// - FOcar apenas nas viaturas de UR por ora. Depois as URs. Depois todas as viaturas
// -2. Puxar 'Área de Atuação' a partir de request com base na unidade
// -3. Automatizar auditoria do preenchimento
// Para encontrar descrição das unidades: https://sgo.ssp.df.gov.br/Recursos/ajaxGetUnidadePorAgencia/2
// Adicionar botao Regul Méd
// COnsultar ocorrências: https://sgo.ssp.df.gov.br/Ocorrencia
// function inclBtnMatriz(){
//     $("#content").remove();
//     // $("ear-comunicado-geral").remove();
//     // $("btn-ear-comunicado-geral").remove(); TODO: Retirar abas COmunicados
//     // $("ear-alerta-ocorrencias").remove();
//     // $("btn-ear-alerta-ocorrencias").remove();
//     // $("ear-lista-recursos").remove();
//     // $("btn-ear-lista-recursos").remove();
//     // $("#main").append('<div class="row" id="botaoCores"></div>')
//     $("#main").append('<div class="row" id="resultadoRow"></div>')
//     $("#resultadoRow").append('<div style="align-content:center" id="resultado" class="col-md-12"></div>')
// //     $("#botaoCores").append(`
// //     <ul>
// //     <li class="open">
// //         <span  id="btn_matriz" class="btn btn-warning" title="Matriz">Poder Operacional</span>
// //     </li>
// //     </ul>
// // `)
// }

// inclBtnMatriz();

function loadInit () {

    $("#content").remove();
    // $("ear-comunicado-geral").remove();
    // $("btn-ear-comunicado-geral").remove(); TODO: Retirar abas COmunicados
    // $("ear-alerta-ocorrencias").remove();
    // $("btn-ear-alerta-ocorrencias").remove();
    // $("ear-lista-recursos").remove();
    // $("btn-ear-lista-recursos").remove();
    // $("#main").append('<div class="row" id="botaoCores"></div>')
    $("#main").append('<div class="row" id="resultadoRow"></div>')
    $("#resultadoRow").append('<div class="row" id="botaoCores"></div>')
    $("#botaoCores").append(`
        <ul>
            <li class="open">
                <span  id="btn_matriz" class="btn btn-warning" title="Poder">Poder Operacional</span>
            </li>
            <li class="open">
                <span  id="btn_regul_med" class="btn btn-danger" title="Regulacao">Regulação Médica</span>
            </li>
        </ul>
    `)
    $("#resultadoRow").append(`<div id="resultado" class="col-md-12" 
                            style="padding-right: 40px;padding-top: 20px;padding-left: 30px;"></div>`)
    $("#resultado").append("<table border = 1 align=center class='table table-condensed table-hover'></table>");
    $("#botaoCores").append( `
        <div class="col-md-12 form-check form-switch">
            <label>Atualização Automática</label>
            <input id="FLG_ATUALIZA" name="ATUALIZAÇÃO AUTOMÁTICA" type="checkbox" checked>
        </div>
    `);

}

function loadPoder () {
    //Definicao de Variaveis
    
    var cod_agencia = "2";
    var cod_unidade = "0";
    var cod_unidade_mesa_atuacao = "0";
    var cod_tipo_recurso = "0";
    var nm_recurso = "";
    var qtd_registro_pagina = "80000";
    var cod_disponibilidade_recurso = "0";
    var pagina = "0";

    var dict_servico=[];

    //Gerar colunas por Serviço
    $.ajax({
        type: "POST",
        url: location.origin+"/Recursos/ajaxGetServicoPorAgencia/2",
        dataType: "json",
    success: function (data) {
        $("#resultado table").remove();
        $("#resultado").append("<table border = 1 align=center class='table table-condensed table-hover'></table>");
        $("#resultado table").append('<thead><tr id="cabecalho"><th>MESA</th><th>UNIDADE</th><th>SIGLA</th><th>REGIÃO DE ATENDIMENTO</th></tr></thead>');

        $.each(data, function (key, value) {
            serv_sigla = value.NM_SIGLA
            serv_nome = value.NM_SERVICO

            dict_servico[serv_nome] = serv_sigla
            $("#resultado table tr").append('<th name='+serv_sigla+'>'+serv_nome+'</th>')
        })
        $("#resultado table").append('<tbody></tbody>');
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
    }
    }).then(function () {

    //Gerar linhas por unidade
    $.ajax({
        type: "POST",
        url: location.origin+"/Tabelas/ajaxGetBuscaUnidades/",
        dataType: "json",
        data: {
            cod_agencia: cod_agencia,
            qtd_registro_pagina: qtd_registro_pagina,
            pagina: pagina
        },
    success: function (data) {
        //Modelo de dados de Agencia

        // CHECK_SE_MESA_UNIDADE: false
        // COD_AGENCIA: 2
        // COD_BAIRRO: 2
        // COD_CIDADE: 5571
        // COD_SEGMENTO_SSPDS_SGO1: 0
        // COD_TIPO_UNIDADE: 0
        // COD_UF: 7
        // COD_UNIDADE: 206
        // COD_UNIDADE_PAI: 0
        // COD_UNIDADE_SEIOP: 0
        // COD_UNIDADE_SGO1: 0
        // COD_USUARIO_OPER: 0
        // COORDENADA_POINT: null
        // DSC_BAIRRO: "NORTE (ÁGUAS CLARAS)"
        // DSC_CIDADE: "ÁGUAS CLARAS"
        // DSC_ENDERECO: "Águas Claras – Av. Sibipiruna, Lote 07 – Águas Claras – DF"
        // DSC_UNIDADE: "25º GBM"
        // DSC_UNIDADE_PAI: "COCB BRAVO"
        // DT_CADASTRO: null
        // DT_EXCLUSAO_LOGICA: null
        // FLG_HABILITADA: false
        // FLG_RECEBE_DESPACHO: true
        // GM_SHAPE_UNIDADE: null
        // LABEL_REGIOES_ATENDIMENTO: "ÁGUAS CLARAS"
        // NM_AGENCIA: "CBMDF"
        // NM_SIGLA_UNIDADE: "BRAVO 9"
        // NR_LATITUDE: null
        // NR_LONGITUDE: null
        // NR_ORDENADOR: 0
        // NR_ORDENADOR_FILHO: 0
        // NR_TELEFONE: null
        // NR_UNIDADE_LATITUDE: null
        // NR_UNIDADE_LONGITUDE: null

        $.each(data.unidades, function (key, value) {
            if (!value.FLG_RECEBE_DESPACHO) {
                return true;
            }
            var ag_mesa = value.DSC_UNIDADE_PAI
            var ag_id = value.COD_UNIDADE
            var ag_dsc = value.DSC_UNIDADE
            var ag_regioes = value.LABEL_REGIOES_ATENDIMENTO
            var ag_sigla = value.NM_SIGLA_UNIDADE


            $("#resultado table tbody").append('<tr id=\'idUn-' + ag_id + '\'class = \'' 
            + '\'><td>'+ ag_mesa + '</td><td>'+ ag_dsc + '</td><td>'+ ag_sigla + '</td><td>'+ ag_regioes 
            + '</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
        });

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
    }
    });
    }).then(function () {

//AJAX para inserir as viaturas
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
        total_registro = data.quantidade_registro_retornado.QTD_REGISTRO_RETORNADO;
        $.each(data.recursos, function (key, value) {
            

            vtr_cod_unidade = value.COD_UNIDADE
            vtr_servico = dict_servico[value.NM_SERVICO]

            linha = document.getElementById("idUn-"+vtr_cod_unidade)
            coluna = document.getElementById("cabecalho").cells.namedItem(vtr_servico)
            linha = ((linha)? linha:document.getElementById("idUn-531"))//Provisorio
            coluna = ((coluna)? coluna:document.getElementById("cabecalho").cells.namedItem('NI'))//Provisorio
            if (!linha || !coluna){
                return true;
            }

            if (value.COD_DISPONIBILIDADE_RECURSO == 1) {

                disponibilidade_class = "status-ativo";
                //corLinha = "#16a085";
                /////se estiver ativa, desativá-la....
                //cod_disponibilidade = 3;
                // textoBotao = "Desativar";
            }
            else if (value.COD_DISPONIBILIDADE_RECURSO == 2) {
                disponibilidade_class = "status-alocado";
                //corLinha = "#e67e22";
            }
            else if (value.COD_DISPONIBILIDADE_RECURSO == 3) {
                disponibilidade_class = "status-desativado";
                ////////////estando desativada; ativá-la
                //cod_disponibilidade = 1;
                //textoBotao = "Ativar";
                // corLinha = "#FF7F50";
            }
            else if (value.COD_DISPONIBILIDADE_RECURSO == 7) {
                disponibilidade_class = "status-em-delegacia-hospital";
                ////////////estando desativada; ativá-la
                //cod_disponibilidade = "";
                //textoBotao = "Ativar";
                //corLinha = "#338DCD";
            }
            else {
                disponibilidade_class = "status-em-outra-situacao";
                //cod_disponibilidade = "";
                //corLinha = "#666";
            }

            idx = coluna.cellIndex
            linha.cells[idx].insertAdjacentHTML("beforeend", 
                    '<a href="/recursos/editar?cod_recurso='+value.COD_RECURSO+'&amp;cod_agencia=2" target="_blank">'
                    +'<span class="btnVtrs btn '+disponibilidade_class+' txt-color-white" title="'+value.LABEL_DISPONIBILIDADE+'"'
                    +'onclick="">'+value.NM_RECURSO+'</span></a>')
    
        }); 

    }


 });
 });
}


function loadRegulMed() {

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
        
        setTimerFunction();
        setInterval(set_tempo_status,1000);


}


loadInit ();
// loadPoder();

document.getElementById("btn_regul_med").addEventListener ("click", loadRegulMed, false);
document.getElementById("btn_matriz").addEventListener ("click", loadPoder, false);
// inclBtnMatriz();
// document.getElementById("btn_matriz").addEventListener ("click", loadMatriz, false)
//JSON de viaturas

  // COD_AGENCIA: 2
    // COD_DISPONIBILIDADE_RECURSO: 2
    // COD_RECURSO: 18265
    // COD_RECURSO_DISPONIVEL: 0
    // COD_RECURSO_SEIOP: null
    // COD_SERVICO: null
    // COD_STATUS: null
    // COD_TIPO_RECURSO: null
    // COD_UNIDADE: 193
    // COD_UNIDADE_MESA_ATUACAO: null
    // COD_UNIDADE_SEIOP: null
    // COD_USUARIO_OPER: 0
    // COD_USUARIO_OPER_CADASTRO: 0
    // COD_USUARIO_OPER_EXCLUSAO_LOGICA: 0
    // COD_USUARIO_OPER_ULTIMO_UPDATE: 0
    // DEL_HOSP: 0
    // DSC_AGENCIA: null
    // DSC_MESA_ATUACAO: "COCB ALFA"
    // DSC_OBSERVACAO: "NULL"
    // DSC_TIPO_RECURSO: "UNIDADE DE RESGATE"
    // DSC_UNIDADE: null
    // DT_CADASTRO: null
    // DT_EXCLUSAO_LOGICA: null
    // DT_HORA_FIM: "/Date(-62135586000000)/"
    // DT_HORA_INICIO: "/Date(-62135586000000)/"
    // DT_INDISPONIVEL: null
    // DT_ULTIMA_ATUALIZACAO_EXTERNO: null
    // DT_ULTIMA_ATUALIZACAO_INTERNO: "21/11/2021 06:41:58"
    // DT_ULTIMO_UPDATE: null
    // DT_ULTIMO_UPDATE_STATUS: "21/11/2021 12:21:42"
    // LABEL_AREA_ATUACAO: "ALFA"
    // LABEL_DADOS_CMT_EXTERNO: null
    // LABEL_DISPONIBILIDADE: "EM ATENDIMENTO (ALOCADA)"
    // LABEL_MESA_ATUACAO: null
    // LABEL_OCORRENCIA_VINCULADA: null
    // NM_CMT_RECURSO_ATUAL_EXTERNO: null
    // NM_CMT_RECURSO_ATUAL_INTERNO: "2º SGT CARLOS ANTONIIO   "
    // NM_NOME_CMDTE: null
    // NM_RECURSO: "UR 765"
    // NM_RECURSO_SGO1: null
    // NM_SERVICO: "ATENDIMENTO PRÉ-HOSPITALAR"
    // NM_SIGLA_AGENCIA: "CBMDF"
    // NM_SIGLA_TIPO_RECURSO: null
    // NM_SIGLA_UNIDADE: "ALFA 8"
    // NM_SIGLA_UNIDADE_ATIVACAO: null
    // NM_SITUACAO: null
    // NR_CELULAR: null
    // NR_LATITUDE: null
    // NR_LONGITUDE: null
    // NR_MATRICULA_CMDTE: null
    // NR_MATR_CMT_RECURSO_ATUAL_EXTERNO: null
    // NR_MATR_CMT_RECURSO_ATUAL_INTERNO: "1405324"
    // NR_OCORRENCIA: null
    // NR_QTD_EFETIVO_ATUAL_EXTERNO: 0
    // NR_QTD_EFETIVO_ATUAL_INTERNO: 3
    // NR_QUANTIDADE_EFETIVO: 0
    // NR_TEL_CMT_RECURSO_ATUAL_EXTERNO: null
    // NR_TEL_CMT_RECURSO_ATUAL_INTERNO: "991362128"
    // QTD_REGISTRO_PAGINA: 0
    // SGL_DISPONIBILIDADE_RECURSO: null