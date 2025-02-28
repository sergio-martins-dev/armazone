import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

function Estoques({ voltar }) {
	// Lista de todos os estoques (ex: Disk, Mercearia)
	const [estoques, setEstoques] = useState([]);

	// Estoque selecionado (ex: { id: 1, nome: "Disk" })
	const [estoqueSelecionado, setEstoqueSelecionado] = useState(null);

	// "modoEstoque" controla a subtela:
	// null => não selecionou estoque ainda
	// 'menu' => mostra o menu com 4 botões (Ver, Adicionar, Baixar, Deletar)
	// 'ver' => lista de produtos do estoque
	// 'adicionar' => form para adicionar produtos
	// 'baixar' => form para dar baixa
	// 'deletar' => form para deletar
	const [modoEstoque, setModoEstoque] = useState(null);

	// Lista de itens do estoque (quando clicamos em "Ver Estoque")
	const [itensEstoque, setItensEstoque] = useState([]);

	// Campos para adicionar/baixar/deletar
	const [codigoBarras, setCodigoBarras] = useState("");
	const [quantidade, setQuantidade] = useState("");

	// Mensagem de erro ou sucesso
	const [mensagem, setMensagem] = useState(null);

	// Ao montar, busca a lista de estoques
	useEffect(() => {
		fetch("http://localhost:4000/estoques")
			.then((res) => {
				if (!res.ok) throw new Error("Erro ao buscar estoques.");
				return res.json();
			})
			.then((data) => {
				setEstoques(data);
			})
			.catch((err) => {
				setMensagem({ tipo: "danger", texto: err.message });
			});
	}, []);

	function limparMensagem() {
		setMensagem(null);
	}

	// Quando clica num estoque na lista inicial, abre o "menu" desse estoque
	function abrirMenuEstoque(estoque) {
		setEstoqueSelecionado(estoque);
		setModoEstoque("menu");
		setItensEstoque([]); // limpa qualquer lista anterior
		setCodigoBarras("");
		setQuantidade("");
		limparMensagem();
	}

	// Voltar para a lista de estoques (tela inicial do componente)
	function voltarParaLista() {
		setEstoqueSelecionado(null);
		setModoEstoque(null);
		setItensEstoque([]);
		setCodigoBarras("");
		setQuantidade("");
		limparMensagem();
	}

	// === AÇÕES ===

	// 1) Ver Estoque (lista de produtos)
	function verEstoque() {
		if (!estoqueSelecionado) return;
		fetch(`http://localhost:4000/estoque-produto/${estoqueSelecionado.id}`)
			.then((res) => {
				if (!res.ok) throw new Error("Erro ao buscar produtos do estoque.");
				return res.json();
			})
			.then((data) => {
				setItensEstoque(data);
				setModoEstoque("ver");
				setMensagem({ tipo: "success", texto: "Lista de produtos carregada!" });
			})
			.catch((err) => {
				setMensagem({ tipo: "danger", texto: err.message });
			});
	}

	// 2) Adicionar Produtos
	function adicionarProdutos() {
		if (!estoqueSelecionado) return;
		fetch("http://localhost:4000/estoque-produto", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				estoqueId: estoqueSelecionado.id,
				codigoBarras,
				quantidade: parseInt(quantidade, 10)
			})
		})
			.then(async (res) => {
				if (!res.ok) {
					const errorData = await res.json();
					throw new Error(errorData.message || "Erro ao adicionar produtos.");
				}
				return res.json();
			})
			.then((data) => {
				setMensagem({
					tipo: "success",
					texto: data.message || "Produtos adicionados com sucesso!"
				});
				setCodigoBarras("");
				setQuantidade("");
			})
			.catch((err) => {
				setMensagem({ tipo: "danger", texto: err.message });
			});
	}

	// 3) Dar Baixa
	function darBaixa() {
		if (!estoqueSelecionado) return;
		fetch("http://localhost:4000/estoque-produto/dar-baixa", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				estoqueId: estoqueSelecionado.id,
				codigoBarras,
				quantidade: parseInt(quantidade, 10)
			})
		})
			.then(async (res) => {
				if (!res.ok) {
					const errorData = await res.json();
					throw new Error(errorData.message || "Erro ao dar baixa.");
				}
				return res.json();
			})
			.then((data) => {
				setMensagem({
					tipo: "success",
					texto: data.message || "Baixa realizada com sucesso!"
				});
				setCodigoBarras("");
				setQuantidade("");
			})
			.catch((err) => {
				setMensagem({ tipo: "danger", texto: err.message });
			});
	}

	// 4) Deletar Produtos
	function deletarProdutos() {
		if (!estoqueSelecionado) return;
		fetch(
			`http://localhost:4000/estoque-produto/${estoqueSelecionado.id}/${codigoBarras}`,
			{
				method: "DELETE"
			}
		)
			.then(async (res) => {
				if (!res.ok) {
					const errorData = await res.json();
					throw new Error(
						errorData.message || "Erro ao deletar produto do estoque."
					);
				}
				return res.json();
			})
			.then((data) => {
				setMensagem({
					tipo: "success",
					texto: data.message || "Produto deletado com sucesso!"
				});
				setCodigoBarras("");
			})
			.catch((err) => {
				setMensagem({ tipo: "danger", texto: err.message });
			});
	}

	// === RENDERIZAÇÃO ===
	return (
		<Container className="mt-5 d-flex flex-column align-items-center">
			<Card className="p-4 shadow" style={{ maxWidth: "600px", width: "100%" }}>
				{/* Título principal */}
				<Card.Title className="text-center fs-3">
					📦 Gerenciar Estoque
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

				{/* Se não selecionou nenhum estoque, mostra a lista de estoques */}
				{!estoqueSelecionado && (
					<>
						<p className="text-center">
							Selecione um estoque para gerenciá-lo.
						</p>
						<Row className="mt-3 gy-3">
							{estoques.map((est) => (
								<Col xs={12} key={est.id}>
									<Button
										variant="primary"
										size="lg"
										className="w-100"
										onClick={() => abrirMenuEstoque(est)}
									>
										{est.nome}
									</Button>
								</Col>
							))}
						</Row>
					</>
				)}

				{/* Se o estoque foi selecionado, mas estamos no 'menu' dele */}
				{estoqueSelecionado && modoEstoque === "menu" && (
					<>
						<h4 className="text-center mt-3">{estoqueSelecionado.nome}</h4>
						<p className="text-center">Escolha uma ação para este estoque:</p>
						<Row className="mt-3 gy-3">
							<Col xs={12}>
								<Button
									variant="primary"
									size="lg"
									className="w-100"
									onClick={verEstoque}
								>
									Ver Estoque
								</Button>
							</Col>
							<Col xs={12}>
								<Button
									variant="primary"
									size="lg"
									className="w-100"
									onClick={() => {
										setModoEstoque("adicionar");
										limparMensagem();
										setCodigoBarras("");
										setQuantidade("");
									}}
								>
									Adicionar Produtos
								</Button>
							</Col>
							<Col xs={12}>
								<Button
									variant="primary"
									size="lg"
									className="w-100"
									onClick={() => {
										setModoEstoque("baixar");
										limparMensagem();
										setCodigoBarras("");
										setQuantidade("");
									}}
								>
									Dar Baixa
								</Button>
							</Col>
							<Col xs={12}>
								<Button
									variant="primary"
									size="lg"
									className="w-100"
									onClick={() => {
										setModoEstoque("deletar");
										limparMensagem();
										setCodigoBarras("");
										setQuantidade("");
									}}
								>
									Deletar Produtos
								</Button>
							</Col>
						</Row>
					</>
				)}

				{/* Se o modoEstoque for 'ver', exibe a lista de produtos */}
				{estoqueSelecionado && modoEstoque === "ver" && (
					<>
						<h4 className="text-center mt-3">
							Estoque: {estoqueSelecionado.nome}
						</h4>
						{itensEstoque.length > 0 ? (
							<ul className="list-group mt-3">
								{itensEstoque.map((item) => (
									<li key={item.id} className="list-group-item">
										<strong>{item.produto.nome}</strong> — Quantidade:{" "}
										{item.quantidade} — Preço: R$ {item.produto.preco}
									</li>
								))}
							</ul>
						) : (
							<p className="text-center mt-3">Nenhum produto neste estoque.</p>
						)}

						<div className="text-center mt-4">
							<Button
								variant="secondary"
								size="lg"
								onClick={() => {
									setModoEstoque("menu");
									setItensEstoque([]);
									limparMensagem();
								}}
							>
								🔙 Voltar
							</Button>
						</div>
					</>
				)}

				{/* Form genérico para Adicionar, Baixar e Deletar (só muda a ação) */}

				{/* Adicionar Produtos */}
				{estoqueSelecionado && modoEstoque === "adicionar" && (
					<>
						<h4 className="text-center mt-3">
							Adicionar Produtos ao Estoque: {estoqueSelecionado.nome}
						</h4>
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formCodigoBarras">
								<Form.Label>Código de Barras</Form.Label>
								<Form.Control
									type="text"
									value={codigoBarras}
									onChange={(e) => setCodigoBarras(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formQuantidade">
								<Form.Label>Quantidade</Form.Label>
								<Form.Control
									type="number"
									value={quantidade}
									onChange={(e) => setQuantidade(e.target.value)}
								/>
							</Form.Group>
							<div className="text-center mt-4 d-flex gap-3 justify-content-center">
								<Button variant="primary" size="lg" onClick={adicionarProdutos}>
									Adicionar
								</Button>
								<Button
									variant="secondary"
									size="lg"
									onClick={() => {
										setModoEstoque("menu");
										limparMensagem();
									}}
								>
									🔙 Voltar
								</Button>
							</div>
						</Form>
					</>
				)}

				{/* Dar Baixa */}
				{estoqueSelecionado && modoEstoque === "baixar" && (
					<>
						<h4 className="text-center mt-3">
							Dar Baixa no Estoque: {estoqueSelecionado.nome}
						</h4>
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formCodigoBarras">
								<Form.Label>Código de Barras</Form.Label>
								<Form.Control
									type="text"
									value={codigoBarras}
									onChange={(e) => setCodigoBarras(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formQuantidade">
								<Form.Label>Quantidade</Form.Label>
								<Form.Control
									type="number"
									value={quantidade}
									onChange={(e) => setQuantidade(e.target.value)}
								/>
							</Form.Group>
							<div className="text-center mt-4 d-flex gap-3 justify-content-center">
								<Button variant="primary" size="lg" onClick={darBaixa}>
									Baixar
								</Button>
								<Button
									variant="secondary"
									size="lg"
									onClick={() => {
										setModoEstoque("menu");
										limparMensagem();
									}}
								>
									🔙 Voltar
								</Button>
							</div>
						</Form>
					</>
				)}

				{/* Deletar Produtos */}
				{estoqueSelecionado && modoEstoque === "deletar" && (
					<>
						<h4 className="text-center mt-3">
							Deletar Produto do Estoque: {estoqueSelecionado.nome}
						</h4>
						<Form className="mt-3">
							<Form.Group className="mb-3" controlId="formCodigoBarras">
								<Form.Label>Código de Barras</Form.Label>
								<Form.Control
									type="text"
									value={codigoBarras}
									onChange={(e) => setCodigoBarras(e.target.value)}
								/>
							</Form.Group>
							<div className="text-center mt-4 d-flex gap-3 justify-content-center">
								<Button variant="danger" size="lg" onClick={deletarProdutos}>
									Deletar
								</Button>
								<Button
									variant="secondary"
									size="lg"
									onClick={() => {
										setModoEstoque("menu");
										limparMensagem();
									}}
								>
									🔙 Voltar
								</Button>
							</div>
						</Form>
					</>
				)}

				{/* Botão "Voltar para Lista de Estoques" ou "Voltar ao Menu" */}
				{estoqueSelecionado && (
					<div className="text-center mt-4">
						<Button variant="secondary" size="lg" onClick={voltarParaLista}>
							Voltar aos Estoques
						</Button>
					</div>
				)}
			</Card>
		</Container>
	);
}

export default Estoques;
