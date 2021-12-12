import { useEffect, useState } from "react"
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { FaEdit, FaPlus, FaRegSave, FaRegTrashAlt } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { getInformations } from "../../services/InformationService";
import { Information } from "../../models/User";
import Button from "../../components/Button";
import _ from "lodash";
import dayjs from "dayjs";
import { titleCase } from "../../utils/StringUtils";

export default function Informations() {

    const [loading, setLoading] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);

    const [infos, setInfos] = useState<any>();
    const [types, setTypes] = useState<string[]>();

    useEffect(() => loadInfo(), [])

    function loadInfo() {
        setLoading(true)
        getInformations().then((info: Information[]) => {
            setTypes(_.chain(info).groupBy('type').map((value, index) => index).value())
            setInfos(_.chain(info).groupBy('type').value())
        }).finally(() => setLoading(false))
    }

    // function handleChange(e: any) {
    //     const { name, value } = e.target
    //     setInfo((form) => ({ ...form, [name]: value }))
    // }

    function handleSubmit(e: any) {
        e.preventDefault()
        // setLoadingSave(true)
        // updateUser(info)
        //     .then(() => toast.success('Dados atualizados com sucesso!'))
        //     .finally(() => setLoadingSave(false))
    }

    function addInfo() {
        console.log('add information')
    }

    function editInfo(information: Information) {
        console.log(information)
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
                            <h2 className="mb-0 me-2">Informações</h2>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-sm btn-primary d-flex-center" type="button" onClick={addInfo}>
                                <FaPlus className="me-2" />
                                <span className="d-none d-md-inline">Nova Informação</span>
                            </button>
                        </div>
                    </div>
                    {types && types.map((type, index) =>
                        <div key={index}>
                            {infos[type] && infos[type].map((info: Information) =>
                                <div className={`card card-body mb-3 callout callout-${getColorByType(type)}`} key={info.id}>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <span className={`badge me-auto bg-${getColorByType(type)}`}>{type}</span>
                                        <button className="btn btn-sm btn-outline-primary border-0 d-flex-center" onClick={() => editInfo(info)}>
                                            <FaEdit className="me-1" /> Editar
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h3 className="fs-5 mb-0">{titleCase(info.title)}</h3>
                                        {(info.start && info.end) && 
                                            <span>{dayjs(info.start).format('DD/MM/YYYY')} até {dayjs(info.end).format('DD/MM/YYYY')}</span>
                                        }
                                    </div>
                                    <span className="text-muted">{titleCase(info.subtitle)}</span>
                                    {info.description && <div className="mt-2" dangerouslySetInnerHTML={{ __html: info.description }} />}
                                </div>
                            )}
                        </div>
                    )}
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