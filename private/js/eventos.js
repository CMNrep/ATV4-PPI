const fEventos = document.getElementById('fEventos');
const adApi = "http://localhost:4000/eventos";


fEventos.onsubmit = validarEventos;
BuscarEventos()

function gravarEventos() {

    const objEvento = {
        nome : document.getElementById('inputName').value,
        data : document.getElementById('inputData').value,
        horario : document.getElementById('inputHora').value,
        local : document.getElementById('inputAddress').value,
        preco : document.getElementById('inputPrice').value,
        ingressosDispo : document.getElementById('inputIngressos').value,
        descricao : document.getElementById('inputDescription').value
    }

    fetch(adApi,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(objEvento),

    }).then((res) => {
        return res.json();
    }).then((apiRes) => {
        if (apiRes.status == true) {
            exbirMsg(apiRes.message, 'green');
        } else {
            exbirMsg(apiRes.message, 'red');
        }   
    }).catch((erro) => {
        exbirMsg(erro, 'blue');
    })
}

function selecionarEvento(nome, data, horario, preco, local, ingressosDispo, descricao, Acao) {

    document.getElementById('inputName').value = nome;
    document.getElementById('inputData').value = data;
    document.getElementById('inputHora').value = horario;
    document.getElementById('inputPrice').value = preco;
    document.getElementById('inputAddress').value = local;
    document.getElementById('inputIngressos').value = ingressosDispo;
    document.getElementById('inputDescription').value = descricao;

    const botaoConfirmacao = document.getElementById('botaoConfirmacao');
    if (Acao == 'EDITAR') {
        botaoConfirmacao.innerHTML = 'EDITAR';
    }
    else if (Acao == 'EXCLUIR') {
        botaoConfirmacao.innerHTML = 'EXCLUIR';
    }
}

function excluirEventos() {}

function atualizarEventos() {}

function BuscarEventos() {
    fetch(adApi,{method: 'GET'}).then((res) => {
        return res.json();
    }).then((resAPI)=>{
        if (resAPI.status == true) {
            exbirEventos(resAPI.eventos);
        }
        else{
            exbirMsg(resAPI.message, 'red');
        }
    }).catch((erro) => {
        exbirMsg(erro, 'blue'); 
    })
}
    

function validarEventos(evento) {

    const nome      = document.getElementById('inputName').value;
    const data      = document.getElementById('inputData').value;
    const horario   = document.getElementById('inputHora').value;
    const preco     = document.getElementById('inputPrice').value;
    const local     = document.getElementById('inputAddress').value;
    const ingressos = document.getElementById('inputIngressos').value;
    const descricao = document.getElementById('inputDescription').value;

    evento.stopPropagation();
    evento.preventDefault();
    
    if(nome && data && horario && preco && local && descricao && ingressos) {
        gravarEventos()
        fEventos.reset()
        BuscarEventos()
        return true
    }
    else {
        exbirMsg('Preencha todos os campos acima!', 'red');
        return false;
    }
}

function exbirMsg(mensagem, cor = "black") {
    const divMsg = document.getElementById("msg");
    divMsg.innerHTML = "<p style='color: " +cor +";'>" +mensagem +"</p>";
    setTimeout(() => {
        divMsg.innerHTML = "";
    }, 5000)
}

function exbirEventos(listaEventos) {
    if(listaEventos.length > 0){
        const tabEventos = document.getElementById('tabEventos');
        const tab = document.createElement('table');
        tab.classList="table table-striped table-hover";
        const tabHead = document.createElement('thead');
        tabHead.innerHTML = `
            <tr>
                <th>NOME</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Preço</th>
                <th>Endereço</th>
                <th>Ingressos</th>
                <th>Descrição:</th>
                <th>Modificar</th>
            </tr>
        `;
        const tabBody = document.createElement('tbody');
        for (const evento of listaEventos) {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${evento.nome}</td>
                <td>${evento.data}</td>
                <td>${evento.horario}</td>
                <td>${evento.preco}</td>
                <td>${evento.local}</td>
                <td>${evento.ingressosDispo}</td>
                <td>${evento.descricao}</td>
                <td>
                    <button style="border-radius: 9px; border: 1px solid black" onclick="selecionarEvento('${evento.nome}','${evento.data}','${evento.horario}','${evento.preco}','${evento.local}','${evento.ingressosDispo}',${evento.descricao}','EDITAR')">Alterar</button>
                    <button style="border-radius: 9px; border: 1px solid black" onclick="selecionarEvento('${evento.nome}','${evento.data}','${evento.horario}','${evento.preco}','${evento.local}','${evento.ingressosDispo}','${evento.descricao}','EXCLUIR')">Excluir</button>
                </td>
            `;
            tabBody.appendChild(linha);
        }
        tab.appendChild(tabHead);
        tab.appendChild(tabBody);
        tabEventos.innerHTML="";
        tabEventos.appendChild(tab);
    }
    else {
        exbirMsg('Nenhum evento encontrado');
    }
}

