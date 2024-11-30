import { IonAvatar, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonImg, IonPage, IonRefresher, IonRefresherContent, IonRow, IonText } from "@ionic/react";
import Header from "../components/Header/Header";
import avatar from "./assets/images/avatar.png";
// import "./styles/getAllPosts.css";
// import styles from  "./styles/getAllPosts.css";
import axios from "../config/axios";
import { GET_ALL_POSTS } from "../config/urls";
import { useState, useContext, useEffect } from "react";
import { Loading } from "../components";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import 'moment/dist/locale/ar';

moment.locale('ar');

const GetAllPosts = () => {
    const [showLoading, setShowLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        getPosts();
    }, []);

    document.addEventListener('ionBackButton', (ev) => {
        ev.detail.register(10, () => {
            if (ionRouter.routeInfo.lastPathname === '/account/login') {
                setShowAlert(true);
            } else {
                // Additional logic (if needed) when not on the login page
            }
        });
    });

    const { jwt } = useContext(AuthContext);

    const getPosts = async () => {
        setShowLoading(true);
        try {
            const res = await axios.get(GET_ALL_POSTS, {
                headers: {
                    Authorization: jwt
                }
            });
            setPosts(res.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setShowLoading(false);
        }
    };

    function doRefresh(e) {
        setTimeout(() => {
            getPosts();
        }, 1000);
    }

    return (
        <IonPage>
            {showLoading ? (
                <Loading isOpen={showLoading} />
            ) : (
                <>
                    <Header headerTitle="وصفاتي" disabledBackButton="true" />
                    <IonContent className="ion-padding" onIonRefresh={doRefresh}>
                        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                            <IonRefresherContent></IonRefresherContent>
                        </IonRefresher>
                        {posts.length > 0 ? (
                            <IonGrid>
                                <IonRow>
                                    {/* Use responsive columns */}
                                    {posts.slice().reverse().map((post) => (
                                        <IonCol key={post.id} size="12" sizeMd="6" sizeLg="3" sizeXl="2">
                                            <IonCard routerLink={`/my-recipe/all-posts/${post.id}`}>
                                                <IonImg src={post.Post_Images[0].img_uri} className="post-image" />
                                                <IonCardContent>
                                                    <IonGrid>
                                                        <IonRow>
                                                            <IonAvatar className="post-avatar">
                                                                {post.User.img_uri ? (
                                                                    <IonImg src={post.User.img_uri}
                                                                    />
                                                                ) : (
                                                                    <IonImg src={avatar} />
                                                                )}
                                                            </IonAvatar>
                                                            <IonCol>
                                                                <IonText className="post-user">{post.User.name}</IonText>
                                                                <IonText className="post-moment" color="warning">
                                                                    {moment(post.createdAt).fromNow()}
                                                                </IonText>
                                                            </IonCol>
                                                        </IonRow>
                                                        <IonCardTitle className="post-title" color="primary">
                                                            {post.title}
                                                        </IonCardTitle>
                                                        <IonCardSubtitle className="post-contents">
                                                            {post.contents}
                                                        </IonCardSubtitle>
                                                    </IonGrid>
                                                </IonCardContent>
                                            </IonCard>
                                        </IonCol>
                                    ))}
                                </IonRow>
                            </IonGrid>
                        ) : (
                            <IonCol sizeMd="6" offsetMd="3">
                                <IonCard className="ion-padding ion-text-center">
                                    <IonCardTitle color="primary">لا توجد منشورات لعرضها</IonCardTitle>
                                </IonCard>
                            </IonCol>
                        )}
                    </IonContent>
                </>
            )}
        </IonPage>
    );
};

export default GetAllPosts;
