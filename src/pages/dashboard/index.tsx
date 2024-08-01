import { useContext, useEffect, useState } from "react"
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { FaPlus, FaRegSave, FaRegTrashAlt } from "react-icons/fa";
import { authenticate, getUser, updateUser } from "../../services/UserService";
import { CgSpinner } from "react-icons/cg";
import { User } from "../../models/User";
import { removeHTML } from "../../utils/StringUtils";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../../components/Button";
import styled from "styled-components";

export default function Dashboard() {

    const { signOut } = useContext(AuthContext)

    const [loading, setLoading] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);
    const [currentImage, setCurrentImage] = useState<string>();
    const [file, setFile] = useState()
    const [userForm, setUserForm] = useState<User>({} as User);
    const [currentPassword, setCurrentPassword] = useState<string>('');

    const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

    useEffect(() => loadUser(), [])

    useEffect(() => {
        if (!file) return

        const objectUrl = URL.createObjectURL(file);
        setCurrentImage(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    function loadUser() {
        setLoading(true)
        getUser()
            .then((user: User) => {
                console.log(user.image);
                if (user.image && user.image !== null) {
                    setCurrentImage(user.image)
                }
                setUserForm(user)
            })
            .catch((error) => toast.error(removeHTML(error.response.data) || 'Error'))
            .finally(() => setLoading(false))
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
        setUserForm((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        if ((userForm.password && !currentPassword) || (!userForm.password && currentPassword)) {
            toast.warning('Caso deseje trocar sua senha, preencha todos os campos')
            return
        } else if (userForm.password && currentPassword) {
            try {
                await authenticate({ email: userForm.email!, password: currentPassword })
            } catch (error) {
                toast.error('Senha incorreta')
                return
            }
        }

        setLoadingSave(true)
        updateUser(userForm, file)
            .then(() => {
                toast.success('Dados atualizados com sucesso!')
                if (userForm.password && currentPassword)
                    setTimeout(signOut, 5000);
            })
            .catch((error) => toast.error(removeHTML(error.response.data) || 'Error'))
            .finally(() => setLoadingSave(false))
    }

    // PHONES

    function handleChangePhone(e: any, index: number) {
        const phones = userForm.phones;
        if (phones) phones[index] = { ...phones[index], number: e.target.value }
        setUserForm((prev) => ({ ...prev, phones: phones }))
    }

    function addPhone() {
        const phones = userForm.phones;
        phones?.push({ number: '' })
        setUserForm((prev) => ({ ...prev, phones: phones }))
    }

    function removePhone(id?: number) {
        setUserForm((prev) => ({ ...prev, phones: prev.phones ? prev.phones.filter((phone) => phone.id !== id) : [] }))
    }

    // SOCIAL NETWORKS

    function handleChangeLinks(e: any, index: number) {
        const { name, value } = e.target
        const links = userForm.links;
        if (links) links[index] = { ...links[index], [name]: value }
        setUserForm((prev) => ({ ...prev, links: links }))
    }

    function addLinks() {
        const links = userForm.links;
        links?.push({ name: '', url: '' })
        setUserForm((prev) => ({ ...prev, links: links }))
    }

    function removeLinks(id?: number) {
        setUserForm((prev) => ({
            ...prev,
            links: prev.links ? prev.links.filter((link) => link.id !== id) : []
        }))
    }

    return (
        <div className="card card-body border-0 shadow px-4 mb-3">
            {loading ?
                <div className="text-center py-5">
                    <CgSpinner className="fa-spin me-2 fa-3x" />
                </div>
                :
                <form onSubmit={handleSubmit}>
                    <h2 className="me-3">Perfil</h2>
                    <div className="row mb-4">
                        <EditImage className="col-12 col-md-4 mb-3 mb-md-0">
                            <input className="d-none" id="image" type="file" name="image" onChange={handleChangeFile} />
                            <label htmlFor="image">
                                <img src={currentImage || '/default_user.jpeg'} alt="Profile" />
                                <span>Trocar imagem</span>
                            </label>
                        </EditImage>
                        <div className="col-12 col-md-8">
                            <div className="row">
                                <div className="col-12 col-md-6 mb-3">
                                    <label htmlFor="name">Nome</label>
                                    <input type="text" className="form-control" id="name" name="name" value={userForm.name} onChange={handleChange} required/>
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={userForm.email} readOnly />
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                    <label htmlFor="city">Cidade</label>
                                    <input type="text" className="form-control" id="city" name="city" value={userForm.city} onChange={handleChange} required/>
                                </div>
                                <div className="col-12 col-md-6 mb-3">
                                    <label htmlFor="uf">Estado</label>
                                    <select id="uf" name="uf" className="form-select" defaultValue={userForm.uf} onChange={handleChange} required>
                                        {ufs.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="description">Descrição</label>
                                    <textarea className="form-control" id="description" name="description" rows={8}
                                        defaultValue={userForm.description} onChange={handleChange} required></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PHONE */}
                    <div className="row g-0 align-items-center mb-2">
                        <div className="col-auto">
                            <h2 className="mb-0 me-2">Telefone</h2>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-sm btn-outline-primary d-flex-center border-0" type="button" onClick={addPhone}>
                                <FaPlus className="me-md-2" />
                                <span className="d-none d-md-inline">Adicionar</span>
                            </button>
                        </div>
                    </div>
                    {userForm.phones && userForm.phones.map((phone, index) =>
                        <div className="row align-items-center mb-4" key={index}>
                            <div className="col">
                                <input type="text" className="form-control" id={`phone_${phone.id}`} name={`phone_${phone.id}`}
                                    value={phone.number} onChange={(e) => handleChangePhone(e, index)} required />
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-outline-danger d-flex-center border-0" onClick={() => removePhone(phone.id)}>
                                    <FaRegTrashAlt className="me-md-2" />
                                    <span className="d-none d-md-inline">Remover</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* LINKS */}
                    <div className="row g-0 align-items-center mb-2">
                        <div className="col-auto">
                            <h2 className="mb-0 me-2">Links</h2>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-sm btn-outline-primary d-flex-center border-0" type="button" onClick={addLinks}>
                                <FaPlus className="me-md-2" /> 
                                <span className="d-none d-md-inline">Adicionar</span>
                            </button>
                        </div>
                    </div>
                    {userForm.links && userForm.links.map((link, index) =>
                        <div className="row align-items-end mb-2" key={index}>
                            <div className="col-12 col-md mb-3">
                                <label htmlFor={`link_name_${link.id}`}>Name</label>
                                <input type="text" className="form-control" id={`link_name_${link.id}`} name="name"
                                    value={link.name} onChange={(e) => handleChangeLinks(e, index)} required />
                            </div>
                            <div className="col-12 col-md mb-3">
                                <label htmlFor={`link_url_${link.id}`}>Url</label>
                                <input type="text" className="form-control" id={`link_url_${link.id}`} name="url"
                                    value={link.url} onChange={(e) => handleChangeLinks(e, index)} required />
                            </div>
                            <div className="col-12 col-md-auto mb-3">
                                <button className="btn btn-outline-danger d-flex-center border-0 w-100" onClick={() => removeLinks(link.id)}>
                                    <FaRegTrashAlt className="me-2" /> Remover
                                </button>
                            </div>
                            <div className="d-md-none border-bottom mb-3"></div>
                        </div>
                    )}

                    {/* PASSWORD */}
                    <h2 className="mb-2 me-2">Trocar Senha</h2>
                    <div className="row">
                        <div className="col-12 col-md-6 mb-3">
                            <label htmlFor="currentPassword">Senha atual</label>
                            <input type="password" className="form-control" id="currentPassword" name="currentPassword"
                                onChange={(e) => setCurrentPassword(e.target.value)} />
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                            <label htmlFor="password">Nova senha</label>
                            <input type="password" className="form-control" id="password" name="password"
                                value={userForm.password} onChange={handleChange} />
                        </div>
                    </div>

                    <hr className="text-muted" />
                    <div className="row justify-content-end">
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

    &:hover span { opacity: 1; }
    label { position: relative; }
    img { height: 24rem; width: 100%; object-fit: cover; cursor: pointer; }
    span { 
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
        color: white;
        text-decoration: underline;
        cursor: pointer;
        opacity: 0;
        background-color: rgba(0,0,0,.5);
        padding: 0.5rem 0;
        transition: all .5s ease;
    }
`

export async function getServerSideProps(ctx: NextPageContext) {
    const { akToken } = parseCookies(ctx)

    if (!akToken) {
        return {
            redirect: { destination: '/sign-in', permanent: false }
        }
    }

    return { props: {} }
}