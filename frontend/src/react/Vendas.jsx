import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function Vendas({ voltar }) {
	// Campos obrigatórios
	const [estoqueId, setEstoqueId] = useState("");
	const [codigoBarras, setCodigoBarras] = useState("");
	const [quantidade, setQuantidade] = useState("");
	const [precoTotal, setPrecoTotal] = useState("");

	// Mensagem de sucesso ou erro
	const [mensagem, setMensagem] = useState(null);

	function limparMensagem() {
		setMensagem(null);
	}

	function registrarVenda() {
		limparMensagem();

		// Verifica se todos os campos estão preenchidos
		if (!estoqueId || !codigoBarras || !quantidade || !precoTotal) {
			setMensagem({
				tipo: "danger",
				texto: "Todos os campos são obrigatórios!"
			});
			return;
		}

		// Monta o objeto de requisição
		const bodyData = {
			estoqueId: parseInt(estoqueId, 10),
			codigoBarras,
			quantidade: parseInt(quantidade, 10),
			precoTotal: parseFloat(precoTotal)
		};

		fetch("http://localhost:4000/vendas", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(bodyData)
		})
			.then(async (res) => {
				if (!res.ok) {
					const errorData = await res.json();
					throw new Error(errorData.message || "Erro ao registrar venda.");
				}
				return res.json();
			})
			.then((data) => {
				setMensagem({
					tipo: "success",
					texto: data.message || "Venda registrada com sucesso!"
				});
				// Limpa campos após registrar
				setEstoqueId("");
				setCodigoBarras("");
				setQuantidade("");
				setPrecoTotal("");
			})
			.catch((err) => {
				setMensagem({ tipo: "danger", texto: err.message });
			});
	}

	return (
		<Container className="mt-5 d-flex flex-column align-items-center">
			<Card className="p-4 shadow" style={{ maxWidth: "600px", width: "100%" }}>
				<Card.Title className="text-center fs-3">💰 Registrar Venda</Card.Title>

				{/* Alerta de mensagem de sucesso/erro */}
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

				<Form className="mt-3">
					{/* ESTOQUE ID */}
					<Form.Group className="mb-3">
						<Form.Label>ID do Estoque</Form.Label>
						<Form.Control
							type="number"
							value={estoqueId}
							onChange={(e) => setEstoqueId(e.target.value)}
							placeholder="Ex: 2"
						/>
					</Form.Group>

					{/* CÓDIGO DE BARRAS */}
					<Form.Group className="mb-3">
						<Form.Label>Código de Barras</Form.Label>
						<Form.Control
							type="text"
							value={codigoBarras}
							onChange={(e) => setCodigoBarras(e.target.value)}
							placeholder="Ex: 7891234567895"
						/>
					</Form.Group>

					{/* QUANTIDADE */}
					<Form.Group className="mb-3">
						<Form.Label>Quantidade</Form.Label>
						<Form.Control
							type="number"
							value={quantidade}
							onChange={(e) => setQuantidade(e.target.value)}
							placeholder="Ex: 10"
						/>
					</Form.Group>

					{/* PREÇO TOTAL */}
					<Form.Group className="mb-3">
						<Form.Label>Preço Total</Form.Label>
						<Form.Control
							type="number"
							step="0.01"
							value={precoTotal}
							onChange={(e) => setPrecoTotal(e.target.value)}
							placeholder="Ex: 70.00"
						/>
					</Form.Group>

					<div className="text-center mt-4 d-flex gap-3 justify-content-center">
						<Button variant="primary" size="lg" onClick={registrarVenda}>
							Registrar Venda
						</Button>
					</div>
				</Form>
			</Card>
		</Container>
	);
}

export default Vendas;
