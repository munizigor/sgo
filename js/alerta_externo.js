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
    tabela = document.getElementById("dt_basic");
    for (var i = 1, row; row = tabela.rows[i]; i++) {
        recurso = row.getElementsByTagName("td");
        if (recurso[5].innerText=="") {
            compartilhar_botao = row.querySelector('[title="Compartilhar"]');
            compartilhar_botao.style.animation="blinkingBackground 2s infinite"
            row.style.backgroundColor="indianred";
            tabela.insertAdjacentElement('afterbegin',row)
            //row.style.animation="blinkingBackground 2s infinite"
            //recurso[5].innerText="DESPACHAR IMEDIATAMENTE";
        }
      }
}
//TODO: COlocar alerta sonoro
//TODO: Vermelho menos intenso no background
alertar_compartilhamento ();

