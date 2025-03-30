const formCadViagens = document.getElementById("formPacote");
let acao = "cadastrar";
let idEdicao = null;

function manipularEnvio(evento) {
    evento.preventDefault();
    evento.stopPropagation();
    
    if (!formCadViagens.checkValidity()) {
        formCadViagens.classList.add("was-validated");
    } else {
        if (acao === "cadastrar") {
            adicionarViagens();
        } else if (acao === "atualizar") {
            atualizarPacotes();
        }
        formCadViagens.reset();
        acao = "cadastrar";
        idEdicao = null;
        atualizarBotoes();
        mostrarTabelaViagens();
    }
}

function pegarDadosViagens() {
    return {
        "id": idEdicao,
        "destino": document.getElementById("destino").value,
        "dataSaida": document.getElementById("dataSaida").value,
        "duracao": document.getElementById("duracao").value,
        "localPartida": document.getElementById("localPartida").value,
        "preco": document.getElementById("preco").value,
        "lugaresDisponiveis": document.getElementById("lugares").value,
        "hotelIncluso": document.getElementById("hotel").checked,
        "cafeManha": document.getElementById("cafe").checked,
        "almoco": document.getElementById("almoco").checked,
        "jantar": document.getElementById("jantar").checked,
        "passeiosTuristicos": document.getElementById("passeios").value
    };
}

function adicionarViagens() {
    fetch("http://localhost:4000/viagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pegarDadosViagens())
    }).then(res => res.json())
      .then(dados => mostrarMensagem(dados.mensagem, dados.status ? "success" : "danger"))
      .catch(erro => mostrarMensagem(erro, "danger"));
}

function atualizarPacotes() {
    if (!idEdicao) {
        mostrarMensagem("Erro: Nenhum pacote selecionado para atualização", "danger");
        return;
    }
    fetch("http://localhost:4000/viagem", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pegarDadosViagens())
    }).then(res => res.json())
      .then(dados => {
          mostrarMensagem(dados.mensagem, dados.status ? "success" : "danger");
          mostrarTabelaViagens();
      })
      .catch(erro => mostrarMensagem(erro, "danger"));
}

function excluirPacote(id) {
    fetch("http://localhost:4000/viagem", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }).then(res => res.json())
      .then(dados => {
          mostrarMensagem(dados.mensagem, dados.status ? "success" : "danger");
          mostrarTabelaViagens();
      })
      .catch(erro => mostrarMensagem(erro, "danger"));
}

function mostrarMensagem(mensagem, tipo="success") {
    const espacoMensagem = document.getElementById("mensagem");
    espacoMensagem.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensagem}</div>`;
    setTimeout(() => espacoMensagem.innerHTML = "", 5000);
}

function mostrarTabelaViagens() {
    fetch("http://localhost:4000/viagem", { method: "GET" })
        .then(res => res.json())
        .then(dados => {
            console.log(dados);
            const pacotes = dados.pacotes || [];
            const espacoTabela = document.getElementById("espacoTabela");
            espacoTabela.innerHTML = "";

            if (pacotes.length === 0) return mostrarMensagem("Nenhum pacote cadastrado", "warning");

            const tabela = document.createElement("table");
            tabela.className = "table table-striped table-hover";
            tabela.innerHTML = `
                <thead>
                    <tr>
                        <th>Destino</th><th>Data Saída</th><th>Duração</th>
                        <th>Local Partida</th><th>Preço</th><th>Lugares</th>
                        <th>Hotel</th><th>Café</th><th>Almoço</th>
                        <th>Jantar</th><th>Passeios</th><th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${pacotes.map(p => `
                        <tr>
                            <td>${p.destino}</td>
                            <td>${p.dataSaida}</td>
                            <td>${p.duracao}</td>
                            <td>${p.localPartida}</td>
                            <td>${p.preco}</td>
                            <td>${p.lugaresDisponiveis}</td>
                            <td>${p.hotelIncluso ? "Sim" : "Não"}</td>
                            <td>${p.cafeManha ? "Sim" : "Não"}</td>
                            <td>${p.almoco ? "Sim" : "Não"}</td>
                            <td>${p.jantar ? "Sim" : "Não"}</td>
                            <td>${p.passeiosTuristicos}</td>
                            <td>
                                <button class="btn btn-sm btn-warning" onclick='pegarPacotes(${JSON.stringify(p)})'>✏️</button>
                                <button class="btn btn-sm btn-danger" onclick='excluirPacote(${p.id})'>🗑️</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            espacoTabela.appendChild(tabela);
        })
        .catch(erro => {
            console.error("Erro ao buscar pacotes: ", erro);
            mostrarMensagem("Erro ao carregar pacotes", "danger");
        });
}

function pegarPacotes(pacote) {
    document.getElementById("destino").value = pacote.destino;
    document.getElementById("dataSaida").value = pacote.dataSaida;
    document.getElementById("duracao").value = pacote.duracao;
    document.getElementById("localPartida").value = pacote.localPartida;
    document.getElementById("preco").value = pacote.preco;
    document.getElementById("lugares").value = pacote.lugaresDisponiveis;
    document.getElementById("hotel").checked = pacote.hotelIncluso;
    document.getElementById("cafe").checked = pacote.cafeManha;
    document.getElementById("almoco").checked = pacote.almoco;
    document.getElementById("jantar").checked = pacote.jantar;
    document.getElementById("passeios").value = pacote.passeiosTuristicos;
    
    acao = "atualizar";
    idEdicao = pacote.id;
    atualizarBotoes();
}

function atualizarBotoes() {
    document.getElementById("atualizar").disabled = acao !== "atualizar";
    document.getElementById("excluir").disabled = acao !== "atualizar";
    document.getElementById("cadastrar").disabled = acao === "atualizar";
}

formCadViagens.onsubmit = manipularEnvio;
mostrarTabelaViagens();
