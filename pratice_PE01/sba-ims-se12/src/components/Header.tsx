import'./Header.tsx';
import { Container, Navbar} from "react-bootstrap";
function Header() {
    return (
        <>
                {/* Header */}
                <Navbar bg="light" className="border-bottom">
                    <Container fluid>
                        <Navbar.Brand>
                            <strong>Logo</strong>
                        </Navbar.Brand>
                        <Navbar.Text className="mx-auto">
                            <h4 className="mb-0">Inventory Management</h4>
                        </Navbar.Text>
                        <Navbar.Text>
                            <strong>Date: yyyy-MM-dd</strong>
                        </Navbar.Text>
                    </Container>
                </Navbar>

        </>
    );
}
export default Header