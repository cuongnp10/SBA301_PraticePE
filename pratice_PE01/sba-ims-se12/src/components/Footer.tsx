import'./Footer.tsx';
import {Container} from "react-bootstrap";
function Footer() {

    const year = new Date().getFullYear();
    return (
        <>


                {/* Footer */}
                <div className="fixed-bottom bg-light border-top p-3">
                    <Container>
                        <center>
                            <p className="mb-0">@{year} FPT University</p>
                        </center>
                    </Container>
                </div>

        </>
    );
}
export default Footer