import { IonAvatar, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonImg, IonPage, IonRefresher, IonRefresherContent, IonRow, IonText } from "@ionic/react";
import Header from "../components/Header/Header";
import avatar from "./assets/images/avatar.png";
import "./styles/getAllPosts.css";
import axios from "../config/axios";
import { GET_ALL_POSTS } from "../config/urls";
import { useState, useContext, useEffect } from "react";
import { Loading } from "../components";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import 'moment/dist/locale/ar';



moment.locale('ar');
const GetAllPosts = () => {
    const [showLoading, setShowLoading] = useState(true);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts();
    }, []);

    const { jwt } = useContext(AuthContext);

    const getPosts = async () => {
        setShowLoading(true);
        try {
            await axios.get(GET_ALL_POSTS, {
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

    function doRefresh(e) {
        setTimeout(()=>{
            getPosts();
        }, 1000)
    }

    return (
        <IonPage>
            {showLoading ? <Loading isOpen={showLoading} /> :
                <>
                    <Header headerTitle="وصفاتي" disabledBackButton="true" />
                    <IonContent class="ion-padding"
                    onIonRefresh={doRefresh}>
                        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                            <IonRefresherContent>
                            </IonRefresherContent>
                        </IonRefresher>
                        {posts.length > 0 ?
                            posts.slice().reverse().map((post) => {
                                return (
                                    <IonCard key={post.id} routerLink={`/my-recipe/all-posts/${post.id}`}>
                                        <IonImg src={post.Post_Images[0].img_uri} />
                                        <IonCardContent>
                                            <IonGrid>
                                                <IonRow>
                                                    <IonAvatar className="post-avatar">
                                                        {
                                                            post.User.img_uri ? <IonImg src={post.User.img_uri} />
                                                                : <IonImg src={avatar} />
                                                        }
                                                    </IonAvatar>
                                                    <IonCol>
                                                        <IonText className="post-user">{post.User.name}</IonText>
                                                        <IonText className="post-moment" color="warning">{moment(post.createdAt).fromNow()}</IonText>
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

export default GetAllPosts;
