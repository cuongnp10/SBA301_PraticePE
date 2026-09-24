import './Login.tsx';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

function Login () {
    return (
        <>

            <div style={{minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
                <Header />
                {/* Main Content */}
                <Container className="mt-4" style={{maxWidth: '400px'}}>

                    <div className="bg-white p-4 border rounded">
                        <img src="./src/assets/hero.png" alt="Logo" className="mb-4 center-block" />

                        <Form>
                            {/* Email */}
                            <Form.Group as={Form} className="mb-3">
                                <Form.Label column sm={1} className="text-start">
                                    <strong>Email</strong>
                                </Form.Label>
                                <Col sm={12}>
                                    <Form.Control type="text"/>
                                </Col>
                            </Form.Group>

                            {/* Producer Name */}
                            <Form.Group as={Form} className="mb-3">
                                <Form.Label column sm={1} className="text-start">
                                    <strong>Password</strong>
                                </Form.Label>

                                <Col sm={12}>
                                    <Form.Control type="password"/>
                                </Col>
                            </Form.Group>

                            {/* Buttons */}
                            <Row className="mt-4">
                                <Col className="text-center">
                                    <Button variant="primary" size="lg" className="me-3 px-5">
                                        Login
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
export default Login
