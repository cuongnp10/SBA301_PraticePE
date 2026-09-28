import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import * as api from "../services/api.ts";

interface Category {
    categoryId: number;
    categoryName: string;
}

function Create() {
    const navigate = useNavigate();
    const [ingredientName, setIngredientName] = useState("");
    const [priceFrom, setPriceFrom] = useState<number | "">("");
    const [priceTo, setPriceTo] = useState<number | "">("");
    const [producerName, setProducerName] = useState("");
    const [supplier, setSupplier] = useState("");
    const [categoryId, setCategoryId] = useState<number>(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [entryDate, setEntryDate] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/list");
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        // 1. Ingredient Name: bắt buộc và tối đa 100 ký tự
        if (!ingredientName.trim()) {
            newErrors.ingredientName = "Ingredient name is required";
        } else if (ingredientName.length > 100) {
            newErrors.ingredientName = "Ingredient name must not exceed 100 characters";
        }

        // 2. Price From: bắt buộc > 1000
        if (priceFrom === "" || Number(priceFrom) <= 1000) {
            newErrors.priceFrom = "Price from must be greater than 1000";
        }

        // 3. Price To: bắt buộc > 1000 và >= Price From
        if (priceTo === "" || Number(priceTo) <= 1000) {
            newErrors.priceTo = "Price to must be greater than 1000";
        } else if (priceFrom !== "" && Number(priceTo) < Number(priceFrom)) {
            newErrors.priceTo = "Price to must be greater than or equal to price from";
        }

        // 4. Producer Name: tối đa 100 ký tự
        if (producerName && producerName.length > 100) {
            newErrors.producerName = "Producer name must not exceed 100 characters";
        }

        // 5. Supplier: tối đa 100 ký tự
        if (supplier && supplier.length > 100) {
            newErrors.supplier = "Supplier must not exceed 100 characters";
        }

        // 6. Category: bắt buộc chọn
        if (!categoryId || categoryId <= 0) {
            newErrors.categoryId = "Category is required";
        }

        // 7. Entry Date: không được ở tương lai
        if (entryDate) {
            const selectedDate = new Date(entryDate);
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            if (selectedDate > today) {
                newErrors.entryDate = "Entry date must not be in the future";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const payload = {
            ingredientName: ingredientName.trim(),
            priceFrom: Number(priceFrom),
            priceTo: Number(priceTo),
            producerName: producerName.trim() || null,
            supplier: supplier.trim() || null,
            categoryId: Number(categoryId),
            entryDate: entryDate || null
        };

        try {
            await api.post("ingredients", payload);
            alert("Ingredient created successfully!");
            navigate("/list");
        } catch (error: any) {
            console.error("Error creating ingredient:", error);
            if (error.response?.data?.message) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("Failed to create ingredient. Please check your data.");
            }
        }
    };

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await api.get("categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error loading categories:", error);
            }
        };
        loadCategories();
    }, []);

    return (
        <>
            <div style={{minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
                <Header />
                {/* Main Content */}
                <Container className="mt-4">
                    <div className="bg-white p-4 border rounded">
                        <h3 className="mb-4">Add New Ingredient</h3>
                        <Form onSubmit={handleSave}>
                            {/* Ingredient Name */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3} className="text-end">
                                    <strong>Ingredient name:</strong>
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control 
                                        type="text" 
                                        value={ingredientName} 
                                        onChange={(e) => setIngredientName(e.target.value)} 
                                        isInvalid={!!errors.ingredientName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.ingredientName}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            {/* Price Range */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3} className="text-end">
                                    <strong>Price from (đ):</strong>
                                </Form.Label>
                                <Col sm={3}>
                                    <Form.Control 
                                        type="number" 
                                        value={priceFrom} 
                                        onChange={(e) => setPriceFrom(e.target.value === "" ? "" : Number(e.target.value))} 
                                        isInvalid={!!errors.priceFrom}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.priceFrom}
                                    </Form.Control.Feedback>
                                </Col>

                                <Col sm={1} className="text-center">
                                    <strong>To:</strong>
                                </Col>
                                <Col sm={3}>
                                    <Form.Control 
                                        type="number" 
                                        value={priceTo} 
                                        onChange={(e) => setPriceTo(e.target.value === "" ? "" : Number(e.target.value))} 
                                        isInvalid={!!errors.priceTo}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.priceTo}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            {/* Supplier */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3} className="text-end">
                                    <strong>Supplier:</strong>
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control 
                                        type="text" 
                                        value={supplier} 
                                        onChange={(e) => setSupplier(e.target.value)} 
                                        isInvalid={!!errors.supplier}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.supplier}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            {/* Producer Name */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3} className="text-end">
                                    <strong>Producer name:</strong>
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control 
                                        type="text" 
                                        value={producerName} 
                                        onChange={(e) => setProducerName(e.target.value)} 
                                        isInvalid={!!errors.producerName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.producerName}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            {/* Category and Entry Date */}
                            <Form.Group as={Row} className="mb-4">
                                <Form.Label column sm={3} className="text-end">
                                    <strong>Category:</strong>
                                </Form.Label>
                                <Col sm={3}>
                                    <Form.Select 
                                        value={categoryId} 
                                        onChange={(e) => setCategoryId(Number(e.target.value))}
                                        isInvalid={!!errors.categoryId}
                                    >
                                        <option value="0">Select category</option>
                                        {categories.map((category) => (
                                            <option key={category.categoryId} value={category.categoryId}>
                                                {category.categoryName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.categoryId}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col sm={1}></Col>
                                <Form.Label column sm={2} className="text-end">
                                    <strong>Entry Date (yyyy-MM-dd):</strong>
                                </Form.Label>
                                <Col sm={3}>
                                    <Form.Control 
                                        type="date" 
                                        value={entryDate} 
                                        onChange={(e) => setEntryDate(e.target.value)} 
                                        isInvalid={!!errors.entryDate}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.entryDate}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            {/* Buttons */}
                            <Row className="mt-4">
                                <Col className="text-center">
                                    <Button type="submit" variant="primary" size="lg" className="me-3 px-5">
                                        Save
                                    </Button>
                                    <Button onClick={handleBack} variant="secondary" size="lg" className="px-5">
                                        Back
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Container>
                <Footer />
            </div>
        </>
    );
}
export default Create;