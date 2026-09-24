import {Button, Col,  Row} from "react-bootstrap";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Table from 'react-bootstrap/Table';
function Detail() {
    return (
        <>

                <Header />

                    <div className="bg-white p-4  rounded">
                        <h5 className="mb-4">VIEW DETAILS</h5>
                    </div>
            <div className="bg-white p-4  rounded">
            <Table >
                <td>
                <th>
                    <tr>Ingredient Name:</tr>
                    <tr>Producer name:</tr>
                    <tr>Category:</tr>
                    <tr>Price range (đ):</tr>
                    <tr>Supplier:</tr>
                    <tr>Entry Date:</tr>
                </th>
                <td>
                    <tr>Fresh milk</tr>
                    <tr>Masan company</tr>
                    <tr>Fresh Food</tr>
                    <tr>10000 – 20000</tr>
                    <tr>FPT Company</tr>
                    <tr>2025-01-25</tr>
                </td>
                </td>
            </Table>
            </div>
            <Row className="mt-4">
                <Col className="text-center">
                    <Button variant="primary" size="lg" className="me-3 px-5">
                        Login
                    </Button>
                </Col>
            </Row>
                <Footer />

        </>
    );
}
export default Detail