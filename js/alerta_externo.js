function alertar_compartilhamento () {

    //iterando pelas linhas da tabela
    tabela = document.getElementById("dt_basic").getElementsByTagName("tbody")[0];
    tab_len = tabela.rows.length-1
	for (var i = tab_len; row = tabela.rows[i]; i--) {
		let recurso = row.getElementsByTagName("td");
        let link = recurso[0].getElementsByTagName("a")[0]
        let link_txt = link.innerText
        if (link_txt.substring(8,11)!="002") {
            let cod_recurso = recurso[0].id.toString()
            $.get(location.origin+"/atendimento/imprimirdetalhamentocompleto?cod_teleatendimento="+cod_recurso).then(function(data){
                var el = document.createElement('html');
                el.innerHTML = data
                divs = el.getElementsByClassName("panel-title")
                divs_list = ""
                for (j=0;atendimentos = divs[j];j++) {
                    if (atendimentos.innerText.match(/MESA.*CBMDF/) && atendimentos.nextSibling.data.trim()!="Tipo Desfecho:") {
                        divs_list+="CBMDF"//pass
                    }
                    else{
                        divs_list+= atendimentos.innerText
                    }
                }
                divs_list_sem_cocb = divs_list.replace(/MESA.*CBMDF/g,"")
                // console.log("\n\n"+cod_recurso+" - \n\n"+divs_list_sem_cocb+"\n\n\n\n")
                return divs_list_sem_cocb
            }).then(function(){
                if (!divs_list_sem_cocb.includes("CBMDF")) {
                        recurso[5].innerHTML="<h3>QTO EXTERNA SEM DESPACHO<br><br><strong>DESPACHAR IMEDIATAMENTE</strong></h3>"
                        recurso[0].parentNode.style.backgroundColor="indianred";
                        tabela.insertAdjacentElement('afterbegin',recurso[0].parentNode)
                }
            }
                )

                }
        }
      }

//TODO: COlocar alerta sonoro
alertar_compartilhamento ();

