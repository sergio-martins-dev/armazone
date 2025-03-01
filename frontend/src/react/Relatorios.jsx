import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function Relatorios({ voltar }) {
	// Estados para os filtros
	const [estoqueId, setEstoqueId] = useState("");
	const [dataInicial, setDataInicial] = useState("");
	const [dataFinal, setDataFinal] = useState("");
	const [codigoBarras, setCodigoBarras] = useState("");

	// Lista de vendas retornadas
	const [listaVendas, setListaVendas] = useState([]);

	// Mensagem de erro ou sucesso
	const [mensagem, setMensagem] = useState(null);

	function limparMensagem() {
		setMensagem(null);
	}

	// Monta a query string conforme os campos preenchidos
	function gerarRelatorio() {
		limparMensagem(); // Limpa mensagem anterior
		setListaVendas([]); // Limpa resultado anterior

		// Monta a URL com parâmetros opcionais
		let queryParams = [];
		if (estoqueId) queryParams.push(`estoqueId=${estoqueId}`);
		if (dataInicial) queryParams.push(`dataInicial=${dataInicial}`);
		if (dataFinal) queryParams.push(`dataFinal=${dataFinal}`);
		if (codigoBarras) queryParams.push(`codigoBarras=${codigoBarras}`);

		const url = `http://localhost:4000/vendas/relatorio${
			queryParams.length > 0 ? `?${queryParams.join("&")}` : ""
		}`;

		fetch(url)
			.then(async (res) => {
				if (!res.ok) {
					const errorData = await res.json();
					throw new Error(errorData.message || "Erro ao obter relatório.");
				}
				return res.json();
			})
			.then((data) => {
				setListaVendas(data);
				setMensagem({
					tipo: "success",
					texto: "Relatório gerado com sucesso!"
				});
			})
			.catch((err) => {
				setMensagem({ tipo: "danger", texto: err.message });
			});
	}

	return (
		<Container className="mt-5 d-flex flex-column align-items-center">
			<Card className="p-4 shadow" style={{ maxWidth: "600px", width: "100%" }}>
				<Card.Title className="text-center fs-3">📊 Relatórios</Card.Title>

				{/* ALERTA DE MENSAGEM */}
				{mensagem && (
					<Alert
						variant={mensagem.tipo}
						onClose={limparMensagem}
						dismissible
						className="mt-3"
					>
						{mensagem.texto}
					</Alert>
				)}

				{/* FORMULÁRIO DE FILTROS */}
				<Form className="mt-3">
					{/* Estoque */}
					<Form.Group className="mb-3">
						<Form.Label>ID do Estoque</Form.Label>
						<Form.Control
							type="number"
							value={estoqueId}
							onChange={(e) => setEstoqueId(e.target.value)}
							placeholder="Ex: 2"
						/>
						<Form.Text className="text-muted">
							(Opcional) Se vazio, traz todos os estoques
						</Form.Text>
					</Form.Group>

					{/* Data Inicial */}
					<Form.Group className="mb-3">
						<Form.Label>Data Inicial</Form.Label>
						<Form.Control
							type="date"
							value={dataInicial}
							onChange={(e) => setDataInicial(e.target.value)}
						/>
					</Form.Group>

					{/* Data Final */}
					<Form.Group className="mb-3">
						<Form.Label>Data Final</Form.Label>
						<Form.Control
							type="date"
							value={dataFinal}
							onChange={(e) => setDataFinal(e.target.value)}
						/>
						<Form.Text className="text-muted">
							O filtro é feito ENTRE as datas e só funciona se ambas forem
							informadas
						</Form.Text>
					</Form.Group>

					{/* Código de Barras */}
					<Form.Group className="mb-3">
						<Form.Label>Código de Barras</Form.Label>
						<Form.Control
							type="text"
							value={codigoBarras}
							onChange={(e) => setCodigoBarras(e.target.value)}
							placeholder="Ex: 7891234567895"
						/>
						<Form.Text className="text-muted">
							(Opcional) Se vazio, traz todos os produtos
						</Form.Text>
					</Form.Group>

					<div className="text-center mt-4 d-flex gap-3 justify-content-center">
						<Button variant="primary" size="lg" onClick={gerarRelatorio}>
							Gerar Relatório
						</Button>
					</div>
				</Form>

				{/* LISTA DE VENDAS (se houver resultado) */}
				{listaVendas.length > 0 && (
					<ul className="list-group mt-4">
						{listaVendas.map((venda) => (
							<li key={venda.id} className="list-group-item">
								<strong>Produto:</strong> {venda.produto.nome} |{" "}
								<strong>Código de Barras:</strong> {venda.produto.codigoBarras}{" "}
								| <strong>Quantidade:</strong> {venda.quantidade} |{" "}
								<strong>Preço Total:</strong> R$ {venda.precoTotal} |{" "}
								<strong>Data:</strong>{" "}
								{new Date(venda.dataVenda).toLocaleString()} |{" "}
								<strong>Estoque:</strong> {venda.estoque.nome}
							</li>
						))}
					</ul>
				)}
			</Card>
		</Container>
	);
}

export default Relatorios;
