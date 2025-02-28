import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Menu({ abrirTela }) {
	return (
		<Container className="mt-5">
			<h1 className="text-center">📦 Armazone - Controle de Estoque</h1>
			<Row className="mt-4 justify-content-center">
				<Col xs="auto">
					<Button
						variant="primary"
						size="lg"
						onClick={() => abrirTela("produtos")}
					>
						🛒 Gerenciar Produtos
					</Button>
				</Col>
				<Col xs="auto">
					<Button
						variant="primary"
						size="lg"
						onClick={() => abrirTela("estoque")}
					>
						📦 Gerenciar Estoque
					</Button>
				</Col>
				<Col xs="auto">
					<Button
						variant="primary"
						size="lg"
						onClick={() => abrirTela("vendas")}
					>
						💰 Registrar Venda
					</Button>
				</Col>
				<Col xs="auto">
					<Button
						variant="primary"
						size="lg"
						onClick={() => abrirTela("relatorios")}
					>
						📊 Relatórios
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default Menu;
