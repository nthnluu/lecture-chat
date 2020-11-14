import PageLayout from "../components/PageLayout";
import {useContext, useEffect, useState} from "react";
import fb from "../util/firebase-config";
import SessionContext from "../util/SessionContext";
import MessageView from "../components/PageLayout/StudentChatView/MessageView";
import MessageBarView from "../components/PageLayout/StudentChatView/MessageBarView";
import ReactMarkdown from 'react-markdown'

export default function Home() {
    const [infoArea, toggleInfoArea] = useState(false)
    const [courses, setCourses] = useState({})
    const [currentCourseId, setCurrentCourseId] = useState()
    const currentCourse = courses && (courses[currentCourseId] ?? undefined)
    const [loading, toggleLoading] = useState(true)


    function raiseHand() {
        const audio = new Audio('/raise_hand.m4a');
        audio.play();
    }

    const navbarButtons = [
        {
            type: "extended",
            label: "Raise Hand",
            color: "primary",
            style: "invisible",
            onClick: raiseHand,
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"/>
            </svg>
        }, {
        type: "icon",
        label: "Hello",
        color: "primary",
        style: "light",
        selected: infoArea,
        onClick: () => toggleInfoArea(!infoArea),
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
    }]
    const {userProfile} = useContext(SessionContext)

    function selectCourse(item) {
        const itemId = item.id
        setCurrentCourseId(itemId)

    }

    function fetchCourses() {
        const dbRef = fb.firestore().collection('course')
        dbRef.where("roles.owner", "==", userProfile.uid).get()
            .then(snapshot => {
                let newCoursesObj = {}
                snapshot.docs.forEach((doc, index) => {
                    const data = doc.data()
                    const docId = doc.id
                    newCoursesObj[docId] = {
                        id: doc.id,
                        title: data.title,
                        description: "Lorem ipsum dolor sit anem",
                        infoPanel: data.infoPanel,
                        onClick: item => selectCourse(item),
                        selected: index === 0
                    }
                })
                dbRef.where("roles.students", "array-contains", userProfile.uid).get()
                    .then(snap => {
                        let courseObj = {...newCoursesObj}
                        snap.docs.forEach((doc, index) => {
                            const data = doc.data()
                            const docId = doc.id
                            courseObj[docId] = {
                                id: doc.id,
                                title: data.title,
                                description: "Lorem ipsum dolor sit anem",
                                infoPanel: data.infoPanel,
                                onClick: item => selectCourse(item),
                                selected: index === 0
                            }
                        })
                        setCourses(courseObj)
                        setCurrentCourseId(Object.keys(courseObj)[0])
                        toggleLoading(false)
                    })

            })
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    const sidebarConfig = {
        title: "Chats",
        buttons: [{
            type: "icon",
            label: "Hello",
            color: "mono",
            style: "light",
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
        }],
        sidebarItems: Object.values(courses),
        selectedItem: currentCourseId
    }


    return (
        <PageLayout sidebarConfig={sidebarConfig}
                    title={(!loading  && courses[currentCourseId]) && courses[currentCourseId].title}
                    buttons={navbarButtons} privateRoute={true}
                    redirectPath='/login'
                    loading={loading}
                    mainAreaFooter={!loading && <MessageBarView courseId={currentCourseId}/>}
                    thirdArea={(infoArea && !loading && currentCourse) && <article className="prose">
                        <ReactMarkdown>
                            {currentCourse.infoPanel}
                        </ReactMarkdown>
                    </article>}
        >
            {!loading && <MessageView courseId={currentCourseId}/>}
        </PageLayout>
    )
}
