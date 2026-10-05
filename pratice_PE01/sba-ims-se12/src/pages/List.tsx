import {Button, Col, Container, Form, Row, Modal, Pagination} from "react-bootstrap";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Table from 'react-bootstrap/Table';
import * as api from "../services/api.ts";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


interface Category {
    categoryId: number;
    categoryName: string;
}

interface Ingredient {
    ingredientId: number;
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
    const [categoryId,setCategoryId] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
    const navigate = useNavigate();

    const fetchIngredients = async (page: number = 0, name: string = ingredientsName, catId: number = categoryId) => {
        try {
            let url = `ingredients?page=${page}&size=10&sortBy=ingredientName`;
            if (name.trim() !== "") {
                url += `&name=${encodeURIComponent(name.trim())}`;
            }
            if (catId !== 0) {
                url += `&categoryId=${catId}`;
            }
            const response = await api.get(url);
            setIngredients(response.data.content);
            setCurrentPage(response.data.pageNumber);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    const handleSearch = async (event: any) => {
        event.preventDefault();
        await fetchIngredients(0, ingredientsName, categoryId);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchIngredients(newPage, ingredientsName, categoryId);
        }
    };

    const handleAdd = (event: any) => {
        event.preventDefault();
        navigate("/create");
    };

    const handleOpenDeleteModal = (ingredient: Ingredient) => {
        setSelectedIngredient(ingredient);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedIngredient(null);
    };

    const handleConfirmDelete = async () => {
        if (!selectedIngredient) return;

        try {
            await api.remove(`ingredients/${selectedIngredient.ingredientId}`);
            handleCloseDeleteModal();
            await fetchIngredients(currentPage, ingredientsName, categoryId);
        } catch (error) {
            console.error("Error deleting ingredient:", error);
        }
    };

    useEffect(() => {
        let isMounted = true;
        const loadInitialData = async () => {
            try {
                const [categoryResponse, ingredientResponse] =
                    await Promise.all([
                        api.get("categories"),
                        api.get(
                            "ingredients?page=0&size=10&sortBy=ingredientName"
                        )
                    ]);

                if (isMounted) {
                    setCategories(categoryResponse.data);
                    setIngredients(ingredientResponse.data.content);
                    setCurrentPage(ingredientResponse.data.pageNumber);
                    setTotalPages(ingredientResponse.data.totalPages);
                    setTotalElements(ingredientResponse.data.totalElements);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        loadInitialData();

        return () => {
            isMounted = false;
        };
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
                                    <Form.Select value={categoryId} onChange={(e)=> setCategoryId(Number(e.target.value))}>
                                        <option value="0">Select category</option>
                                        {categories.map((Category) => ( (
                                            <option key={Category.categoryId} value={Category.categoryId}>{Category.categoryName}</option>
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
                                    <Button onClick={handleSearch} variant="primary" size="sm" className="me-3 px-4">
                                        Search
                                    </Button>
                                    <Button onClick={handleAdd} variant="secondary" size="sm" className="px-4">
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
                                    {ingredients.length > 0 ? (
                                        ingredients.map((ingredient, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{ingredient.ingredientName}</td>
                                                <td>{ingredient.categoryName}</td>
                                                <td>{ingredient.producerName}</td>
                                                <td>{ingredient.supplier}</td>
                                                <td>{ingredient.priceFrom + " - " + ingredient.priceTo}</td>
                                                <td>
                                                    <Button onClick={() => handleOpenDeleteModal(ingredient)}>
                                                        Delete
                                                    </Button>
                                                    <Button onClick={() => navigate(`/detail/${ingredient.ingredientId}`)}>
                                                        View
                                                    </Button>
                                                    
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="text-center text-muted py-3">
                                                No records found
                                            </td>
                                        </tr>
                                    )}



                                    </tbody>
                                </Table>

                                {/* Pagination Component */}
                                {totalPages > 1 && (
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <div className="text-muted">
                                            Show {ingredients.length} of {totalElements} records
                                        </div>
                                        <Pagination className="mb-0">
                                            <Pagination.Prev 
                                                disabled={currentPage === 0} 
                                                onClick={() => handlePageChange(currentPage - 1)} 
                                            />
                                            {Array.from({ length: totalPages }, (_, i) => (
                                                <Pagination.Item 
                                                    key={i} 
                                                    active={i === currentPage} 
                                                    onClick={() => handlePageChange(i)}
                                                >
                                                    {i + 1}
                                                </Pagination.Item>
                                            ))}
                                            <Pagination.Next 
                                                disabled={currentPage === totalPages - 1} 
                                                onClick={() => handlePageChange(currentPage + 1)} 
                                            />
                                        </Pagination>
                                    </div>
                                )}
                            </Form.Group>
                            {/* Buttons */}

                        </Form>
                    </div>
                </Container>

                {/* Delete Confirmation Modal */}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete ingredient "{selectedIngredient?.ingredientName}"?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Footer />
            </div>
        </>
    );
}
export default List