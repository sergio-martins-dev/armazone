import React, { useState } from "react";
import Menu from "./Menu";
import Produtos from "./Produtos";
import Estoques from "./Estoques"; // <-- import novo
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Relatorios from "./Relatorios";

function App() {
	const [historico, setHistorico] = useState(["menu"]);

	function abrirTela(novaTela) {
		setHistorico([...historico, novaTela]);
	}

	function voltar() {
		if (historico.length > 1) {
			setHistorico(historico.slice(0, -1));
		}
	}

	const telaAtual = historico[historico.length - 1];

	return (
		<Container className="mt-5">
			{telaAtual === "menu" && <Menu abrirTela={abrirTela} />}
			{telaAtual === "produtos" && <Produtos voltar={voltar} />}
			{telaAtual === "estoque" && <Estoques voltar={voltar} />}
			{telaAtual === "vendas" && (
				<h2 className="text-center">💰 Tela de Vendas</h2>
			)}
			{telaAtual === "relatorios" && <Relatorios voltar={voltar} />}

			{/* Botão de voltar (aparece em todas as telas, exceto no menu) */}
			{telaAtual !== "menu" && (
				<div className="d-flex justify-content-center mt-4">
					<Button variant="secondary" size="lg" onClick={voltar}>
						🔙 Menu
					</Button>
				</div>
			)}
		</Container>
	);
}

export default App;
