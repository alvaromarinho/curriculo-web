import { useEffect, useState } from "react"
import { FaPlus, FaRegSave, FaRegTrashAlt } from "react-icons/fa";
import { getUser, updateUser } from "../../../services/UserService";
import { CgSpinner } from "react-icons/cg";
import { Curriculo } from "../../../models/User";
import { toast } from "react-toastify";
import Button from "../../Button";
import styled from "styled-components";

export default function EditUser() {

    const [loading, setLoading] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);

    const [currentImage, setCurrentImage] = useState<string>();
    const [file, setFile] = useState()

    const [userForm, setUserForm] = useState<Curriculo>({} as Curriculo);
    const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

    useEffect(() => loadUser(), [])

    useEffect(() => {
        if (!file) return

        const objectUrl = URL.createObjectURL(file)
        setCurrentImage(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    function loadUser() {
        setLoading(true)
        getUser().then((user: Curriculo) => {
            setCurrentImage(`${process.env.API_URL}/assets/img/${user.image}`)
            setUserForm(user)
        }).finally(() => setLoading(false))
    }

    function handleChangeFile(e: any) {
        if (!e.target.files || e.target.files.length === 0) {
            setFile(undefined)
            return
        }

        setFile(e.target.files[0])
    }

    function handleChange(e: any) {
        const { name, value } = e.target
        setUserForm((form) => ({ ...form, [name]: value }))
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        setLoadingSave(true)
        updateUser(userForm, file)
            .then(() => toast.success('Dados atualizados com sucesso!'))
            .finally(() => setLoadingSave(false))
    }

    // PHONES

    function handleChangePhone(e: any, index: number) {
        const phones = userForm.phones;
        if (phones) phones[index] = { ...phones[index], number: e.target.value }
        setUserForm((form) => ({ ...form, phones: phones }))
    }

    function addPhone() {
        const phones = userForm.phones;
        phones?.push({ number: '' })
        setUserForm((form) => ({ ...form, phones: phones }))
    }

    function removePhone(id?: number) {
        setUserForm((form) => ({ ...form, phones: form.phones ? form.phones.filter((phone) => phone.id !== id) : [] }))
    }

    // SOCIAL NETWORKS

    function handleChangeSocialNetworks(e: any, index: number) {
        const { name, value } = e.target
        const socialNetworks = userForm.socialNetworks;
        if (socialNetworks) socialNetworks[index] = { ...socialNetworks[index], [name]: value }
        setUserForm((form) => ({ ...form, socialNetworks: socialNetworks }))
    }

    function addSocialNetworks() {
        const socialNetworks = userForm.socialNetworks;
        socialNetworks?.push({ name: '', icon: '', url: '' })
        setUserForm((form) => ({ ...form, socialNetworks: socialNetworks }))
    }

    function removeSocialNetworks(id?: number) {
        setUserForm((form) => ({
            ...form,
            socialNetworks: form.socialNetworks ? form.socialNetworks.filter((sn) => sn.id !== id) : []
        }))
    }

    return (
        <div className="card card-body mb-3">
            {loading ?
                <div className="text-center py-5">
                    <CgSpinner className="fa-spin me-2 fa-3x" />
                </div>
                :
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-2">Informações Pessoais</h2>
                    <div className="row">
                        <EditImage className="col-12 col-md-4">
                            <input className="d-none" id="image" type="file" name="image" onChange={handleChangeFile} />
                            <label htmlFor="image">
                                <img src={currentImage} alt="Profile" />
                                <span>Trocar imagem</span>
                            </label>
                        </EditImage>
                        <div className="col-12 col-md-8">
                            <div className="mb-3">
                                <label htmlFor="name">Nome</label>
                                <input type="text" className="form-control" id="name" name="name" value={userForm.name} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={userForm.email} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city">Cidade</label>
                                <input type="text" className="form-control" id="city" name="city" value={userForm.city} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="uf">Estado</label>
                                <select id="uf" name="uf" className="form-select" defaultValue={userForm.uf} onChange={handleChange}>
                                    {ufs.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="col-12 mb-4">
                            <label htmlFor="description">Descrição</label>
                            <textarea className="form-control" id="description" name="descripnameon" rows={8}
                                defaultValue={userForm.description} onChange={handleChange}></textarea>
                        </div>
                    </div>

                    {/* PHONE */}
                    <div className="row g-0 align-items-center mb-2">
                        <div className="col-auto">
                            <h2 className="mb-0 me-2">Telefone</h2>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-sm btn-outline-primary d-flex-center border-0" type="button" onClick={addPhone}>
                                <FaPlus className="me-2" />
                                <span className="d-none d-md-inline">Adicionar</span>
                            </button>
                        </div>
                    </div>
                    {userForm.phones && userForm.phones.map((phone, index) =>
                        <div className="row mb-4" key={index}>
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

                    {/* SOCIAL NETWORK */}
                    <div className="row g-0 align-items-center mb-2">
                        <div className="col-auto">
                            <h2 className="mb-0 me-2">Rede Social</h2>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-sm btn-outline-primary d-flex-center border-0" type="button" onClick={addSocialNetworks}>
                                <FaPlus className="me-2" />
                                <span className="d-none d-md-inline">Adicionar</span>
                            </button>
                        </div>
                    </div>
                    {userForm.socialNetworks && userForm.socialNetworks.map((sn, index) =>
                        <div className="row align-items-end mb-4" key={index}>
                            <div className="col">
                                <label htmlFor={`sn_icon_${sn.id}`}>Icone</label>
                                <input type="text" className="form-control" id={`sn_icon_${sn.id}`} name="icon"
                                    value={sn.icon} onChange={(e) => handleChangeSocialNetworks(e, index)} />
                            </div>
                            <div className="col">
                                <label htmlFor={`sn_name_${sn.id}`}>Name</label>
                                <input type="text" className="form-control" id={`sn_name_${sn.id}`} name="name"
                                    value={sn.name} onChange={(e) => handleChangeSocialNetworks(e, index)} />
                            </div>
                            <div className="col">
                                <label htmlFor={`sn_url_${sn.id}`}>Url</label>
                                <input type="text" className="form-control" id={`sn_url_${sn.id}`} name="url"
                                    value={sn.url} onChange={(e) => handleChangeSocialNetworks(e, index)} />
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-outline-danger d-flex-center border-0" onClick={() => removeSocialNetworks(sn.id)}>
                                    <FaRegTrashAlt className="me-2" />
                                    <span className="d-none d-md-inline">Remover</span>
                                </button>
                            </div>
                        </div>
                    )}

                    <hr className="text-muted" />
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

const EditImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover { filter: brightness(70%); transition: all .5s; }
    &:hover span { opacity: 1; }
    label { position: relative; }
    img { height: 18rem; cursor: pointer; }
    span { position: absolute; left: 50%; bottom: .5rem; transform: translateX(-50%); color: white; text-decoration: underline; cursor: pointer; opacity: 0; }
`