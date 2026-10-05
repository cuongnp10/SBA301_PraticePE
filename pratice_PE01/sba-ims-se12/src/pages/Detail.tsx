import {Button, Col, Container, Row} from "react-bootstrap";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as api from "../services/api.ts";

interface IngredientDetail {
    ingredientId: number;
    ingredientName: string;
    priceFrom: number;
    priceTo: number;
    producerName: string;
    entryDate: string;
    supplier: string;
    categoryName: string;
}

function Detail() {
    const [ingredient, setIngredient] = useState<IngredientDetail | null>(null);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const loadDetail = async () => {
            try {
                const response = await api.get(`ingredients/${id}`);
                setIngredient(response.data);
            } catch (error) {
                console.error("Error loading detail:", error);
            }
        };

        if (id) {
            loadDetail();
        }
    }, [id]);

    return (
        <div style={{minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
            <Header />
            <Container className="mt-4">
                <div className="bg-white p-4 border rounded">
                    <h5 className="mb-4">VIEW DETAILS</h5>

                    <Table bordered hover responsive>
                        <tbody>
                            <tr>
                                <th style={{width: '35%'}}>Ingredient Name:</th>
                                <td>{ingredient?.ingredientName || "-"}</td>
                            </tr>
                            <tr>
                                <th>Producer name:</th>
                                <td>{ingredient?.producerName || "-"}</td>
                            </tr>
                            <tr>
                                <th>Category:</th>
                                <td>{ingredient?.categoryName || "-"}</td>
                            </tr>
                            <tr>
                                <th>Price range (đ):</th>
                                <td>
                                    {ingredient 
                                        ? `${ingredient.priceFrom} - ${ingredient.priceTo}` 
                                        : "-"}
                                </td>
                            </tr>
                            <tr>
                                <th>Supplier:</th>
                                <td>{ingredient?.supplier || "-"}</td>
                            </tr>
                            <tr>
                                <th>Entry Date:</th>
                                <td>{ingredient?.entryDate || "-"}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Row className="mt-4">
                        <Col className="text-center">
                            <Button variant="secondary" size="lg" className="px-5" onClick={() => navigate("/list")}>
                                Back
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Footer />
        </div>
    );
}

export default Detail;