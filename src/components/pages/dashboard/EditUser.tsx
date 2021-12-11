import { useEffect, useState } from "react"
import { FaPlus, FaRegSave, FaRegTrashAlt } from "react-icons/fa";
import { getUser, updateUser } from "../../../services/UserService";
import { CgSpinner } from "react-icons/cg";
import { Curriculo } from "../../../models/User";
import Button from "../../Button";
import { toast } from "react-toastify";

export default function EditUser() {

    const [loading, setLoading] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);
    const [userForm, setUserForm] = useState<Curriculo>({} as Curriculo);
    const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

    useEffect(() => loadUser(), [])

    function loadUser() {
        setLoading(true)
        getUser().then((user: Curriculo) => {
            setUserForm(user)
        }).finally(() => setLoading(false))
    }

    function handleChange(e: any) {
        const { name, value } = e.target
        setUserForm((form) => ({ ...form, [name]: value }))
    }

    function handleChangePhone(e: any, index: number) {
        const phones = userForm.phones;
        if (phones) phones[index] = { ...phones[index], number: e.target.value }
        setUserForm((form) => ({ ...form, phones: phones }))
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        setLoadingSave(true)
        updateUser(userForm)
            .then(() => toast.success('Dados atualizados com sucesso!'))
            .finally(() => setLoadingSave(false))
    }

    function addPhone() {
        const phones = userForm.phones;
        phones?.push({ number: '' })
        setUserForm((form) => ({ ...form, phones: phones }))
    }

    function removePhone(id?: number) {
        setUserForm((form) => ({ ...form, phones: form.phones ? form.phones.filter((phone) => phone.id !== id) : [] }))
    }

    return (
        <div className="card card-body mb-3">
            {loading ?
                <div className="text-center py-5">
                    <CgSpinner className="fa-spin me-2 fa-3x" />
                </div>
                :
                <form onSubmit={handleSubmit}>
                    <h2>Informações Pessoais</h2>
                    <div className="row">
                        <div className="col-12 col-md-6 mb-3">
                            <label htmlFor="name">Nome</label>
                            <input type="text" className="form-control" id="name" name="name" value={userForm.name} onChange={handleChange} />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={userForm.email} readOnly />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                            <label htmlFor="city">Cidade</label>
                            <input type="text" className="form-control" id="city" name="city" value={userForm.city} onChange={handleChange} />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                            <label htmlFor="uf">Estado</label>
                            <select id="uf" name="uf" className="form-select" defaultValue={userForm.uf} onChange={handleChange}>
                                {ufs.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                            </select>
                        </div>
                        <div className="col-12 mb-3">
                            <label htmlFor="description">Descrição</label>
                            <textarea className="form-control" id="description" name="descripnameon" rows={10}
                                defaultValue={userForm.description} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className="row g-0 align-items-center">
                        <div className="col-auto">
                            <h2 className="me-2">Telefone(s)</h2>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-outline-primary d-flex-center border-0" type="button" onClick={addPhone}>
                                <FaPlus className="me-2" />
                                <span className="d-none d-md-inline">Adicionar</span>
                            </button>
                        </div>
                    </div>
                    {userForm.phones && userForm.phones.map((phone, index) =>
                        <div className="row g-0 mb-3" key={index}>
                            <div className="col">
                                <input type="text" className="form-control" id={`phone_${phone.id}`} name={`phone_${phone.id}`}
                                    value={phone.number} onChange={(e) => handleChangePhone(e, index)} />
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-outline-danger d-flex-center border-0" onClick={() => removePhone(phone.id)}>
                                    <FaRegTrashAlt className="me-2" />
                                    <span className="d-none d-md-inline">Remover</span>
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="row">
                        <div className="col-12 col-md-auto">
                            <Button color="success" text="Salvar" type="submit" loading={loadingSave} className="px-5 w-100">
                                <FaRegSave className="me-2" />
                            </Button>
                        </div>
                    </div>
                </form>
            }
        </div>
    )
}