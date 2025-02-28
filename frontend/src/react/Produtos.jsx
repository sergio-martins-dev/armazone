import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

function Produtos({ voltar }) {
	const [modo, setModo] = useState(null);
	const [produto, setProduto] = useState({
		nome: "",
		preco: "",
		codigoBarras: ""
	});
	const [listaProdutos, setListaProdutos] = useState([]); // <--- NOVO: lista de produtos
	const [mensagem, setMensagem] = useState(null);

	function limparMensagem() {
		setMensagem(null);
	}

	function handleChange(e) {
		setProduto({ ...produto, [e.target.name]: e.target.value });
	}

	// === FUNÇÕES DE FETCH ===
	function listarProdutos() {
		fetch("http://localhost:4000/produtos")
			.then((res) => {
				if (!res.ok) throw new Error("Erro ao listar produtos.");
				return res.json();
			})
			.then((data) => {
				setListaProdutos(data); // Armazena a lista retornada
				setMensagem({
					tipo: "success",
					texto: "Produtos carregados com sucesso!"
				});
			})
			.catch((err) => {
				setMensagem({ tipo: "danger", texto: err.message });
			});
	}

	function criarProduto() {
		fetch("http://localhost:4000/produtos", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(produto)
		})
			.then(async (res) => {
				if (!res.ok) {
					const errorData = await res.json();
					throw new Error(errorData.message || "Erro ao criar produto.");
				}
				return res.json();
			})
			.then((data) => {
				setMensagem({
					tipo: "success",
					texto: data.message || "✅ Produto criado com sucesso!"
				});
				setProduto({ nome: "", preco: "", codigoBarras: "" });
			})
			.catch((err) => setMensagem({ tipo: "danger", texto: err.message }));
	}

	function atualizarProduto() {
		fetch(`http://localhost:4000/produtos/${produto.codigoBarras}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...(produto.nome && { nome: produto.nome }),
				...(produto.preco && { preco: parseFloat(produto.preco) })
			})
		})
			.then(async (res) => {
				if (!res.ok) {
					const errorData = await res.json();
					throw new Error(errorData.message || "Erro ao atualizar produto.");
				}
				return res.json();
			})
			.then((data) =>
				setMensagem({
					tipo: "success",
					texto: data.message || "🔄 Produto atualizado com sucesso!"
				})
			)
			.catch((err) => setMensagem({ tipo: "danger", texto: err.message }));
	}

	// === RENDERIZAÇÃO ===
	return (
		<Container className="mt-5 d-flex flex-column align-items-center">
			<Card className="p-4 shadow" style={{ maxWidth: "600px", width: "100%" }}>
				<Card.Title className="text-center fs-3">
					🛒 Gerenciar Produtos
				</Card.Title>

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

				{/* BOTÕES INICIAIS (SE NENHUM MODO SELECIONADO) */}
				{!modo && (
					<Row className="mt-4 gy-3">
						<Col xs={12}>
							<Button
								variant="primary"
								size="lg"
								className="w-100"
								onClick={() => {
									setModo("listar");
									listarProdutos(); // Carrega a lista de produtos
								}}
							>
								📋 Listar Produtos
							</Button>
						</Col>
						<Col xs={12}>
							<Button
								variant="primary"
								size="lg"
								className="w-100"
								onClick={() => setModo("criar")}
							>
								➕ Criar Produto
							</Button>
						</Col>
						<Col xs={12}>
							<Button
								variant="primary"
								size="lg"
								className="w-100"
								onClick={() => setModo("atualizar")}
							>
								🔄 Atualizar Produto
							</Button>
						</Col>
					</Row>
				)}

				{/* LISTA DE PRODUTOS */}
				{modo === "listar" && (
					<>
						<h4 className="text-center mt-3">Lista de Produtos</h4>
						{listaProdutos.length > 0 ? (
							<ul className="list-group mt-3">
								{listaProdutos.map((prod) => (
									<li key={prod.id} className="list-group-item">
										<strong>{prod.nome}</strong> - R$ {prod.preco}
										{" | "} Código de Barras: {prod.codigoBarras}
									</li>
								))}
							</ul>
						) : (
							<p className="text-center mt-3">Nenhum produto cadastrado.</p>
						)}

						<div className="text-center mt-4">
							<Button
								variant="secondary"
								size="lg"
								onClick={() => {
									setModo(null);
									setListaProdutos([]);
									limparMensagem();
								}}
							>
								🔙 Voltar
							</Button>
						</div>
					</>
				)}

				{/* FORMULÁRIO DE CRIAR/ATUALIZAR */}
				{(modo === "criar" || modo === "atualizar") && (
					<Form className="mt-4">
						<Form.Group controlId="formCodigoBarras" className="mb-3">
							<Form.Label>Código de Barras</Form.Label>
							<Form.Control
								type="text"
								name="codigoBarras"
								placeholder="Código de Barras"
								value={produto.codigoBarras}
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group controlId="formNome" className="mb-3">
							<Form.Label>Nome do Produto</Form.Label>
							<Form.Control
								type="text"
								name="nome"
								placeholder="Nome do Produto"
								value={produto.nome}
								onChange={handleChange}
							/>
						</Form.Group>

						<Form.Group controlId="formPreco" className="mb-3">
							<Form.Label>Preço</Form.Label>
							<Form.Control
								type="number"
								name="preco"
								placeholder="Preço"
								value={produto.preco}
								onChange={handleChange}
							/>
						</Form.Group>

						<div className="d-flex justify-content-center gap-3">
							<Button
								variant="primary"
								size="lg"
								onClick={modo === "criar" ? criarProduto : atualizarProduto}
							>
								{modo === "criar" ? "✅ Criar Produto" : "🔄 Atualizar Produto"}
							</Button>
							<Button
								variant="secondary"
								size="lg"
								onClick={() => {
									setModo(null);
									limparMensagem();
								}}
							>
								🔙 Voltar
							</Button>
						</div>
					</Form>
				)}
			</Card>
		</Container>
	);
}

export default Produtos;
