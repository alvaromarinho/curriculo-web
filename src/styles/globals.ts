import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";

export default createGlobalStyle`

    html, body, #__next { height: 100% }
    body { 
        font-family: 'Montserrat', sans-serif; 
        background: linear-gradient(270deg, #eef8ff, #FFF, #eef8ff);
    }

    a { text-decoration: none; }

    a:hover { color: var(--bs-primary)!important; }

    :required { border-left: 3px solid red }
    :required:valid { border-left-color: limegreen }

    /* ==========================================================================
    Callout's
    ========================================================================== */

    .callout { border-left-color: rgba(0,0,0,.125); border-left-width: 0.25rem; border-radius: 0.25rem; }
    .callout-primary { border-left-color: var(--bs-primary) }
    .callout-secondary { border-left-color: var(--bs-secondary) }
    .callout-success { border-left-color: var(--bs-success) }
    .callout-danger { border-left-color: var(--bs-danger) }
    .callout-warning { border-left-color: var(--bs-warning) }
    .callout-info { border-left-color: var(--bs-info) }
    .callout-light { border-left-color: var(--bs-light) }
    .callout-dark { border-left-color: var(--bs-dark) }

    /* ==========================================================================
    Title Page
    ========================================================================== */

    .title-page { position: relative; font-weight: 500; padding-bottom: .5rem}
    .title-page::after { content: ""; position: absolute; display: block; width: 4rem; height: 3px; background: #0563bb; bottom: 0; }

    /* ==========================================================================
    Custom
    ========================================================================== */

    .d-flex-center { display: flex; align-items: center; justify-content: center; }

    .pointer { cursor: pointer }

    .img-cover { object-fit: cover }
    .img-cover-top { object-position: top }
    .img-hover { filter: grayscale(100%); transition: .3s ease-in-out; }
    .img-hover:hover { filter: grayscale(0); }

    .top-1 { top: 1rem } 
    .end-1 { right: 1rem }

    .rounded-bottom-0 { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
    .rounded-top-0 { border-top-left-radius: 0; border-top-right-radius: 0; }

    .mx-n4 { margin-left: -1.5rem; margin-right: -1.5rem; }

    .fs-7 { font-size: .9rem }

    /* ==========================================================================
    Bootstrap Custom
    ========================================================================== */

    .carousel-control-prev { background-image: linear-gradient(to left, transparent, gray); }
    .carousel-control-next { background-image: linear-gradient(to right, transparent, gray); }

    .modal-content > .btn-close { position: fixed; top: 1rem; right: 1rem; font-size: 1.5rem; z-index: 1060 }

    /* ==========================================================================
    Mobile
    ========================================================================== */

    @media (max-width: 768px) { }
`;