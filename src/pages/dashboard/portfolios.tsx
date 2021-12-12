import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { Portfolio } from '../../models/User';
import { createPortfolio, deletePortfolio, getPortfolios, updatePortfolio } from '../../services/PortfolioService';
import { CgSpinner } from 'react-icons/cg';
import { FaExclamationTriangle, FaPlus, FaRegSave, FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import Projects from '../../components/pages/dashboard/Projects';
import Button from '../../components/Button';
import _ from "lodash";
import { toast } from 'react-toastify';

export default function Portfolios() {

    const [loading, setLoading] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [portfolios, setPorfolios] = useState<Portfolio[]>();
    const [currentPortfolio, setCurrentPortfolio] = useState<Portfolio | null>(null);
    const [newPortfolio, setNewPortfolio] = useState<Portfolio | null>(null);

    useEffect(() => {
        import("bootstrap").then(({ Modal }) => {
            const modalHTML = document && document.getElementById('modal');
            modalHTML && new Modal(modalHTML)
        });

        loadPortfolios()
    }, [])

    function loadPortfolios() {
        setLoading(true)
        getPortfolios().then((portfolios: Portfolio[]) => {
            setPorfolios(portfolios)
            if (portfolios.length) setCurrentPortfolio(portfolios[0])
        }).finally(() => setLoading(false))
    }

    function removePortfolio() {
        setLoadingDelete(true)
        const closeModal = document.getElementById('close-modal');
        if (currentPortfolio && currentPortfolio.id)
            deletePortfolio(currentPortfolio.id).then(() => {
                closeModal?.click()
                onSuccess('apagados')
            }).finally(() => setLoadingSave(false))
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        setLoadingSave(true)
        if (newPortfolio && newPortfolio.id)
            updatePortfolio(newPortfolio)
                .then(() => onSuccess('atualizados'))
                .finally(() => setLoadingSave(false))
        else if (newPortfolio)
            createPortfolio(newPortfolio)
                .then(() => onSuccess('atualizados'))
                .finally(() => setLoadingSave(false))
    }

    function onSuccess(text: string) {
        loadPortfolios()
        toast.success(`Dados ${text} com sucesso!`)
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
                            <h2 className="me-2">Portfólios</h2>
                        </div>
                        {!newPortfolio &&
                            <div className="col-auto">
                                <button className="btn btn-primary d-flex-center" type="button" onClick={() => setNewPortfolio({})}>
                                    <FaPlus className="me-2" />
                                    <span className="d-none d-md-inline">Novo Portfólio</span>
                                </button>
                            </div>
                        }
                    </div>

                    {newPortfolio &&
                        <form onSubmit={handleSubmit}>
                            <div className="row g-2 justify-content-between align-items-end mb-4">
                                <div className="col">
                                    <div className="col-12">
                                        <label htmlFor="title">Novo Portfólio</label>
                                        <input type="text" className="form-control" id="title" name="title" value={newPortfolio.name} placeholder="Nome"
                                            onChange={(e) => setNewPortfolio((prev) => ({ ...prev, name: e.target.value }))} required />
                                    </div>
                                </div>
                                <div className="col-12 col-md-auto order-2 order-md-1 ms-auto">
                                    <Button color="success" text="Salvar" type="submit" loading={loadingSave} className="px-4 w-100">
                                        <FaRegSave className="me-2" />
                                    </Button>
                                </div>
                                <div className="col-12 col-md-auto order-1 order-md-2">
                                    <button className="btn btn-light d-flex-center w-100" type="button" onClick={() => setNewPortfolio(null)}>
                                        <FaTimes className="me-1" /> Cancelar
                                    </button>
                                </div>
                            </div>
                        </form>

                    }

                    {/* LISTA */}
                    <div className="overflow-auto mx-n4">
                        <ul className="nav nav-tabs flex-nowrap px-4" id="myTab" role="tablist">
                            {portfolios && portfolios.map((portfolio, index) =>
                                <li className="nav-item" role="presentation" key={portfolio.id}>
                                    <button className={`nav-link text-nowrap ${index == 0 && 'active'}`} type="button" role="tab"
                                        data-bs-toggle="tab" data-bs-target={`#port_${portfolio.id}`} onClick={() => setCurrentPortfolio(portfolio)}>
                                        {portfolio.name}
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="tab-content" id="myTabContent">
                        {portfolios && portfolios.map((portfolio, index) =>
                            <div className={`tab-pane pt-3 fade ${index == 0 && 'show active'}`} id={`port_${portfolio.id}`} role="tabpanel" key={portfolio.id}>
                                {portfolio.projects && <Projects projects={portfolio.projects} />}
                                <hr className="text-muted" />
                                {currentPortfolio &&
                                    <div className="row">
                                        <div className="col-12 col-md-auto order-2 order-md-1 ms-auto">
                                            <button className="btn btn-outline-danger border-0 d-flex-center w-100" type="button" data-bs-toggle="modal" data-bs-target="#modal">
                                                <FaRegTrashAlt className="me-2" /> Apagar Portfólio
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        )}
                    </div>

                    {/* MODAL */}
                    <div className="modal fade" id="modal" tabIndex={-1} aria-labelledby="modal" aria-hidden="true">
                        <div className="modal-dialog">
                            {currentPortfolio &&
                                <div className="modal-content">
                                    <div className="modal-header bg-danger text-white">
                                        <h5 className="modal-title" id="modal">Deseja apagar o portfolio {currentPortfolio.name}?</h5>
                                        <button type="button" className="btn-close" id="close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="d-flex align-items-center mb-2">
                                            <FaExclamationTriangle className="text-warning me-2" /> <span className="fw-bold fs-5 lh-1">Atenção</span>
                                        </div>
                                        <p className="m-0">
                                            Ao excluir o portfólio, todos os projetos vinculados a ele serão excluídos também. <u>Essa ação é irreversível!</u>
                                        </p>
                                    </div>
                                    <div className="modal-footer">
                                        <Button color="danger" text="Apagar" loading={loadingDelete} type="button" onClick={removePortfolio}>
                                            <FaRegTrashAlt className="me-2" />
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>
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