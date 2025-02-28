import React, { useEffect, useState } from "react";
import API_URL from "../config";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function Dashboard() {
	const [produtos, setProdutos] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`${API_URL}/produtos`)
			.then((response) => response.json())
			.then((data) => {
				setProdutos(data.sort((a, b) => a.nome.localeCompare(b.nome)));
				setLoading(false);
			})
			.catch((error) => {
				console.error("Erro ao buscar produtos:", error);
				setError(error.message);
				setLoading(false);
			});
	}, []);

	return (
		<Container className="mt-5">
			<h1 className="text-center">📦 Armazone - Controle de Estoque</h1>

			<Row className="mt-4">
				<Col>
					<h2>📊 Resumo do Estoque</h2>
					<p>
						🔢 Total de produtos cadastrados: <strong>{produtos.length}</strong>
					</p>
				</Col>
			</Row>

			{loading && (
				<div className="d-flex justify-content-center align-items-center mt-3">
					<Spinner animation="border" variant="primary" />
					<span className="ms-2">Carregando produtos...</span>
				</div>
			)}

			{error && (
				<Alert variant="danger" className="mt-3 text-center">
					⚠️ {error}
				</Alert>
			)}

			{!loading && !error && (
				<Row className="mt-4">
					<Col>
						<h2>📋 Lista de Produtos</h2>
						<ListGroup>
							{produtos.map((produto) => (
								<ListGroup.Item key={produto.codigoBarras}>
									<strong>{produto.nome}</strong> - R$ {produto.preco}
								</ListGroup.Item>
							))}
						</ListGroup>
					</Col>
				</Row>
			)}
		</Container>
	);
}

export default Dashboard;
