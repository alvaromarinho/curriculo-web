import { useEffect, useState } from "react"
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { FaAngleLeft, FaPlus, FaRegEdit, FaRegSave, FaRegTrashAlt, FaTimes } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { createInformations, deleteInformations, getInformations, updateInformations } from "../../services/InformationService";
import { Information } from "../../models/User";
import { InformationType } from "../../models/InformationType";
import { titleCase } from "../../utils/StringUtils";
import Button from "../../components/Button";
import _ from "lodash";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

export default function Informations() {

    const [loading, setLoading] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const [infos, setInfos] = useState<any>();
    const [currentInfo, setCurrentInfo] = useState<Information | null>(null);
    const [types, setTypes] = useState<string[]>();

    useEffect(() => {
        import("bootstrap").then(({ Modal }) => {
            const modalHTML = document && document.getElementById('modal');
            modalHTML && new Modal(modalHTML)
        });

        loadInfo()
    }, [])

    function loadInfo() {
        setLoading(true)
        setCurrentInfo(null)
        getInformations().then((info: Information[]) => {
            setTypes(_.chain(info).groupBy('type').map((value, index) => index).value())
            setInfos(_.chain(info).groupBy('type').value())
        }).finally(() => setLoading(false))
    }

    function deleteInfo() {
        setLoadingDelete(true)
        const closeModal = document.getElementById('close-modal');
        if (currentInfo && currentInfo.id)
            deleteInformations(currentInfo.id).then(() => {
                closeModal?.click()
                onSuccess('apagados')
            }).finally(() => setLoadingSave(false))
    }

    function handleChange(e: any) {
        const { name, value } = e.target
        setCurrentInfo((form) => ({ ...form, [name]: value }))
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        setLoadingSave(true)
        if (currentInfo && currentInfo.id)
            updateInformations(currentInfo)
                .then(() => onSuccess('atualizados'))
                .finally(() => setLoadingSave(false))
        else if (currentInfo)
            createInformations(currentInfo)
                .then(() => onSuccess('atualizados'))
                .finally(() => setLoadingSave(false))
    }

    function onSuccess(text: string) {
        loadInfo()
        toast.success(`Dados ${text} com sucesso!`)
    }

    function getColorByType(type: string) {
        switch (type) {
            case 'EDUCATION': return 'success';
            case 'SKILLS': return 'danger';
            case 'EXPERIENCE': return 'info';
            default: return 'secondary';
        }
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
                            {currentInfo && currentInfo.id ?
                                <h2 className="mb-0 me-2">Editar Informação</h2>
                                : currentInfo && !currentInfo.id ?
                                    <h2 className="mb-0 me-2">Nova Informação</h2>
                                    :
                                    <h2 className="mb-0 me-2">Informações</h2>
                            }
                        </div>
                        {!currentInfo &&
                            <div className="col-auto">
                                <button className="btn btn-sm btn-primary d-flex-center" type="button" onClick={() => setCurrentInfo({})}>
                                    <FaPlus className="me-2" />
                                    <span className="d-none d-md-inline">Nova Informação</span>
                                </button>
                            </div>
                        }
                    </div>

                    {/* LISTA */}
                    {!currentInfo && types && types.map((type, index) =>
                        <div key={index}>
                            {infos[type] && infos[type].sort((a: any, b: any) => a.start > b.start && 1 || -1).map((info: Information) =>
                                <div className={`card card-body mb-3 callout callout-${getColorByType(type)}`} key={info.id}>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <span className={`badge bg-${getColorByType(type)}`}>{type}</span>
                                        <button className="btn btn-sm btn-outline-primary border-0 d-flex-center" onClick={() => setCurrentInfo(info)}>
                                            <FaRegEdit className="mb-1 me-1" /> Editar
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h3 className="fs-5 mb-0">{titleCase(info.title)}</h3>
                                        {info.start &&
                                            <span>{dayjs(info.start).format('DD/MM/YYYY')} {info.end ? `até ${dayjs(info.end).format('DD/MM/YYYY')}` : 'até hoje'}</span>
                                        }
                                    </div>
                                    <span className="text-muted">{titleCase(info.subtitle)}</span>
                                    {info.description && <div className="mt-2" dangerouslySetInnerHTML={{ __html: info.description }} />}
                                </div>
                            )}
                        </div>
                    )}

                    {/* NOVO/EDITAR */}
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
                                        <textarea className="form-control" id="description" name="descripnameon" rows={8}
                                            defaultValue={currentInfo.description || undefined} onChange={handleChange}></textarea>
                                    </div>
                                </div>
                                <hr className="text-muted" />
                                <div className="row">
                                    {currentInfo.id &&
                                        <div className="col-12 col-md-auto order-2 order-md-1">
                                            <button className="btn btn-danger d-flex-center px-5 w-100" type="button" data-bs-toggle="modal" data-bs-target="#modal">
                                                <FaRegTrashAlt className="me-1" /> Apagar
                                            </button>
                                        </div>
                                    }
                                    <div className="col-12 col-md-auto order-2 order-md-1 ms-auto">
                                        <button className="btn btn-warning d-flex-center px-5 w-100" type="button" onClick={() => setCurrentInfo(null)}>
                                            <FaAngleLeft className="me-1" /> Voltar
                                        </button>
                                    </div>
                                    <div className="col-12 col-md-auto order-1 order-md-2">
                                        <Button color="success" text="Salvar" type="submit" loading={loadingSave} className="px-5 w-100">
                                            <FaRegSave className="me-2" />
                                        </Button>
                                    </div>
                                </div>
                            </form>

                            {/* Modal */}
                            <div className="modal fade" id="modal" tabIndex={-1} aria-labelledby="modal" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header bg-danger text-white">
                                            <h5 className="modal-title" id="modal">Deseja apagar essa informação?</h5>
                                            <button type="button" className="btn-close" id="close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <h3 className="fs-5 mb-0">{titleCase(currentInfo.title)}</h3>
                                            <span className="text-muted">{titleCase(currentInfo.subtitle)}</span>
                                        </div>
                                        <div className="modal-footer">
                                            <Button color="danger" text="Apagar" loading={loadingDelete} type="button" onClick={deleteInfo}>
                                                <FaRegTrashAlt className="me-2" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
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