import { AuthProvider } from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import GlobalStyle from '../styles/globals'
import Head from 'next/head';
import Dashboard from '../components/Dashboard';

export default function MyApp({ Component, pageProps }: any) {

    const LayoutNoAuth = ({ children }: any) => (<>{children}</>);
    const LayoutAuth = ({ children }: any) => (<Dashboard>{children}</Dashboard>);

    const Layout = Component.noAuth ? LayoutNoAuth : LayoutAuth

    return (
        <>
            <Head>
                <title>Curriculo</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&amp;display=swap" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" integrity="sha384-uWxY/CJNBR+1zjPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF" crossOrigin="anonymous" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css" />
                <script async src="https://use.fontawesome.com/ea6d31d4b0.js"></script>
            </Head>
            <AuthProvider>
                <Layout>
                    <Component {...pageProps} />
                    <ToastContainer />
                </Layout>
            </AuthProvider>
            <GlobalStyle />
        </>
    )
}
