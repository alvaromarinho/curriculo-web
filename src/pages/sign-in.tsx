import { FaSignInAlt } from "react-icons/fa";
import styled from "styled-components";

const SignIn = () => {
    return (
        <div className="container h-100 d-flex-center">
            <div className="card">
                <div className="card-body p-4 p-md-5">
                    <Form>
                        <img className="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                        <h1 className="h3 mb-3 mb-md-4 fw-normal">Please sign in</h1>

                        <div className="form-floating">
                            <input type="email" className="form-control rounded-bottom-0" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3 mb-md-4">
                            <input type="password" className="form-control rounded-top-0" id="floatingPassword" placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <button className="btn btn-lg btn-primary w-100 d-flex-center" type="submit">
                            <FaSignInAlt className="me-2" /> Sign in
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

SignIn.noAuth = true;

export default SignIn

const Form = styled.form`
    text-align: center;
    min-width: 18rem;
`