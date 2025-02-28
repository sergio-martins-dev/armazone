import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

/**
 * Componente Estoques:
 * - Mostra lista de estoques (Disk, Mercearia, etc.)
 * - Ao clicar em um estoque, faz fetch para /estoque-produto/:id
 * - Exibe os produtos daquele estoque
 */
function Estoques({ voltar }) {
	const [estoques, setEstoques] = useState([]);
	const [estoqueSelecionado, setEstoqueSelecionado] = useState(null);
	const [itensEstoque, setItensEstoque] = useState([]);
	const [mensagem, setMensagem] = useState(null);

	// Ao montar o componente, busca a lista de estoques
	useEffect(() => {
		fetch("http://localhost:4000/estoques")
			.then((res) => {
				if (!res.ok) throw new Error("Erro ao buscar estoques.");
				return res.json();
			})
			.then((data) => setEstoques(data))
			.catch((err) => {
				setMensagem({ tipo: "danger", texto: err.message });
			});
	}, []);

	// Função para limpar a mensagem de erro/sucesso
	function limparMensagem() {
		setMensagem(null);
	}

	// Abre um estoque específico e busca os produtos dele
	function abrirEstoque(estoque) {
		fetch(`http://localhost:4000/estoque-produto/${estoque.id}`)
			.then((res) => {
				if (!res.ok) throw new Error("Erro ao buscar produtos do estoque.");
				return res.json();
			})
			.then((data) => {
				setItensEstoque(data);
				setEstoqueSelecionado(estoque); // Guarda o objeto todo (id, nome)
			})
			.catch((err) => {
				setMensagem({ tipo: "danger", texto: err.message });
			});
	}

	// Volta para a lista de estoques
	function voltarParaLista() {
		setEstoqueSelecionado(null);
		setItensEstoque([]);
	}

	return (
		<Container className="mt-5 d-flex flex-column align-items-center">
			<Card className="p-4 shadow" style={{ maxWidth: "600px", width: "100%" }}>
				<Card.Title className="text-center fs-3">
					📦 Gerenciar Estoque
				</Card.Title>

				{/* Mensagens de erro ou sucesso */}
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

				{/* Se nenhum estoque foi selecionado, mostra a lista de estoques */}
				{!estoqueSelecionado && (
					<>
						<p className="text-center">
							Selecione um estoque para ver os produtos.
						</p>
						<Row className="mt-3 gy-3">
							{estoques.map((est) => (
								<Col xs={12} key={est.id}>
									<Button
										variant="primary"
										size="lg"
										className="w-100"
										onClick={() => abrirEstoque(est)}
									>
										{est.nome}
									</Button>
								</Col>
							))}
						</Row>
					</>
				)}

				{/* Se um estoque foi selecionado, mostra os produtos dele */}
				{estoqueSelecionado && (
					<>
						<h4 className="text-center mt-3">
							Estoque: {estoqueSelecionado.nome}
						</h4>
						<p className="text-center">Produtos disponíveis neste estoque:</p>

						{itensEstoque.length > 0 ? (
							<ul className="list-group">
								{itensEstoque.map((item) => (
									<li key={item.id} className="list-group-item">
										<strong>{item.produto.nome}</strong>
										{" - "}
										Quantidade: {item.quantidade}
										{" - "}
										Preço: R$ {item.produto.preco}
									</li>
								))}
							</ul>
						) : (
							<p className="text-center">Nenhum produto neste estoque.</p>
						)}

						<div className="text-center mt-4">
							<Button variant="secondary" size="lg" onClick={voltarParaLista}>
								🔙 Voltar aos Estoques
							</Button>
						</div>
					</>
				)}
			</Card>
		</Container>
	);
}

export default Estoques;
