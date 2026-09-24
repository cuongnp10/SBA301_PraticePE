import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Table from 'react-bootstrap/Table';
import * as api from "../services/api.ts";
import {useEffect, useState} from "react";


interface Category {
    categoryId: number;
    categoryName: string;
}

interface Ingredient {
    ingredientName: string;
    categoryName: string;
    producerName: string;
    supplier: string;
    priceFrom: number;
    priceTo: number;
}

function List() {
    // Khai bao bien
    const [categories, setCategories] = useState<Category[]>([]);
    const [ingredients,setIngredients] = useState<Ingredient[]>([]);
    const [ingredientsName,setIngredientsName] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const [categoryResponse, ingredientResponse] =
                    await Promise.all([
                        api.get("categories"),
                        api.get(
                            "ingredients?page=0&size=10&sortBy=ingredientName"
                        )
                    ]);

                setCategories(categoryResponse.data);
                setIngredients(ingredientResponse.data.content);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
        loadData();
    }, []);

    return (
        <>
            <div style={{minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
                <Header />
                {/* Main Content */}
                <Container className="mt-4">
                    <div className="bg-white p-4 border rounded">
                        <h5 className="mb-4">Ingredient list</h5>
                        <Form>
                            {/* Category and Entry Date */}
                            <Form.Group as={Row} className="mb-4">
                                <Form.Label column sm={3} className="text-end">
                                    <strong>Category:</strong>
                                </Form.Label>
                                <Col sm={3}>
                                    <Form.Select>
                                        <option value="0">Select category</option>
                                        {categories.map((Category) => ( (
                                            <option value={Category.categoryId}>{Category.categoryName}</option>
                                        )))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            {/* Ingredient Name */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2} className="text-end">
                                    <strong>Ingredient name:</strong>
                                </Form.Label>
                                <Col sm={6}>
                                    <Form.Control type="text" value ={ingredientsName} onChange={(e) => setIngredientsName(e.target.value)} />
                                    
                                </Col>
                                <Col className="text-center">
                                    <Button variant="primary" size="sm" className="me-3 px-4">
                                        Filter
                                    </Button>
                                    <Button variant="secondary" size="sm" className="px-4">
                                        Add new
                                    </Button>
                                </Col>
                                <h5 className="mb-4">Ingredient list</h5>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ingredient Name</th>
                                        <th>Category</th>
                                        <th>Producer</th>
                                        <th>Supplier</th>
                                        <th>Price range(đ)</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {ingredients.map((ingredient,index) => (
                                        <tr >
                                            <td>{index+1}</td>
                                            <td>{ingredient.ingredientName}</td>
                                            <td>{ingredient.categoryName}</td>
                                            <td>{ingredient.producerName}</td>
                                            <td>{ingredient.supplier}</td>
                                            <td>{ingredient.priceFrom +"-"+ ingredient.priceTo}</td>



                                            <td>
                                                <Button >
                                                    Edit
                                                </Button>
                                                <Button >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}



                                    </tbody>
                                </Table>
                            </Form.Group>
                            {/* Buttons */}

                        </Form>
                    </div>
                </Container>
                <Footer />
            </div>
        </>
    );
}
export default List