import { useContext, useState } from "react";
import { FaSignInAlt, FaRedoAlt } from "react-icons/fa";
import { parseCookies } from "nookies";
import { NextPageContext } from "next";
import { AuthContext, AuthForm } from "../contexts/AuthContext";
import styled from "styled-components";
import Router from "next/router";

const SignIn = () => {

    const [authForm, setAuthForm] = useState({} as AuthForm)
    const [loading, setLoading] = useState(false)

    const { signIn } = useContext(AuthContext)

    function handleChange(e: any) {
        const { name, value } = e.target
        setAuthForm((form) => ({ ...form, [name]: value }))
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        setLoading(true)
        signIn(authForm)
            .then(() => Router.push('/dashboard'))
            .finally(() => setLoading(false))
    }

    return (
        <div className="container-fluid bg-light h-100 d-flex-center">
            <div className="card">
                <div className="card-body p-4 p-md-5">
                    <Form onSubmit={handleSubmit}>
                        <img className="mb-4" src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                        <h1 className="h3 mb-3 mb-md-4 fw-normal">Please sign in</h1>

                        <div className="form-floating">
                            <input type="email" className="form-control rounded-bottom-0" id="email" name="email"
                                autoComplete="off" placeholder="name@example.com" onChange={handleChange} />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating mb-3 mb-md-4">
                            <input type="password" className="form-control rounded-top-0" id="password" name="password"
                                autoComplete="off" placeholder="Password" onChange={handleChange} />
                            <label htmlFor="password">Password</label>
                        </div>

                        <button className="btn btn-lg btn-primary w-100 d-flex-center" type="submit" disabled={loading}>
                            {loading ? <FaRedoAlt className="fa-spin me-2" /> : <FaSignInAlt className="me-2" />} Sign in
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
export async function getServerSideProps(ctx: NextPageContext) {
    const { akToken } = parseCookies(ctx)
    if (akToken) {
        return {
            redirect: { destination: '/dashboard', permanent: false }
        }
    }

    return {
        props: {}
    }
}