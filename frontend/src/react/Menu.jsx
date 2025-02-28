import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Menu({ abrirTela }) {
	return (
		<Container className="mt-5 d-flex flex-column align-items-center">
			<Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
				<Card.Title className="text-center fs-3">
					📦 Armazone - Controle de Estoque
				</Card.Title>

				<Row className="mt-4 gy-3">
					<Col xs={12}>
						<Button
							variant="primary"
							size="lg"
							className="w-100"
							onClick={() => abrirTela("produtos")}
						>
							🛒 Gerenciar Produtos
						</Button>
					</Col>
					<Col xs={12}>
						<Button
							variant="primary"
							size="lg"
							className="w-100"
							onClick={() => abrirTela("estoque")}
						>
							📦 Gerenciar Estoque
						</Button>
					</Col>
					<Col xs={12}>
						<Button
							variant="primary"
							size="lg"
							className="w-100"
							onClick={() => abrirTela("vendas")}
						>
							💰 Registrar Venda
						</Button>
					</Col>
					<Col xs={12}>
						<Button
							variant="primary"
							size="lg"
							className="w-100"
							onClick={() => abrirTela("relatorios")}
						>
							📊 Relatórios
						</Button>
					</Col>
				</Row>
			</Card>
		</Container>
	);
}

export default Menu;
