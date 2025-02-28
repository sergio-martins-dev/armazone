import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

function Produtos() {
	const [historico, setHistorico] = useState(["menu"]);
	const [modo, setModo] = useState(null);
	const [produto, setProduto] = useState({
		nome: "",
		preco: "",
		codigoBarras: ""
	});
	const [mensagem, setMensagem] = useState(null);

	function handleChange(e) {
		setProduto({ ...produto, [e.target.name]: e.target.value });
	}

	function voltar() {
		setMensagem(null); // Limpa a mensagem
		setModo(null); // Volta para o menu interno, por exemplo
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

	return (
		<Container className="mt-5">
			<h2 className="text-center">🛒 Gerenciar Produtos</h2>
			{mensagem && (
				<Alert variant={mensagem.tipo} className="text-center">
					{mensagem.texto}
				</Alert>
			)}
			{!modo && (
				<div className="d-flex justify-content-center flex-wrap gap-3">
					<Button
						variant="primary"
						size="lg"
						onClick={() => {
							setModo("listar");
							// Chamar função listarProdutos()
						}}
					>
						📋 Listar Produtos
					</Button>
					<Button variant="primary" size="lg" onClick={() => setModo("criar")}>
						➕ Criar Produto
					</Button>
					<Button
						variant="primary"
						size="lg"
						onClick={() => setModo("atualizar")}
					>
						🔄 Atualizar Produto
					</Button>
				</div>
			)}

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
							onClick={
								modo === "criar"
									? criarProduto
									: /* atualizarProduto */ () => {}
							}
						>
							{modo === "criar" ? "✅ Criar Produto" : "🔄 Atualizar Produto"}
						</Button>
						<Button variant="secondary" size="lg" onClick={voltar}>
							🔙 Produtos
						</Button>
					</div>
				</Form>
			)}
		</Container>
	);
}

export default Produtos;
