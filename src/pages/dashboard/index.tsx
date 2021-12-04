import { parseCookies } from 'nookies'

export default function Dashboard() {
    return (
        <div className="bg-warning">
            Dashboard
        </div>    
    )
}

export async function getServerSideProps(ctx: any) {
    const { AKToken } = parseCookies(ctx)

    if (!AKToken) {
        return {
            redirect: { destination: '/sign-in', permanent: false }
        }
    }

    return { props: { } }
}