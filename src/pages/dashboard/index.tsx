import { NextPageContext } from 'next'
import { parseCookies } from 'nookies'
import EditUser from '../../components/pages/dashboard/EditUser'

export default function Dashboard() {
    return (
        <div className="bg-light">
            <EditUser />
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