function inserir_botao_recurso () {

    var left_panel = document.getElementById("left-panel")
    if(typeof(left_panel) != 'undefined' && left_panel != null){
        left_panel = left_panel.getElementsByTagName("ul")[0]
    
    //TODO: Abrir página em outra tela que não listatelaajax
    
    //criando icone para Mostrar Recursos
        left_panel.insertAdjacentHTML("beforeend", `
            <li class="open">
                <a href="/relatorios/poderoperacional" title="Poder Operacional">
                    <i class="fa fa-lg fa-fw fa-fw fa-ambulance">
                    </i> 
            </li>
        `)
    }
}

inserir_botao_recurso ();

