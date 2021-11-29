//Imprimir

function imprimir() {
style = `
		<meta charset="utf-8" >
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
		<link rel="stylesheet" href="static/css/base.css">
`

cabecalho = `
</br>
<div class="form-row">
<div class="form-group col-md-2">
	<img src="static/img/brasao.png" alt="Brasao" height="120" width="120">
</div>
<div class="form-group col-md-8" >
<h6>CORPO DE BOMBEIROS MILITAR DO DISTRITO FEDERAL</h6>
<h6>DEPARTAMENTO DE RECURSOS HUMANOS</h6>
<h6>DIRETORIA DE GESTÃO DE PESSOAL</h6>
<h6>SEÇÃO DE PAGAMENTO</h6>
</div>
<div class="form-group col-md-2">
	<img src="static/img/gdf.png" alt="Brasao" height="120" width="120">
</div>
</div>
</br>
<div class="dropdown-divider"></div>
<h3><b>PLANILHA DE CÁLCULO DE DIÁRIAS E AJUDA DE CUSTO</b></h3>
</br>
</br>
`
    var mywindow = window.open('', 'PRINT','height=400,width=600');
    mywindow.document.write('<html><head><title>Planilha de Pagamento - Diárias</title>');
    mywindow.document.write(style)
    mywindow.document.write('</head><body>');
    mywindow.document.write(`<div class="content container">`)
    mywindow.document.write(cabecalho)
      h=document.getElementById('planilha').outerHTML
      mywindow.document.write(h)
      mywindow.document.write('</div>')
      mywindow.document.write('</body></html>');
      mywindow.focus();
      setTimeout(function(){mywindow.print();},1000);
      return true;
}

//Mostrar texto Ajuda
function mostrarmissao() {
    var elem = document.getElementById("dadosgerais")
    alerta = (`
        <div class="alert alert-success" id='alertamissao'role="alert">
			  <h4 class="alert-heading">Definição das missões (Conforme Decisão Ordinária TCDF 4663/2009)</h4>
<p><b>EVENTUAL</b>: Missão <b>inferior a 30 dias</b>, que <b>não acarreta mudança de domicílio</b> do militar.
<b>Não gera direito à percepção de ajuda de custo</b>, transporte de bagagem, veículo e dependentes;</p>

<p><b>NÃO EVENTUAL</b>: Missão <b>igual ou superior a 30 dias</b>, que <b>acarreta a mudança de domicílio</b>
do militar. <b>Gera direito à percepção de ajuda de custo</b>, transporte de bagagem, veículo e dependentes;</p>
<h5>OBSERVAÇÕES:</h5>

<p>1- A missão <b>superior a 30 dias e inferior a 60 dias</b> poderá ser classificada como <b>eventual ou não eventual
</b>, mas, <b>em qualquer caso</b>, <b>não será cabível o pagamento cumulativo de diárias e ajuda de custo</b>;</p>

<p>2- A missão <b>superior a 60 dias</b> poderá ser classificada como <b>eventual ou não eventual</b>, porém <b>só será
cabível a percepção cumulativa de diárias e ajuda de custo caso a missão seja classificada como eventual, não gerando
direito à percepção de transporte de bagagem, veículo e dependentes</b>;</p>
		</div>
			`)
    elem.insertAdjacentHTML('beforeend', alerta);
}

function removermissao() {
    document.getElementById("alertamissao").remove()
}

function cotarpassagem() {
//    if (!checar_campos()) {
    if (false) {
        return;
    }
    else{
    if (document.getElementById("passagem_bool").checked) {
    document.getElementById("div_passagem").style.display='block';
    }
    else {
    document.getElementById("div_passagem").style.display='none';
    }
}
}

function rounddown(x) {
    return Math.floor(x*100)/100
}
function parseMoney (x) {
    return x.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
}


