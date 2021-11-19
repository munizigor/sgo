//TODO:
// - FOcar apenas nas viaturas de UR por ora. Depois as URs. Depois todas as viaturas
// -2. Puxar 'Área de Atuação' a partir de request com base na unidade
// -3. Automatizar auditoria do preenchimento
// Para encontrar descrição das unidades: https://sgo.ssp.df.gov.br/Recursos/ajaxGetUnidadePorAgencia/2

// Adicionar botao Regul Méd
    botaoCores = document.getElementById("botaoCores").getElementsByTagName("ul")[0];
    botaoCores.insertAdjacentHTML("beforeend", `
    <li class="open">
        <span  id="btn_regul_med" class="btn btn-danger" title="Regulação Médica">Regulação Médica</span>
    </li>
`)

function loadRegulMed() {
    //Definicao de Variaveis
    
    var cod_agencia = "2";
    var cod_unidade = "0";
    var cod_unidade_mesa_atuacao = "0";
    var cod_tipo_recurso = "0";
    var nm_recurso = "";
    var qtd_registro_pagina = "80000";
    var cod_disponibilidade_recurso = "0";
    var pagina = "0";


      $.ajax({
        type: "POST",
        url: "/Recursos/ajaxGetBuscaRecursos/",
        dataType: "json",
        data: {
            cod_agencia: cod_agencia,
            cod_unidade: cod_unidade,
            cod_unidade_mesa_atuacao: cod_unidade_mesa_atuacao,
            cod_tipo_recurso: cod_tipo_recurso,
            nm_recurso: nm_recurso,
            qtd_registro_pagina: qtd_registro_pagina,
            cod_disponibilidade: cod_disponibilidade_recurso,
            pagina: pagina
        },
        success: function (data) {

            $("#resultado table").remove();
            $("#resultado").append("<table border = 1 align=center class='table table-condensed table-hover'></table>");
            $("#resultado table").append('<thead><tr><th>Recurso - Tipo Recurso</th><th>Disponibilidade</th><th>Agência - Unidade</th><th>Mesa / Área Atuação</th><th>Comandante</th><th>Observação</th><th></th></tr></thead>');
            $("#resultado table").append('<tfoot><tr><th>Recurso - Tipo Recurso</th><th>Disponibilidade</th><th>Agência - Unidade</th><th>Mesa / Área Atuação</th><th>Comandante</th><th>Observação</th></th><th>&nbsp;</th></tr></tfoot>');
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
                if (value.DSC_OBSERVACAO != "REGULAÇÃO MÉDICA"){
                    return true;
                }
                cod_recurso = value.COD_RECURSO;
                acao = "";
                let urlEditar = "";

                if ('True' == 'True' || 'False' == 'True' || 'False' == 'True' || 
                    'False' == 'True'|| 'False' == 'True')
                {
                     urlEditar = "<a href=\'/recursos/editar" + '?cod_recurso=' + cod_recurso + '&cod_agencia='
                        + cod_agencia + '&cod_tipo_recurso=' + cod_tipo_recurso + '&cod_unidade_mesa_atuacao=' + cod_unidade_mesa_atuacao
                        + '&nm_recurso=' + nm_recurso + '&cod_unidade=' + cod_unidade + '&qtd_registro_pagina=' + qtd_registro_pagina
                        + '&cod_disponibilidade=' + cod_disponibilidade_recurso + "\' title=\'Atualiza recurso selecionado\'><span class=\'btn btn-primary\'>Editar</span></a>";
               
                }

                if ("False" == "True" || "False" == "True"
                    || "False" == "True")
                {
                    urlExcluir = " |  <a href=\"/recursos/excluir?cod_recurso=" + cod_recurso + "&cod_agencia="
                        + cod_agencia + "&cod_unidade=" + cod_unidade + "&cod_unidade_mesa_atuacao=" + cod_unidade_mesa_atuacao
                        + "&cod_tipo_recurso=" + cod_tipo_recurso + "&nm_recurso=" + nm_recurso + '&qtd_registro_pagina='
                        + qtd_registro_pagina + '&cod_disponibilidade=' + cod_disponibilidade_recurso
                        + "\" OnClick=\"return confirm('Deseja realizar a exclusão?')\" title=\'Exclui recurso selecionado\'><span class=\"btn btn-danger btn-sm\">Excluir</span></a>";
                } else {
                    urlExcluir = "";
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

                id_Tr = ("idTr-"+cod_recurso);
                id_Td = ('idTd-'+cod_recurso);


                
                if (value.DT_ULTIMO_UPDATE_STATUS == null) {
                    DT_ULTIMO_UPDATE_STATUS = "";
                } else {
                    DT_ULTIMO_UPDATE_STATUS = value.DT_ULTIMO_UPDATE_STATUS;
                }
                $("#resultado table tbody").append('<tr id=\'' + id_Tr + '\'class = \'' + disponibilidade_class + '\'><td><ul><li><b>'
                    + value.NM_RECURSO + ' - ' + value.DSC_TIPO_RECURSO + '</b><br><ul><li><button class="button ativar" onclick="ativaDesativa(\''
                    + cod_recurso + '\',\'' + '1' + '\',\'' + id_Tr + '\',\'' + id_Td + '\')">ATIVAR</button><button class="button desativar" onclick="ativaDesativa(\''
                    + cod_recurso + '\',\'' + '3' + '\',\'' + id_Tr + '\',\'' + id_Td + '\')">DESATIVAR</button><li></ul></li></td><td id=\'' + id_Td + '\'>'
                    + value.LABEL_DISPONIBILIDADE + '<br><b>' + DT_ULTIMO_UPDATE_STATUS + '</td><td>' + value.NM_SIGLA_AGENCIA + ' - ' + value.NM_SIGLA_UNIDADE
                    + '</td><td><b>' + value.DSC_MESA_ATUACAO + ' - ' + value.LABEL_AREA_ATUACAO + '</b></td><td><b>' + value.NR_MATR_CMT_RECURSO_ATUAL_INTERNO
                    + ' - ' + value.NM_CMT_RECURSO_ATUAL_INTERNO + '<br>' + value.NR_TEL_CMT_RECURSO_ATUAL_INTERNO + '<b></td><td>' + value.DSC_OBSERVACAO + '</td><td>'
                    + urlEditar + urlExcluir + '</td></tr>');
            }
            )

            $("#resultado").append('</table>');
            $('#numeracao').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(total_registro / qtd_registro_pagina));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
 }

document.getElementById("btn_regul_med").addEventListener ("click", loadRegulMed, false);



