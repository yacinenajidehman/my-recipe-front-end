import { IonAvatar, IonCard, IonCardSubtitle, IonGrid, IonImg, IonRow, IonText } from "@ionic/react"
import avatar from '../../pages/assets/images/avatar.png'
import axios from "../../config/axios";
import { GET_ALL_POSTS } from "../../config/urls";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const GetComment = ({ postId, newComment }) => {

    const [comments, setComments] = useState();
    const { jwt } = useContext(AuthContext)

    useEffect(() => {
        getComments();
    }, [newComment?.id])

    const getComments = async () => {
        try {
            await axios.get(GET_ALL_POSTS + '/' + postId + '/get-comments', {
                headers: {
                    Authorization: jwt
                }
            }).then((res) => {
                setComments(res.data)
            })
        } catch (error) {

        }
    }

    return (
        <IonGrid className="ion-no-margin">
            {
                comments &&
                comments.map((comment) => {
                    return (
                        <IonRow key={comment.id}>
                            <IonAvatar className="comment-avatar">
                                {
                                    comment.User.img_uri ?
                                        <IonImg src={comment.User.img_uri} /> :
                                        <IonImg src={avatar} />
                                }
                            </IonAvatar>
                            <IonCard className="comment-card">
                                <IonCardSubtitle color="warning">
                                    {comment.User.name}
                                </IonCardSubtitle>
                                <IonText className="comment-text">

                                    {comment.text}
                                </IonText>
                            </IonCard>
                        </IonRow>
                    )
                })

            }


        </IonGrid>
    )
}

export default GetComment