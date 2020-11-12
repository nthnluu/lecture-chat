import {ReactElement, useContext, useEffect, useState} from "react";
import SessionContext from "../../util/SessionContext";
import {useRouter} from "next/router";
import fb from "../../util/firebase-config";
import Head from "next/head";
import Sidebar from "./Sidebar";
import LinearProgress from "../LinearProgress";
import Navbar from "./Navbar";

interface Props {
    children: ReactElement;
    privateRoute?: boolean;
    redirectPath?: string;
    content?: any
    title: string;
}

const RedirectHome = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/')
    }, [])

    return <></>
}

const PageLayout: React.FC<Props> = ({children, privateRoute, title, redirectPath}) => {

    const router = useRouter()
    const {isAuthenticated, userProfile} = useContext(SessionContext)
    const [sidebarOpen, toggleSidebar] = useState(true)

    if (privateRoute && !isAuthenticated) return <RedirectHome/>


    function signOut() {
        fb.auth().signOut()
            .then(() => router.push('/'))
    }


    return <div>
        <Head>
            <title>
                {title}
            </title>
        </Head>
        <LinearProgress hidden={true}/>
        <div className="flex h-screen">
            <div>
                <div className="hidden md:flex h-full">
                    <Sidebar isOpen={true} mobile={false}/>
                </div>
                <div className="block md:hidden h-full">
                    <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} mobile={true}/>
                </div>
            </div>
            <div className="overflow-auto w-full p-2.5">
                <Navbar/>
                {children}
            </div>
        </div>
    </div>


}

export default PageLayout