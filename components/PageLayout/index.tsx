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
    buttons: ReactElement;
}

const RedirectTo = ({href}) => {
    const router = useRouter()

    useEffect(() => {
        router.push(href)
    }, [])

    return <></>
}

const PageLayout: React.FC<Props> = ({
                                         children,
                                         privateRoute,
                                         title,
                                         redirectPath,
                                         buttons
                                     }) => {
    const router = useRouter()
    const {isAuthenticated, userProfile} = useContext(SessionContext)
    const [sidebarOpen, toggleSidebar] = useState(false)
    if (privateRoute && !isAuthenticated) return <RedirectTo href={redirectPath}/>
    function signOut() {
        fb.auth().signOut()
            .then(() => router.push('/'))
    }
    return <div>
        <Head>
            <title>
                {`${title} | Lecture Chat`}
            </title>
        </Head>
        <LinearProgress hidden={true}/>
        <div className="flex h-screen">
            <div>
                <div className="hidden lg:flex h-full">
                    <Sidebar isOpen={true} mobile={false}/>
                </div>
                <div className="block lg:hidden h-full">
                    <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} mobile={true}/>
                </div>
            </div>
            <div className="overflow-auto w-full default-padding">
                <div className="w-auto">
                    <Navbar onOpenSidebar={() => toggleSidebar(true)} buttons={buttons}/>
                </div>
                <div className="overflow-auto h-full">
                    {children}
                </div>
            </div>
        </div>
    </div>


}

export default PageLayout