function militar(n) {
//				TODO: Explicar como preencher ACP
//				TODO: alert em Banco INFORMANDO QUE NÃO PODE SER CONTA SALÁRIO E QUE PODE SER QUALQUER conta
return (`<div class="form-row militares-row mil-${n} border rounded" id="mil-${n}">
				<div class="form-row col-md-11">
				<div class="form-group col-md-1">
				  <label for="matricula-${n}">Matrícula</label>
				  <input type="text" id="matricula-${n}" name="matricula" class="form-control">
				</div>
				<div class="form-group col-md-2">
				  <label for="posto-${n}">Posto/Grad</label>
				  <select name="posto" class="form-control" required id="posto-${n}">
					 <option value="null"></option>
					 <option value="CEL CMT-GERAL">CEL CMT-GERAL</option>
					 <option value="CORONEL">CEL</option>
					 <option value="TENENTE-CORONEL">TC</option>
					 <option value="MAJOR">MAJ</option>
					 <option value="CAPITAO">CAP</option>
					 <option value="PRIMEIRO TENENTE">1º TEN</option>
					 <option value="SEGUNDO TENENTE">2º TEN</option>
					 <option value="ASPIRANTE">ASP</option>
					 <option value="SUBTENENTE">ST</option>
					 <option value="PRIMEIRO SARGENTO">1º SGT</option>
					 <option value="SEGUNDO SARGENTO">2º SGT</option>
					 <option value="TERCEIRO SARGENTO">3º SGT</option>
					 <option value="CABO">CB</option>
					 <option value="SOLDADO PRIMEIRA CLASSE">SD/1</option>
					 <option value="SOLDADO SEGUNDA CLASSE">SD/2</option>
					 <option value="CADETE DEMAIS ANOS">CAD/1</option>
					 <option value="CADETE ULTIMO ANO">CAD/2</option>
				  </select>
				</div>
				<div class="form-group col-md-4">
				  <label for="nome-${n}">Nome</label>
				  <input type="text" id="nome-${n}" name="nome" class="form-control">
				</div>
				<div class="form-group col-md-2">
				  <label for="cpf-${n}">CPF</label>
				  <input type="text" id="cpf-${n}" name="cpf"  class="form-control cpf" onblur='ChecaCPF ("cpf-${n}")'>
				</div>
				<div class="form-group col-md-3">
				  <label for="banco-${n}">Banco</label>
				  <input type="text" id="banco-${n}" name="banco" class="form-control banco">
				</div>
				<div class="form-group col-md-1">
				  <label for="agencia-${n}">Agência</label>
				  <input type="text" id="agencia-${n}" name="agencia" class="form-control">
				</div>
				<div class="form-group col-md-1">
				  <label for="conta-${n}">Conta</label>
				  <input type="text" id="conta-${n}" name="conta" class="form-control">
				</div>
				<div class="form-group col-md-2 ajudadecusto_var" style="display:none;">
			  		<label for="dep-${n}">Viajará com Dependente?</label>
			  		<select name="dep" class="form-control ajudadecusto_var" id="dep-${n}">
					<option value="null"></option>
					<option value=1>SIM</option>
					<option value=2>NÃO</option>
			  		</select>
				</div>
				<div class="form-group col-md-3 ajudadecusto_var" id="acp-${n}" style="display:none;">
			  		<label for="acp-${n}">Cursos que possui</label>
			  		</br>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="acp_10-${n}" value=10>
                      <label class="form-check-label" for="acp_10-${n}">Formação (CFSD, CFO, CHO)</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="acp_15-${n}" value=15>
                      <label class="form-check-label" for="acp_15-${n}">Especialização (CESEI, CMAUT, SCI...)</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="acp_20-${n}" value=20>
                      <label class="form-check-label" for="acp_20-${n}">Aperfeiçoamento (CAP, CAO)</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="checkbox" id="acp_30-${n}" value=30>
                      <label class="form-check-label" for="acp_30-${n}">Altos Estudos (CAEP, CAEO)</label>
                    </div>
				</div>
				</div>
				<div class="form-group col-md-1">
					<button class="botao-add" id="add-${n}" title="Adicionar linha">
					<button class="botao-del" id="del-${n}" title="Excluir linha">
				</div>
			</div>
			</br>
			`);
			}

function diarias(l) {

    destino = document.getElementById('destino').value
    posto = document.getElementById("posto-"+String(l)).value
    qtde_diarias=document.getElementById('qtde_diarias').value
    diaria_val = diarias_nac[destino][posto]
    bruto = (Math.round(diaria_val*qtde_diarias*100)/100)
    alim = -(Math.round((850/30)*qtde_diarias*100)/100)
    liq = (parseFloat(bruto) + parseFloat(alim))
    return (
`<tbody class="diarias-row">
    <tr>
        <td>${document.getElementById("matricula-"+String(l)).value}</td>
        <td>${document.getElementById("posto-"+String(l)).value}</td>
        <td>${document.getElementById("nome-"+String(l)).value.toUpperCase()}</td>
        <td>R$ ${parseMoney(diaria_val)}</td>
        <td>R$ ${parseMoney(bruto)}</td>
        <td>R$ ${parseMoney(alim)}</td>
        <td>R$ ${parseMoney(liq)}</td>
    </tr>
</tbody>`
    );
}

