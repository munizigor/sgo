function alertar_compartilhamento () {
    //criando tag style para glowing buttons
    document.head.insertAdjacentHTML("beforeend", `
    <style>
        @keyframes blinkingBackground{
            0%		{ background-color: #10c018;}
            25%		{ background-color: #1056c0;}
            50%		{ background-color: #ef0a1a;}
            75%		{ background-color: #254878;}
            100%	        { background-color: #04a1d5;}
        }
    </style>
    `)

    //iterando pelas linhas da tabela
    tabela = document.getElementById("dt_basic").getElementsByTagName("tbody")[0];
    tab_len = tabela.rows.length-1
	for (var i = tab_len; row = tabela.rows[i]; i--) {
		recurso = row.getElementsByTagName("td");
        link = recurso[0].getElementsByTagName("a")[0]
        link_txt = link.innerText
        if (link_txt.substring(8,11)!="002") {
            ocorrencia_url = location.origin+"/atendimento/imprimirdetalhamentocompleto?cod_teleatendimento="+recurso[0].id.toString()
            console.log(ocorrencia_url)
            $.ajax({
                type: "GET",
                url: ocorrencia_url,
                dataType: "html",
            success: function (data) {
                var el = document.createElement('html');
                el.innerHTML = data
                divs = el.getElementsByClassName("panel-title")
                for (i=0;atendimentos = divs[i];i++) {
                    console.log(atendimentos.innerText+" ----- "+recurso[0].id)
                    if (atendimentos.innerText.includes("CBMDF")) {
                        // console.log("Ocorrencia "+recurso[0].id+" atendida pelo CBMDF")
                    }
                    else {
                        // console.log("Ocorrencia "+recurso[0].id+" não atendida pelo CBMDF")
                        // recurso[5].innerHTML="<h3><strong>QTO EXTERNA<br><br>VERIFICAR SE HOUVE DESPACHO</strong></h3>"
                        // row.style.backgroundColor="indianred";
                        // tabela.insertAdjacentElement('afterbegin',row)
                    }

                }
                

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
            }
            })


        }
      }
}
//TODO: COlocar alerta sonoro
//TODO: Vermelho menos intenso no background
alertar_compartilhamento ();

