import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

function Create() {
    
    return (
        <>
            <div style={{minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
                <Header />
                {/* Main Content */}
                <Container className="mt-4">
                    <div className="bg-white p-4 border rounded">
                        <h3 className="mb-4">Add New Ingredient</h3>
                        <Form>
                            {/* Ingredient Name */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2} className="text-end">
                                    <strong>Ingredient name:</strong>
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control type="text"/>
                                </Col>
                            </Form.Group>
                            {/* Price Range */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3} className="text-end">
                                    <strong>Price from (đ):</strong>
                                </Form.Label>
                                <Col sm={3}>
                                    <Form.Control type="number"/>
                                </Col>
                                <Col sm={1} className="text-center">
                                    <strong>To:</strong>
                                </Col>
                                <Col sm={3}>
                                    <Form.Control type="number"/>
                                </Col>
                            </Form.Group>
                            {/* Supplier */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3} className="text-end">
                                    <strong>Supplier:</strong>
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text"/>
                                </Col>
                            </Form.Group>
                            {/* Producer Name */}
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3} className="text-end">
                                    <strong>Producer name:</strong>
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text"/>
                                </Col>
                            </Form.Group>
                            {/* Category and Entry Date */}
                            <Form.Group as={Row} className="mb-4">
                                <Form.Label column sm={3} className="text-end">
                                    <strong>Category:</strong>
                                </Form.Label>
                                <Col sm={3}>

                                    <Form.Select>
                                        <option value="">Select category</option>
                                        <option value="vegetables">Vegetables</option>
                                        <option value="fruits">Fruits</option>
                                        <option value="meat">Meat</option>
                                        <option value="dairy">Dairy</option>
                                        <option value="spices">Spices</option>
                                    </Form.Select>
                                </Col>
                                <Col sm={1}></Col>
                                <Form.Label column sm={2} className="text-end">
                                    <strong>Entry Date (yyyy-MM-dd):</strong>
                                </Form.Label>
                                <Col sm={3}>
                                    <Form.Control type="date"/>
                                </Col>
                            </Form.Group>
                            {/* Buttons */}
                            <Row className="mt-4">
                                <Col className="text-center">
                                    <Button variant="primary" size="lg" className="me-3 px-5">
                                        Save
                                    </Button>
                                    <Button variant="secondary" size="lg" className="px-5">
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
export default Create