function ajudadecusto(l) {
    ind = document.getElementById("acp-"+String(l)).getElementsByTagName('input')
    acp=0;
    for (count=0;count<ind.length;count++) {
    if (ind[count].checked) {
        acp+= parseInt(ind[count].value)
    }
    }

    posto = document.getElementById("posto-"+String(l)).value;
    if (posto == "CEL CMT-GERAL") {
        posto ="CORONEL";
    }
    if (ats[document.getElementById("matricula-"+String(l)).value]==undefined) {
        tempo_serv=0;
    }
    else {
        tempo_serv=rounddown((parseFloat(ats[document.getElementById("matricula-"+String(l)).value])/100)*
                                parseFloat(remuneracao[posto]['soldo']));
    }
    cert_prof = rounddown((parseFloat(acp)/100)*
                            parseFloat(remuneracao[posto]['soldo']));
//cert_prof = 0;
    remun =rounddown(parseFloat(remuneracao['gcef']) + parseFloat(remuneracao['grv']) +
                parseFloat(remuneracao[posto]['soldo']) + parseFloat(remuneracao[posto]['vpe']) +
                parseFloat(remuneracao[posto]['apg']) + parseFloat(remuneracao[posto]['aom']) +
                parseFloat(remuneracao[posto]['gfr']) + tempo_serv + cert_prof)
    ajuda_ida = remun*parseFloat(document.getElementById('ajudadecusto_ida').value)
    ajuda_volta = remun*parseFloat(document.getElementById('ajudadecusto_volta').value)
    if (parseInt(document.getElementById("dep-"+String(l)).value)==2) {
    ajuda_ida = ajuda_ida/2
    ajuda_volta = ajuda_volta/2
    }
    dep = document.getElementById("dep-"+String(l))
    return (
`<tbody class="ajudadecusto-row">
    <tr>
        <td>${document.getElementById("matricula-"+String(l)).value}</td>
        <td>${document.getElementById("posto-"+String(l)).value}</td>
        <td>${document.getElementById("nome-"+String(l)).value.toUpperCase()}</td>
        <td>R$ ${parseMoney(remun)}</td>
        <td>${dep.options[dep.selectedIndex].text.toUpperCase()}</td>
        <td>R$ ${parseMoney(ajuda_ida)}</td>
        <td>R$ ${parseMoney(ajuda_volta)}</td>
        <td>R$ ${parseMoney(ajuda_ida + ajuda_volta)}</td>
    </tr>
</tbody>`
    );
}


function financeiro(l) {
//    posto = document.getElementById("posto-"+String(l));
//    posto_txt= posto.options[posto.selectedIndex].text;
    return (
`<tbody class="financeiro-row">
    <tr>
        <td>${document.getElementById("nome-"+String(l)).value.toUpperCase()}</td>
        <td>${document.getElementById("cpf-"+String(l)).value}</td>
        <td>${document.getElementById("banco-"+String(l)).value.toUpperCase()}</td>
        <td>${document.getElementById("agencia-"+String(l)).value.toUpperCase()}</td>
        <td>${document.getElementById("conta-"+String(l)).value.toUpperCase()}</td>
    </tr>
</tbody>`
    );
}

function dadosgerais() {
destino = document.getElementById("destino")
missao = document.getElementById("missao")
dados_str= (`
<div id='dadosgerais-row' style="font-size:medium">
<ul class="list-inline">
<li class="list-inline-item"><b>Descrição da Viagem:</b> ${document.getElementById("descricao").value.toUpperCase()}</li>
</ul>
<ul class="list-inline">
<li class="list-inline-item"><b>Boletim Geral ou SEI:</b> ${document.getElementById("publ_of").value.toUpperCase()}</li>
<li class="list-inline-item"><b>Destino:</b> ${destino.options[destino.selectedIndex].text.toUpperCase()}</li>
</ul>
<ul class="list-inline">
<li class="list-inline-item"><b>Data de Saída da Sede:</b> ${document.getElementById("data_saida").value}</li>
<li class="list-inline-item"><b>Data de Retorno pra Sede:</b> ${document.getElementById("data_retorno").value}</li>
</ul>
<ul class="list-inline">
<li class="list-inline-item"><b>Missão:</b> ${missao.options[missao.selectedIndex].text.toUpperCase()}</li>
<li class="list-inline-item"><b>Dias de Afastamento:</b> ${document.getElementById("qtde_dias").value}</li>
</ul>
<ul class="list-inline">
<li class="list-inline-item"><b>Quantidade de Diárias:</b> ${parseFloat(document.getElementById("qtde_diarias").value).toLocaleString()}</li>
</ul>
<ul class="list-inline">
<li class="list-inline-item"><b>Ajuda de Custo - Ida:</b> ${document.getElementById("ajudadecusto_ida").value}</li>
<li class="list-inline-item"><b>Ajuda de Custo - Volta:</b> ${document.getElementById("ajudadecusto_volta").value}</li>
</ul>
</div>
`)

elem=document.getElementById('dadosgerais_div')
elem.insertAdjacentHTML("beforeend", dados_str)
}
