// function lerAtendimentos () {
//     //iterando pelas linhas da tabela
//     tabela = document.getElementById("dt_basic").getElementsByTagName("tbody")[0];
//     tab_len = tabela.rows.length-1
// 	for (var i = tab_len; row = tabela.rows[i]; i--) {
// 		let recurso = row.getElementsByTagName("td");
//         let link = recurso[0].getElementsByTagName("a")[0]
//         // let link_txt = link.innerText.replace(/\D/g,'');
//             let url_teleatendimento = link.href
//             $.get(url_teleatendimento).then(function(data){
//                 var el = document.createElement('html');
//                 el.innerHTML = data
//                 console.log(el)
//             });

//     }
// }

function alertar_compartilhamento () {
    //iterando pelas linhas da tabela
    tabela = document.getElementById("dt_basic").getElementsByTagName("tbody")[0];
    tab_len = tabela.rows.length-1
	for (var i = tab_len; row = tabela.rows[i]; i--) {
		let recurso = row.getElementsByTagName("td");
        let link = recurso[0].getElementsByTagName("a")[0]
        let link_txt = link.innerText.replace(/\D/g,'');
        if (link_txt.substring(8,11)!="002") {
            let url_teleatendimento = link.href
            $.get(url_teleatendimento).then(function(data){
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
                return divs_list_sem_cocb
            }).then(function(){
                if (!divs_list_sem_cocb.includes("CBMDF")) {
                        // recurso[5].innerHTML="<h3>QTO EXTERNA SEM DESPACHO<br><br><strong>DESPACHAR IMEDIATAMENTE</strong></h3>"
                        // recurso[0].parentNode.style.backgroundColor="indianred"; //TODO: Remover fundo vermelho. Deixar apenas nas ocorr??ncias em atraso
                        recurso[0].insertAdjacentHTML("beforeend", `
                        <p class="small" name="aviso_externa" style="color:red">
                            QTO EXTERNA SEM DESPACHO<br><br><strong>DESPACHAR IMEDIATAMENTE</strong>
                        </p>
                    `);
                        tabela.insertAdjacentElement('afterbegin',recurso[0].parentNode)
                }
            }
                )

                }
        }
      }

// lerAtendimentos ();

alertar_compartilhamento ();

