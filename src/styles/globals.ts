import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

export default createGlobalStyle`

    .px-6 { padding-right: 5rem; padding-left: 5rem; }

    .mb-6 { margin-bottom: 5rem; }
    .mb-7 { margin-bottom: 8rem; }

    a { text-decoration: none; color: #45505b !important; }

    a:hover { color: var(--bs-primary)!important; }

    @media (max-width: 768px) { }
`;