function inserir_botao_recurso () {

    var left_panel = document.getElementById("left-panel").getElementsByTagName("ul")[0]
    
    //Remover botão de Despacho
    // btn_despacho = left_panel.getElementsByClassName("fa-sitemap")[0]
    // btn_despacho.parentNode.parentNode.remove()
    
    //criando icone para Mostrar Recursos
    left_panel.insertAdjacentHTML("beforeend", `
        <li class="open">
            <a href="/recursos/listatelaajax" title="Mostrar URs Reguladas">
                <i class="fa fa-lg fa-fw fa-fw fa-ambulance">
                </i> 
        </li>
    `)
}

inserir_botao_recurso ();

