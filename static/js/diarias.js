
//Início dos Parâmetros iniciais
		//Validar CPF
	function TestaCPF(strCPF) {
        var Soma;
        var Resto;
        Soma = 0;
//        strCPF = document.getElementById("cpf").value.replace(/[.-]/g,'')
      if (strCPF == "00000000000") return false;

      for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

      Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }
        //Fim Validar CPF
        //Inicio checagem campos obrigatórios
    function checar_campos() {
        req = document.querySelectorAll("[required]")
        for (i=0;i<req.length;i++) {
            if (req[i].value==""||req[i].value=="null"){
                alert("Campo "+req[i].labels[0].textContent+" vazio");
                document.getElementById("planilha").style.display="none";
                setTimeout(function () {document.getElementById(req[i].id).focus();},1);

                return false;
                }
        }
        return true;
    }
        //Fim checagem campos obrigatórios

		$(".data").datepicker({
		    changeMonth: true,
            changeYear: true,
            onSelect: function () { calc_datas(event)},
            dateFormat: 'dd/mm/yy',
            dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
            dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
            dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
            monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
            nextText: 'Próximo',
            prevText: 'Anterior',

        });
    function toDate(id) {
    dateStr = document.getElementById(id).value
    var parts = dateStr.split("/");
    return new Date(String(parts[1])+'/'+String(parts[0])+'/'+String(parts[2]));
    }

function params_ajudacusto () {
    elems_ajudacusto = document.getElementsByClassName('ajudadecusto_var');
    if (parseInt(document.getElementById('ajudadecusto_ida').value)==0 && parseInt(document.getElementById('ajudadecusto_volta').value)==0) {
        for (i=0;i<elems_ajudacusto.length;i++) {
            elems_ajudacusto[i].style.display='none';
            elems_ajudacusto[i].required = false;
        }
    }
    else {
        for (i=0;i<elems_ajudacusto.length;i++) {
            elems_ajudacusto[i].style.display='block';
            elems_ajudacusto[i].required = true;
        }
    }
    }


    function calc_datas (event) {
        var datas = document.getElementsByClassName('data');
        if (datas[0].value!="" && datas[1].value!="") {
            if (toDate('data_retorno') < toDate('data_saida')) {
            alert ("Data de Chegada deve ser igual ou maior que a Data de Saída")
             document.getElementById("data_saida").value=""
            document.getElementById("data_retorno").value=""
            diffdias = 0
            }
            else {
                difftempo = Math.abs(toDate('data_retorno')-toDate('data_saida'));
                diffdias = Math.ceil(difftempo/(1000 * 60 * 60 * 24))+1;
            }
            document.getElementById('qtde_dias').value = diffdias

//Parametros de Tipo de Missão
        if (event.target.id!='missao'){
            if ((diffdias<30)) {
                document.getElementById('missao').value = 'True'
                document.getElementById('missao').setAttribute('disabled', true);
            }
            else if (diffdias>=30 && diffdias<60) {
                document.getElementById('missao').value = 'False'
                document.getElementById('missao').removeAttribute('disabled');
            }
            else {
                document.getElementById('missao').value = 'True'
                document.getElementById('missao').removeAttribute('disabled');
            }
        }

//Parametros de diarias

            if ((diffdias<30 && diffdias > 0)) {
                diffdiarias = parseFloat(diffdias)-(0.5)
            }
            else if (diffdias>=30 && diffdias<=60 && document.getElementById('missao').value == 'True') {
                diffdiarias = parseFloat(diffdias)-(0.5)
            }
            else if (diffdias>=30 && diffdias<=60) {
                diffdiarias = 0
            }
            else if (diffdias > 0 && document.getElementById('missao').value == 'True') {
                diffdiarias = parseFloat(diffdias)-60
            }
            else {
                diffdiarias = 0
            }
            document.getElementById('qtde_diarias').value = diffdiarias

    //Parametros de Ajuda de Custo

            if ((diffdias<30)) {
                document.getElementById('ajudadecusto_ida').value=0
                document.getElementById('ajudadecusto_volta').value=0
            }
            else if (diffdias>=30 && diffdias<=60 && document.getElementById('missao').value == 'False') {
                document.getElementById('ajudadecusto_ida').value=1
                document.getElementById('ajudadecusto_volta').value=1
            }
            else if (diffdias>=30 && diffdias<=60 && document.getElementById('missao').value == 'True') {
                document.getElementById('ajudadecusto_ida').value=0
                document.getElementById('ajudadecusto_volta').value=0
            }
            else if (diffdias>180) {
                document.getElementById('ajudadecusto_ida').value=2
                document.getElementById('ajudadecusto_volta').value=2
            }
            else if (diffdias>90 && diffdias<=180) {
                document.getElementById('ajudadecusto_ida').value=2
                document.getElementById('ajudadecusto_volta').value=1
            }
            else if (diffdias>=30 && diffdias<=90) {
                document.getElementById('ajudadecusto_ida').value=1
                document.getElementById('ajudadecusto_volta').value=1
            }
            else {
                document.getElementById('ajudadecusto_ida').value=0
                document.getElementById('ajudadecusto_volta').value=0
            }
    //Sumir com ACP e Dependente se nao houver ajuda de custo
            params_ajudacusto ()
    }
    }

        $(".data").mask("00/00/0000");
        $(".cpf").mask("000.000.000-00");
