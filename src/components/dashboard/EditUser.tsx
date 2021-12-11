import { useEffect, useState } from "react"
import { FaRegSave } from "react-icons/fa";
import { getUser, updateUser } from "../../services/UserService";
import { CgSpinner } from "react-icons/cg";
import { Curriculo } from "../../models/User";
import Router from "next/router";
import Button from "../Button";

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

    function handleSubmit(e: any) {
        e.preventDefault()
        setLoadingSave(true)
        updateUser(userForm).finally(() => setLoadingSave(false))
    }

    return (
        <div className="card card-body mb-3">
            {loading ?
                <div className="text-center py-5">
                    <CgSpinner className="fa-spin me-2 fa-3x" />
                </div>
                :
                <form className="row" onSubmit={handleSubmit}>
                    <div className="col-12 col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="name" name="name" placeholder="Nome"
                                value={userForm.name} onChange={handleChange} />
                            <label htmlFor="name">Nome</label>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="email" name="email" placeholder="Email"
                                value={userForm.email} readOnly />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="city" name="city" placeholder="Cidade"
                                value={userForm.city} onChange={handleChange} />
                            <label htmlFor="city">Cidade</label>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-floating mb-3">
                            <select id="uf" name="uf" className="form-select" placeholder="Estado"
                                defaultValue={userForm.uf} onChange={handleChange}>
                                {ufs.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                            </select>
                            <label htmlFor="uf">Estado</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating mb-3">
                            <textarea className="form-control" id="description" name="descripnameon" placeholder="Descrição" 
                                defaultValue={userForm.description} onChange={handleChange}></textarea>
                            <label htmlFor="description">Descrição</label>
                        </div>
                    </div>
                    <div className="col-12 col-md-auto">
                        <Button color="success" text="Salvar" type="submit" loading={loadingSave} className="px-5 w-100">
                            <FaRegSave className="me-2" />
                        </Button>
                    </div>
                </form>
            }
        </div>
    )
}