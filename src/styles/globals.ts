import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";

export default createGlobalStyle`

    html, body, #__next { height: 100% }

    a { text-decoration: none; color: #45505b !important; }

    a:hover { color: var(--bs-primary)!important; }

    /* ==========================================================================
    Callout's
    ========================================================================== */

    .callout { border: 1px solid #e9ecef; border-left-width: 0.25rem; border-radius: 0.25rem; }
    .callout-primary { border-left-color: var(--bs-primary) }
    .callout-secondary { border-left-color: var(--bs-secondary) }
    .callout-success { border-left-color: var(--bs-success) }
    .callout-danger { border-left-color: var(--bs-danger) }
    .callout-warning { border-left-color: var(--bs-warning) }
    .callout-info { border-left-color: var(--bs-info) }
    .callout-light { border-left-color: var(--bs-light) }
    .callout-dark { border-left-color: var(--bs-dark) }

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

    @media (max-width: 768px) { }
`;