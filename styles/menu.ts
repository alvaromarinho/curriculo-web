import styled from "styled-components";

export const Menu = styled.div`
    position: fixed;
    top: 50%;
    padding: 0;
    transform: translateY(-50%);

    a {
        display: flex;
        align-items: center;
        text-transform: lowercase;
        background-color: var(--bs-gray-300);
        width: 4.2rem;
        white-space: nowrap;
        margin-bottom: 1rem;
        padding-left: 2rem;
        border-top-right-radius: 50rem;
        border-bottom-right-radius: 50rem;
        transition: .3s ease .1s;
    }
    
    a:hover {
        background-color: var(--bs-primary);
        color: white !important;
        transition: .1s;
    }

    a i {
        font-size: 1.2rem;
        margin-right: 1rem;
        z-index: 1;
    }

    a span {
        background-color: var(--bs-primary);
        color: var(--bs-primary);
        padding: .7rem 1rem .8rem 2rem;
        border-top-right-radius: 50rem;
        border-bottom-right-radius: 50rem;
        margin-left: -2rem;
        transform: translateX(-150%);
        transition: transform .2s;
    }
    
    a:hover span {
        transform: translateX(0%);
        color: white !important;
        transition: color .5s ease .3s, transform .3s;
    }

    a span:first-letter {
        text-transform: capitalize;
    }

`;