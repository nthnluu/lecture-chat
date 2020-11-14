import ChatBubble from "../../Misc/ChatBubble";
import {useContext, useEffect, useState} from "react";
import fb from "../../../util/firebase-config";
import SessionContext from "../../../util/SessionContext";
import ScrollContext from "../../../util/ScrollContext";
import LinearProgress from "../../LinearProgress";

const MessageView = ({courseId}) => {
    const [loading, toggleLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const {userProfile} = useContext(SessionContext)
    const scrollToBottom = useContext(ScrollContext)

    useEffect(() => {
        if (courseId) {
            toggleLoading(true)
            fb.firestore().collection('course').doc(courseId).collection('messages')
                .orderBy("sentAt", "desc")
                .limit(35)
                .onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})).reverse())
                    toggleLoading(false)
                    scrollToBottom()
                })
        }
    }, [courseId])


    return courseId ? <div className="h-full" id="container">
        {!loading ? <ul className="w-full space-y-3 pt-6 pb-12 pr-4">
            {messages.map(message => {
                const fromUser = (message.userId === userProfile.uid)
                return <li key={message.id} className={`flex ${fromUser ? "justify-end" : "justify-start"} items-end`}>
                    {!fromUser && <img src={message.imageURL} className="h-8 w-8 cover mr-2 rounded-full" alt=""/>}
                    <ChatBubble content={message.content} style={fromUser ? "filled" : "outline"}/>
                </li>
            })}
            <div id="bottom-message" className="h-12"/>
        </ul> : <LinearProgress hidden={false} thin={true}/>}
    </div> : null
}

export default MessageView