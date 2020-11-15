import React, {ReactElement, useContext, useEffect, useState} from "react";
import SessionContext from "../../util/SessionContext";
import {useRouter} from "next/router";
import fb from "../../util/firebase-config";
import Head from "next/head";
import Sidebar from "./Sidebar";
import LinearProgress from "../LinearProgress";
import Navbar from "./Navbar";
import ScrollContext from "../../util/ScrollContext";
import TextInput from "../forms/TextInput";
import Modal from "../Modals/Modal";
import ModalContext from "../../util/ModalContext";
import CreateCourseModal from "../Modals/CreateCourseModal";

interface Props {
    children: ReactElement;
    privateRoute?: boolean;
    redirectPath?: string;
    content?: any
    title: string;
    buttons?: ReactElement;
    sidebarConfig?: any;
    thirdArea?: ReactElement
    mainAreaFooter?: ReactElement
    loading?: Boolean
}

const RedirectTo = ({href}) => {
    const router = useRouter()

    useEffect(() => {
        router.push(href)
    }, [])

    return <></>
}

const PageLayout: React.FC<Props> = ({
                                         sidebarConfig,
                                         children,
                                         privateRoute,
                                         title,
                                         redirectPath,
                                         buttons,
                                         thirdArea,
                                         mainAreaFooter,
                                         loading
                                     }) => {
    const router = useRouter()
    const {isAuthenticated, userProfile} = useContext(SessionContext)
    const [sidebarOpen, toggleSidebar] = useState(false)
    const [createModal, toggleCreateModal] = useState(false)

    function scrollToBottom() {
        const objDiv = document.getElementById("main-container");
        objDiv && (objDiv.scrollTop = objDiv.scrollHeight)
    }

    useEffect(() => {
        scrollToBottom()
    }, [])
    if (privateRoute && !isAuthenticated) return <RedirectTo href={redirectPath}/>

    function signOut() {
        fb.auth().signOut()
            .then(() => router.push('/'))
    }

    function adaptViewport() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    useEffect(() => {
        adaptViewport()
        window.addEventListener('resize', adaptViewport);
    }, [])



    return <>
        <Head>
            <title>
                {`${title} | Lecture Chat`}
            </title>
        </Head>
        <LinearProgress hidden={!loading}/>
        <ModalContext.Provider value={{toggleCreateModal}}>
            <ScrollContext.Provider value={scrollToBottom}>
                <CreateCourseModal isOpen={createModal} onClose={() => toggleCreateModal(false)}/>
                <div className="flex full-height">
                    <div className="h-full">
                        <div className="hidden lg:flex h-full">
                            <Sidebar loading={loading} config={sidebarConfig} isOpen={true} mobile={false}/>
                        </div>
                        <div className="block lg:hidden h-full">
                            <Sidebar loading={loading} config={sidebarConfig} isOpen={sidebarOpen}
                                     onClose={toggleSidebar}
                                     mobile={true}/>
                        </div>
                    </div>
                    <div className="w-full default-padding h-full relative">
                        <div className="right-0 z-40 absolute w-full">
                            <Navbar title={title} onOpenSidebar={() => toggleSidebar(true)} buttons={buttons}/>
                        </div>
                        <div className="h-full flex justify-between pt-16">
                            <div className="relative h-full w-full">
                                <div className="overflow-auto h-full w-full" id="main-container">
                                    {children}
                                </div>
                                {mainAreaFooter && <div className="absolute bottom-0 w-full bg-white">
                                    {mainAreaFooter}
                                </div>}

                            </div>
                            {thirdArea && <>
                                <div className="overflow-auto h-full w-full md:w-1/2 p-4 ml-1 md:border-l
                        absolute md:relative right-0 bg-white shadow-2xl md:shadow-none">
                                    {thirdArea}
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
            </ScrollContext.Provider>
        </ModalContext.Provider>

    </>


}

export default PageLayout