import { useState } from 'react';
import { Curriculo } from '../models/User'
import styled from "styled-components";

interface PortfolioProps { user: Curriculo }

export default function Portfolio({ user }: PortfolioProps) {

    const [currentPortfolio, setCurrentPortfolio] = useState<number>();

    return (
        <section className="vh-100 d-flex" id="portfolio">
            <div className="container px-6 pt-5">
                <h2 className="text-center mb-5">Portfolio</h2>
                <Nav className="nav nav-tabs justify-content-center" role="tablist">
                    {user.portfolios && user.portfolios.map((portfolio, index) => (
                        <li className="nav-item" role="presentation" key={index}>
                            <button type="button" role="tab" onClick={() => setCurrentPortfolio(portfolio.id)}
                                className={`nav-link ${((currentPortfolio == undefined && index == 0) || currentPortfolio == portfolio.id) && 'active'}`}>
                                {portfolio.name}
                            </button>
                        </li>
                    ))}
                </Nav>
                <div className="tab-content mt-3">
                    {user.portfolios && user.portfolios.map((portfolio, index) => (
                        <div className={`tab-pane fade ${((currentPortfolio == undefined && index == 0) || currentPortfolio == portfolio.id) && 'show active'}`} key={index}>
                            {portfolio.projects && portfolio.projects.map((project) => (
                                <b key={project.id}>{project.title}</b>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export const Nav = styled.ul`

    &, .nav-link, .nav-link:hover, .nav-link:focus {
        border: none;
    }

    .nav-link.active {
        text-shadow: 1px 0 0 currentColor;
    }

`;