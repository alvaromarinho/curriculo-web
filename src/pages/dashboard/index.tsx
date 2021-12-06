import { NextPageContext } from 'next'
import { parseCookies } from 'nookies'

export default function Dashboard() {
    return (
        <div className="bg-warning">
            Dashboard
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

    return { props: { } }
}