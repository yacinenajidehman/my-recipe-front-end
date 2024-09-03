import { IonButtons, IonIcon, IonTextarea, IonItem, IonToast } from "@ionic/react";
import { send } from "ionicons/icons";
import { useState, useContext } from "react";
import axios from "../../config/axios";
import { GET_ALL_POSTS } from "../../config/urls";
import { AuthContext } from "../../context/AuthContext";


const CreateComment = ({ postId, newComment }) => {
    const [comment, setComment] = useState('');
    const [showToast, setShowToast] = useState(false);
    const handleCommentChange = (e) => {
        setComment(e.detail.value);
    };

    const { jwt } = useContext(AuthContext)

    const handleCommentSubmit = async () => {
        if (comment.trim()) { // Ensure the comment is not empty
            try {
                // Make a POST request to add the comment
                await axios.post(GET_ALL_POSTS + '/' + postId + '/create-comment', { text: comment }, {
                    headers: {
                        Authorization: jwt
                    }
                });
                // Clear the textarea after submitting
                newComment({
                    text:comment,
                    id:Date.now()
                })
                setComment('');
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
        else {
            setShowToast(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent newline from being added
            handleCommentSubmit(); // Call submit function
        }
    };


    return (
        <IonItem className="ion-margin-bottom">
            <IonTextarea
                className="ion-margin"
                onIonInput={handleCommentChange}
                onKeyDown={handleKeyDown} // Listen for Enter key without Shift
                value={comment}
                placeholder="أكتب تعليقك هنا..."
            />
            <IonButtons onClick={handleCommentSubmit}>
                <IonIcon icon={send} className="send-icon" color="light" />
            </IonButtons>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                duration={1500}
                color="danger"
                message="يجب عليك إدخال تعليق"
            />
        </IonItem>
    );
};

export default CreateComment;
