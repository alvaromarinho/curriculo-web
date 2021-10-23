import { useState } from 'react';
import { Curriculo } from '../models/User'

interface PortfolioProps { user: Curriculo }

export default function Portfolio({ user }: PortfolioProps) {

    const [currentPortfolio, setCurrentPortfolio] = useState<number>();

    return (
        <div className="container px-6">
            <ul className="nav nav-tabs" role="tablist">
                {user.portfolios && user.portfolios.map((portfolio, index) => (
                    <li className="nav-item" role="presentation" key={index}>
                        <button type="button" role="tab" onClick={() => setCurrentPortfolio(portfolio.id)}
                            className={`nav-link ${((currentPortfolio == undefined && index == 1) || currentPortfolio == portfolio.id) && 'active'}`}>
                            {portfolio.name}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {user.portfolios && user.portfolios.map((portfolio, index) => (
                    <div className={`tab-pane fade ${((currentPortfolio == undefined && index == 1) || currentPortfolio == portfolio.id) && 'show active'}`} key={index}>
                        {portfolio.projects && portfolio.projects.map((project) => (
                            <b key={project.id}>{project.title}</b>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}