//Fim dos Parâmetros Iniciais

//Início das Linhas de Militares

        $("div.militares").on('click','button.botao-add', function(e) {
                n+=1;
                c+=1;
                var elem = document.getElementById("militares")
                elem.insertAdjacentHTML('beforeend', militar(c));
                //Sumir com ACP e Dependente se nao houver ajuda de custo
                params_ajudacusto ();
                $(".cpf").mask("000.000.000-00");
                setTimeout(banco_autocomplete (),500)

            }
        );
        $("div.militares").on('click','button.botao-del', function(e) {
                if (n != 1) {
                    document.getElementById("mil-"+this.id.substring(4)).remove();
                    n-=1;
                    //Sumir com ACP e Dependente se nao houver ajuda de custo
                    params_ajudacusto ();
                    $(".cpf").mask("000.000.000-00");
                    }
            }
        );

//Fim das Linhas de Militares

//Início das Funções
//Verificar CPF

function ChecaCPF (id) {
        cpf_elem = document.getElementById(id)
            cpf = cpf_elem.value.replace(/[.-]/g,'');
            if (cpf!="") {
                    if (!TestaCPF(cpf)) {
                        alert("CPF Inválido. Digite o número correto");
                        cpf_elem.style.color = "red";
                        setTimeout(function () {cpf_value.focus();},1);
                    }
                    else {
                    cpf_elem.style.color = "#495057";
                    }
            }
    }

//Funçoes de calculos individuais
function calc_ind(id) {
    $('.'+id+'-row').remove();
    for (i=0; i<t.length; i++) {
        var index = t[i].getAttribute('id').substring(4);
        elem = document.getElementById(id);
        elem.insertAdjacentHTML('beforeend', window[id](index));
    }
}

//Termino funcoes calculos individuais
function calcular() {
//    Antes de calcular, checar se campos estao preenchidos
    if (!checar_campos()) {
//    if (false) {
        return;
    }
    else{
    document.getElementById('planilha').style.display='block';
    if (document.getElementById('dadosgerais-row')!=null) {
        document.getElementById('dadosgerais-row').remove()
    }
    dadosgerais()
    t=document.getElementsByClassName("militares-row");
    calc_ind('financeiro')
    calc_ind('diarias')
//    TODO: Calcular soma diarias
    calc_ind('ajudadecusto')
//    TODO: Calcular soma ajuda de custo
//Aparecer/desaparecer div diarias
    if (parseFloat(document.getElementById('qtde_diarias').value)==0) {
        document.getElementById('diarias_div').style.display='none';
    }
    else {
            document.getElementById('diarias_div').style.display='block';
    }

//Aparecer/desaparecer div ajuda de custo
    if (parseInt(document.getElementById('ajudadecusto_ida').value)==0 && parseInt(document.getElementById('ajudadecusto_volta').value)==0) {
        document.getElementById('ajudadecusto_div').style.display='none';
    }
    else {
            document.getElementById('ajudadecusto_div').style.display='block';
    }
    }

}

function limpar() {
    $(':input').val('');
}

function exportar() {
    calcular()
    alert ("Exportar");
}

function gerarPDF() {
    if (!checar_campos()) {
//    if (false) {
        return;
    }
    else{
    calcular()
    imprimir ()
}
}
//Término das Funções