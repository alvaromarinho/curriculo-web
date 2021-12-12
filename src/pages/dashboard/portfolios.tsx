import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { Portfolio } from '../../models/User';
import { getPorfolios } from '../../services/PortfolioService';
import _ from "lodash";
import { CgSpinner } from 'react-icons/cg';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { titleCase } from '../../utils/StringUtils';
import Projects from '../../components/pages/dashboard/Projects';

export default function Portfolios() {

    const [loading, setLoading] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [portfolios, setPorfolios] = useState<Portfolio[]>();
    const [currentPortfolio, setCurrentPortfolio] = useState<Portfolio | null>(null);

    useEffect(() => {
        import("bootstrap").then(({ Modal }) => {
            const modalHTML = document && document.getElementById('modal');
            modalHTML && new Modal(modalHTML)
        });

        loadPortfolios()
    }, [])

    function loadPortfolios() {
        setLoading(true)
        setCurrentPortfolio(null)
        getPorfolios()
            .then((portfolios: Portfolio[]) => setPorfolios(portfolios))
            .finally(() => setLoading(false))
    }

    return (
        <div className="card card-body px-4">
            {loading ?
                <div className="text-center py-5">
                    <CgSpinner className="fa-spin me-2 fa-3x" />
                </div>
                :
                <>
                    <div className="row justify-content-between align-items-center mb-2">
                        <div className="col-auto">
                            {currentPortfolio && currentPortfolio.id ?
                                <h2 className="me-2">Editar Portfólio</h2>
                            : currentPortfolio && !currentPortfolio.id ?
                                <h2 className="me-2">Novo Portfólio</h2>
                                :
                                <h2 className="me-2">Portfólios</h2>
                            }
                        </div>
                        {!currentPortfolio &&
                            <div className="col-auto">
                                <button className="btn btn-primary d-flex-center" type="button" onClick={() => setCurrentPortfolio({})}>
                                    <FaPlus className="me-2" />
                                    <span className="d-none d-md-inline">Novo Portfólio</span>
                                </button>
                            </div>
                        }
                    </div>

                    {/* LISTA */}
                    <div className="overflow-auto mx-n4">
                        <ul className="nav nav-tabs flex-nowrap px-4" id="myTab" role="tablist">
                            {!currentPortfolio && portfolios && portfolios.map((portfolio, index) =>
                                <li className="nav-item" role="presentation" key={portfolio.id}>
                                    <button className={`nav-link text-nowrap ${index == 0 && 'active'}`} data-bs-toggle="tab" data-bs-target={`#port_${portfolio.id}`} type="button" role="tab">
                                        {portfolio.name}
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="tab-content" id="myTabContent">
                        {!currentPortfolio && portfolios && portfolios.map((portfolio, index) =>
                            <div className={`tab-pane pt-3 fade ${index == 0 && 'show active'}`} id={`port_${portfolio.id}`} role="tabpanel" key={portfolio.id}>
                                {portfolio.projects && <Projects projects={portfolio.projects} />}
                            </div>
                        )}
                    </div>
                </>
            }
        </div>
    )
}


export async function getServerSideProps(ctx: NextPageContext) {
    const { akToken } = parseCookies(ctx)

    if (!akToken) {
        return {
            redirect: { destination: '/sign-in', permanent: false }
        }
    }

    return { props: {} }
}