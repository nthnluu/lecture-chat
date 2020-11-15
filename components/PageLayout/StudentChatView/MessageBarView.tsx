import fb from "../../../util/firebase-config";
import {useContext} from "react";
import SessionContext from "../../../util/SessionContext";

const MessageBarView = ({courseId}) => {
    const {userProfile} = useContext(SessionContext)

    function sendMessage(event) {
        if (courseId) {
            event.persist()
            event.preventDefault()
            const val = event.target.msgarea.value
            if (val.length >= 1) {
                fb.firestore().collection('course').doc(courseId).collection('messages').add({
                    content: event.target.msgarea.value,
                    displayName: userProfile.displayName,
                    imageURL: userProfile.photoURL,
                    sentAt: new Date(),
                    userId: userProfile.uid
                })
                event.target.reset()
            }
        }
    }

    return <form onSubmit={sendMessage} className="flex items-center justify-between w-full py-3 border-t bg-white"
    >
        <div
            style={{borderRadius: "20px 20px 20px 20px"}}
            className="w-full py-1.5 px-3 border shadow-sm w-full mr-2 flex justify-between items-center text-gray-800">
            <input required autoComplete="off" id="msgarea" className=" focus:outline-none w-full resize-none"
                   placeholder="Enter your message here..."/>
            <div className="h-stack space-x-2">
                <button>
                    <svg className="h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                              d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8"/>
                    </svg>
                </button>
            </div>

        </div>
        <button type="submit" className="px-3">
            <svg className="h-6 transform rotate-90 text-gray-600" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
        </button>
    </form>
}

export default MessageBarView