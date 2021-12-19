import { useEffect, useState } from "react"
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { FaAngleLeft, FaPlus, FaRegEdit, FaRegSave, FaRegTrashAlt, FaTimes } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { createInformation, deleteInformation, getInformations, updateInformation } from "../../services/InformationService";
import { Information, InformationType } from "../../models/Information";
import { removeHTML } from "../../utils/StringUtils";
import Button from "../../components/Button";
import _ from "lodash";

import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

export default function Informations() {

    const [loading, setLoading] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [modal, setModal] = useState<any>();

    const [infos, setInfos] = useState<any>();
    const [currentInfo, setCurrentInfo] = useState<Information | null>(null);
    const [filteredInfos, setFilteredInfos] = useState<Information[] | null>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [types, setTypes] = useState<string[]>();
    const [currentType, setCurrentType] = useState<string>();

    useEffect(() => {
        import("bootstrap").then(({ Modal }) => {
            const modalHTML = document && document.getElementById('modal');
            modalHTML && setModal(new Modal(modalHTML))
        });

        loadInfo()
    }, [])

    useEffect(() => {
        types && !currentType && setCurrentType(types[0])
    }, [types])

    useEffect(() => {
        if (currentType) {
            setSearchTerm('')
            setFilteredInfos(infos[currentType].sort((a: any, b: any) => a.start > b.start && 1 || -1))
        }
    }, [currentType])

    useEffect(() => {
        if (searchTerm && currentType) {
            setFilteredInfos(infos[currentType].filter((info: Information) =>
                (info.title && info.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (info.subtitle && info.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (info.description && info.description.toLowerCase().includes(searchTerm.toLowerCase()))
            ))
        } else if (currentType) {
            setFilteredInfos(infos[currentType].sort((a: any, b: any) => a.start > b.start && 1 || -1))
        }
    }, [searchTerm])

    function loadInfo() {
        const currType = currentType;
        currentType && setCurrentType(undefined)

        setLoading(true)
        setCurrentInfo(null)
        getInformations().then((info: Information[]) => {
            setTypes(_.chain(info).groupBy('type').map((value, index) => index).value())
            setInfos(_.chain(info).groupBy('type').value())
            currType && setCurrentType(currType)
        })
            .catch((error) => toast.error(removeHTML(error.response.data) || 'Error'))
            .finally(() => setLoading(false))
    }

    function removeInfo() {
        setLoadingDelete(true)
        if (currentInfo && currentInfo.id)
            deleteInformation(currentInfo.id).then(() => {
                modal.hide()
                onSuccess('apagados')
            })
                .catch((error) => toast.error(removeHTML(error.response.data) || 'Error'))
                .finally(() => setLoadingSave(false))
    }

    function handleChange(e: any) {
        const { name, value } = e.target
        setCurrentInfo((prev) => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        setLoadingSave(true)
        if (currentInfo && currentInfo.id)
            updateInformation(currentInfo)
                .then(() => onSuccess('atualizados'))
                .catch((error) => toast.error(removeHTML(error.response.data) || 'Error'))
                .finally(() => setLoadingSave(false))
        else if (currentInfo)
            createInformation(currentInfo)
                .then(() => onSuccess('criados'))
                .catch((error) => toast.error(removeHTML(error.response.data) || 'Error'))
                .finally(() => setLoadingSave(false))
    }

    function onSuccess(text: string) {
        loadInfo()
        toast.success(`Dados ${text} com sucesso!`)
    }

    return (
        <div className="card card-body border-0 shadow px-4">
            {loading ?
                <div className="text-center py-5">
                    <CgSpinner className="fa-spin me-2 fa-3x" />
                </div>
                :
                <>
                    <div className="row justify-content-between align-items-center mb-2">
                        <div className="col-auto">
                            {currentInfo && currentInfo.id ?
                                <h2 className="me-2">Editar Informação</h2>
                                : currentInfo && !currentInfo.id ?
                                    <h2 className="me-2">Nova Informação</h2>
                                    :
                                    <h2 className="me-2">Informações</h2>
                            }
                        </div>
                        {!currentInfo &&
                            <div className="col-auto">
                                <button className="btn btn-primary d-flex-center" type="button" onClick={() => setCurrentInfo({})}>
                                    <FaPlus className="me-md-2" />
                                    <span className="d-none d-md-inline">Nova Informação</span>
                                </button>
                            </div>
                        }
                    </div>

                    {/* LISTA */}
                    {!currentInfo &&
                        <>
                            <div className="overflow-auto mx-n4">
                                <ul className="nav nav-tabs flex-nowrap px-4" id="myTab" role="tablist">
                                    {types && types.map((type, index) =>
                                        <li className="nav-item" role="presentation" key={index}>
                                            <button className={`nav-link text-nowrap ${currentType == type && 'active'}`} type="button" role="tab"
                                                data-bs-toggle="tab" data-bs-target={`#${type}`} onClick={() => setCurrentType(type)}>
                                                {type}
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="tab-content" id="myTabContent">
                                {types && types.map((type, index) =>
                                    <div className={`tab-pane pt-3 fade ${currentType == type && 'show active'}`} id={type} role="tabpanel" key={index}>
                                        <input type="text" name="search" className="form-control mb-3" autoComplete="off" placeholder="Buscar informação..."
                                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                                        {!filteredInfos?.length && <div className="card card-body text-center text-muted">Nenhuma informação encontrada</div>}

                                        {filteredInfos && filteredInfos.map((info: Information) =>
                                            <div className={`card card-body mb-3 callout`} key={info.id}>
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <h3 className="fs-5 mb-md-0">{info.title}</h3>
                                                    <button className="btn btn-sm btn-outline-primary border-0 d-flex-center" onClick={() => setCurrentInfo(info)}>
                                                        <FaRegEdit className="mb-md-1 me-md-1" />
                                                        <span className="d-none d-md-inline">Editar</span>
                                                    </button>
                                                </div>
                                                <div className="row justify-content-between align-items-center">
                                                    <div className="col-12 col-md-auto text-muted order-2 order-md-1 mb-3 mb-md-0">{info.subtitle}</div>
                                                    {info.start &&
                                                        <div className="col-12 col-md-auto order-1 order-md-2 mb-2 mb-md-0">
                                                            {dayjs(info.start).format('DD/MM/YYYY')} {info.end ? `até ${dayjs(info.end).format('DD/MM/YYYY')}` : 'até hoje'}
                                                        </div>
                                                    }
                                                </div>
                                                {info.description && <div className="mt-2" dangerouslySetInnerHTML={{ __html: info.description }} />}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    }

                    {/* NOVO - EDITAR */}
                    {currentInfo &&
                        <>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label htmlFor="title">Título</label>
                                        <input type="text" className="form-control" id="title" name="title"
                                            value={currentInfo.title} onChange={handleChange} required />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label htmlFor="subtitle">Subtítulo</label>
                                        <input type="text" className="form-control" id="subtitle" name="subtitle"
                                            value={currentInfo.subtitle || undefined} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label htmlFor="type">Tipo</label>
                                        <select id="type" name="type" className="form-select" defaultValue={currentInfo.type} onChange={handleChange} required>
                                            <option />
                                            {Object.keys(InformationType).filter((it) => isNaN(Number(it)) === false).map(
                                                (value: any) => <option key={InformationType[value]} value={InformationType[value]}>{InformationType[value]}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label htmlFor="start">Início</label>
                                        <input type="date" className="form-control" id="start" name="start" onChange={handleChange}
                                            value={currentInfo.start ? dayjs(currentInfo.start).format('YYYY-MM-DD') : undefined} />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label htmlFor="end">Fim</label>
                                        <input type="date" className="form-control" id="end" name="end" onChange={handleChange}
                                            value={currentInfo.end ? dayjs(currentInfo.end).format('YYYY-MM-DD') : undefined} />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="description">Descrição</label>
                                        <textarea className="form-control" id="description" name="description" rows={8}
                                            defaultValue={currentInfo.description || undefined} onChange={handleChange}></textarea>
                                    </div>
                                </div>
                                <hr className="text-muted" />
                                <div className="row">
                                    {currentInfo.id &&
                                        <div className="col-12 col-md-auto order-3 order-md-1 mb-2 mb-md-0">
                                            <button className="btn btn-danger d-flex-center px-5 w-100" type="button" data-bs-toggle="modal" data-bs-target="#modal">
                                                <FaRegTrashAlt className="me-1" /> Apagar
                                            </button>
                                        </div>
                                    }
                                    <div className="col-12 col-md-auto order-2 order-md-2 ms-auto mb-2 mb-md-0">
                                        <button className="btn btn-warning d-flex-center px-5 w-100" type="button" onClick={() => setCurrentInfo(null)}>
                                            <FaAngleLeft className="me-1" /> Voltar
                                        </button>
                                    </div>
                                    <div className="col-12 col-md-auto order-1 order-md-3 mb-2 mb-md-0">
                                        <Button color="success" text="Salvar" type="submit" loading={loadingSave} className="px-5 w-100">
                                            <FaRegSave className="me-2" />
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </>
                    }
                </>
            }
            {/* MODAL */}
            <div className="modal fade" id="modal" tabIndex={-1} aria-labelledby="modal" aria-hidden="true">
                <div className="modal-dialog">
                    {currentInfo &&
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title" id="modal">Deseja apagar essa informação?</h5>
                                <button type="button" className="btn-close" id="close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h3 className="fs-5 mb-0">{currentInfo.title}</h3>
                                <span className="text-muted">{currentInfo.subtitle}</span>
                            </div>
                            <div className="modal-footer">
                                <div className="col-12 col-md-auto">
                                    <Button color="danger" text="Apagar" loading={loadingDelete} type="button" onClick={removeInfo} className="w-100">
                                        <FaRegTrashAlt className="me-2" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
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