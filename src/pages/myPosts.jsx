import { IonAlert, IonButtons, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonContent, IonGrid, IonIcon, IonImg, IonPage, IonRow, useIonActionSheet } from "@ionic/react";
import Header from "../components/Header/Header";
import "./styles/getAllPosts.css"
import axios from "../config/axios";
import { DELETE_POST, GET_MY_POSTS } from "../config/urls";
import { useState, useContext, useEffect } from "react";
import { Loading } from "../components";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import 'moment/dist/locale/ar';
import { ellipsisVertical } from "ionicons/icons";
import "./styles/getMyPosts.css"
import { useHistory } from "react-router";
moment.locale('ar');


const MyPosts = () => {
    const [showLoading, setShowLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const [present, dismiss] = useIonActionSheet();
    const [showAlert, setShowAlert] = useState(false);

    const [postId, setPostId] = useState()
    const history = useHistory();

    useEffect(() => {
        getPosts();
    }, []);

    const { jwt } = useContext(AuthContext);

    const getPosts = async () => {
        setShowLoading(true);
        try {
            await axios.get(GET_MY_POSTS, {
                headers: {
                    Authorization: jwt
                }
            }).then((res) => {
                setPosts(res.data);
            });
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setShowLoading(false);
        }
    };

    const deletePost = async () => {
        setShowLoading(true)
        try {
            await axios.delete(DELETE_POST, {
                data: {
                    'postId': postId
                },
                headers: {
                    Authorization: jwt
                }
            }).then(res => {
                setShowLoading(false)
                getPosts()
            })
        } catch (e) {
            console.log(e.response);
            setShowLoading(false)
        }
    }

    return (
        <IonPage>
            {showLoading ? <Loading isOpent={showLoading} /> :
                <>
                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => setShowAlert(false)}
                        header={'تنبيه'}
                        message={'هل تود بالفعل حذف المنشور'}
                        buttons={
                            [
                                {
                                    text: "نعم",
                                    handler: () => {
                                        deletePost()
                                        setShowAlert(false)
                                    }
                                },
                                {
                                    text: "إلغاء",
                                    role: "cancel",
                                }
                            ]
                        }
                    />
                    <Header headerTitle="منشوراتي" />
                    <IonContent class="ion-padding">
                        {posts.length > 0 ?
                            posts.slice().reverse().map((post) => {
                                return (
                                    <IonCard key={post.id}>
                                        <IonImg src={post.Post_Images[0].img_uri} />
                                        <IonCardContent>
                                            <IonGrid>
                                                <IonRow className="ion-justify-content-between">
                                                    <IonCardTitle className="post-title" color="primary">
                                                        {post.title}
                                                    </IonCardTitle>

                                                    <IonButtons
                                                        onClick={() => {
                                                            present([
                                                                {
                                                                    text: "تعديل المنشور",
                                                                    handler: () => {
                                                                        history.push(`/my-recipe/my-posts/${post.id}`)
                                                                    }
                                                                },
                                                                {
                                                                    text: "الانتقال للمنشور",
                                                                    handler: () => {
                                                                        history.push(`/my-recipe/all-posts/${post.id}`)
                                                                    }
                                                                },
                                                                {
                                                                    text: "حذف المنشور",
                                                                    handler: () => {
                                                                        setPostId(post.id)
                                                                        setShowAlert(true)
                                                                    }
                                                                },
                                                                {
                                                                    text: "إلغاء",
                                                                    role: "cancel"
                                                                }
                                                            ], "تفاصيل المنشور")
                                                        }}
                                                    >
                                                        <IonIcon icon={ellipsisVertical} className="post-icon" />
                                                    </IonButtons>

                                                </IonRow>

                                                <IonCardSubtitle className="post-contents">
                                                    {post.contents}
                                                </IonCardSubtitle>
                                            </IonGrid>
                                        </IonCardContent>
                                    </IonCard>
                                )
                            })
                            :
                            <IonCard className="ion-padding ion-text-center">
                                <IonCardTitle color="primary">
                                    لا توجد منشورات لعرضها
                                </IonCardTitle>
                            </IonCard>
                        }
                    </IonContent>
                </>
            }
        </IonPage>
    )
}

export default MyPosts;
