import TextInput from "../forms/TextInput";
import Modal from "./Modal";
import React, {useContext, useState} from "react";
import fb from "../../util/firebase-config";
import SessionContext from "../../util/SessionContext";
import ModalContext from "../../util/ModalContext";

const CreateCourseModal = ({isOpen, onClose}) => {

    const {userProfile} = useContext(SessionContext)
    const [newTitle, setNewTitle] = useState("")
    const {toggleCreateModal} = useContext(ModalContext)
    const [loading, toggleLoading] = useState(false)

    function closeModal() {
        toggleCreateModal(false)
        setNewTitle("")
        toggleLoading(false)

    }

    function createCourse() {
        toggleLoading(true)
        fb.firestore().collection('course').add({
            title: newTitle,
            createdAt: new Date(),
            roles: {
                owner: userProfile.uid
            }
        })
            .then(() => closeModal())
            .catch(() => toggleLoading(false))
    }

    return <Modal isOpen={isOpen}
                  onClose={onClose}
                  title="Create new course"
                  buttons={[{label: "Create", onClick: createCourse, disabled: ((newTitle.length < 1) || loading)}]}
                  content={<>
                      <TextInput value={newTitle} onChange={event => setNewTitle(event.target.value)} placeholder="New course title"/>
                  </>}/>
}

export default CreateCourseModal