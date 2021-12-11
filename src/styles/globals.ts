import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";

export default createGlobalStyle`

    html, body, #__next { height: 100% }

    a { text-decoration: none; color: #45505b !important; }

    a:hover { color: var(--bs-primary)!important; }

    /* ==========================================================================
    Custom
    ========================================================================== */

    .d-flex-center { display: flex; align-items: center; justify-content: center; }

    .pointer { cursor: pointer }

    .rounded-bottom-0 { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
    .rounded-top-0 { border-top-left-radius: 0; border-top-right-radius: 0; }

    .p-6 { padding: 5rem; }
    .px-6 { padding-right: 5rem; padding-left: 5rem; }
    .pb-7 { padding-bottom: 8rem; }

    .mb-6 { margin-bottom: 5rem; }
    .mb-7 { margin-bottom: 8rem; }

    .form-floating textarea.form-control {
        min-height: 10rem;
    }

    @media (max-width: 768px) { }
`;