import { IonButtons, IonCol, IonIcon } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";

import axios from "../../config/axios";
import { GET_ALL_POSTS } from "../../config/urls";
import { useEffect, useState } from "react";

const Like = ({ postId, jwt, sendToParent }) => {

    const [likeCount, setLikeCount] = useState();
    const [userLiked, setUserLiked] = useState();
    const [refreahLike, setRefreahLike] = useState();

    useEffect(() => {
        getLikes();
        sendLikeCount();
    }, [likeCount, refreahLike])

    const getLikes = async () => {
        try {
            axios.get(GET_ALL_POSTS + '/' + postId + '/like-count', {
                headers: {
                    Authorization: jwt
                }
            }).then((res) => {
                setLikeCount(res.data.likes);
                setUserLiked(res.data.userLiked);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const like = async () => {
        try {
            await axios.put(GET_ALL_POSTS + '/' + postId + '/like', {}, {
                headers: {
                    Authorization: jwt
                }
            }).then((res) => {
                setRefreahLike(res.data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const sendLikeCount = () => {
        sendToParent(likeCount);
    }

    return (
        <IonCol size="2">
            <IonButtons onClick={() => {
                like();
            }}>
                {userLiked ?
                    <IonIcon icon={heart} color="danger"
                        className="post-icon"
                    /> :
                    <IonIcon icon={heartOutline} color="primary" className="post-icon" />
                }
            </IonButtons>
        </IonCol>
    )
}

export default Like; 