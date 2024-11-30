import { IonAvatar, IonCard, IonCardSubtitle, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonItemDivider, IonList, IonListHeader, IonPage, IonRow, IonText, IonAlert } from "@ionic/react"
import { useParams } from "react-router";
import Header from "../components/Header/Header";
import noImage from './assets/images/no_image.png';
import avatar from './assets/images/avatar.png'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { chatboxEllipsesOutline, text } from "ionicons/icons";

import './styles/getPost.css';

import axios from '../config/axios';

import { GET_ALL_POSTS } from "../config/urls";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import { Loading } from "../components";

import GetComment from "../components/Comment/getComment";

import CreateComment from "../components/Comment/CreateComment";

import moment from "moment";
import 'moment/dist/locale/ar';
import Like from "../components/Like/Like";
moment.locale('ar');

import { Editor, EditorState, convertFromRaw } from "draft-js"





const GetPost = () => {
    const { id } = useParams();
    const postId = id;
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const { jwt } = useContext(AuthContext);
    const [likeCount, setLikeCount] = useState()
    const [newComment, setNewComment] = useState(null);
    const [steps, setSteps] = useState()

    useEffect(() => {
        getPost();
    }, [])


    const getPost = async () => {
        setLoading(true);
        try {
            await axios.get(`${GET_ALL_POSTS}/${postId}`, {
                headers: {
                    Authorization: jwt
                }
            }).then((res) => {
                setPost(res.data);
                const contentState = convertFromRaw(JSON.parse(res.data.steps));
                const editorState = EditorState.createWithContent(contentState);
                setSteps(editorState)
            })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getContent = () => {
        return document.querySelector("#content")
    }

    const scrollToButtom = () => {
        getContent().scrollToBottom(500)
    }


    // showAlert = () => {

    // }

    return (
        <IonPage>
            {loading ? <Loading isOpen={true} /> :
                <>

                    <Header headerTitle={post.title} />
                    <IonContent scrollEvents={true}
                        id="content"
                    >
                        <IonGrid>
                            <IonRow>
                                <IonCol sizeMd="7" offsetMd="1" sizeLg="7" offsetLg="1">
                                    <Swiper

                                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                                        navigation
                                        pagination={{ clickable: true }}
                                        className="image-holder-size"
                                        autoplay={{
                                            delay: 3000,
                                            disableOnInteraction: false,
                                        }}
                                    >
                                        {post.Post_Images.map((img) => {
                                            return <SwiperSlide key={img.id}>
                                                <IonImg src={img.img_uri} className="image-size" />
                                            </SwiperSlide>
                                        })}
                                    </Swiper>
                                    <IonGrid>
                                        <IonRow>

                                            <Like postId={postId}
                                                jwt={jwt}
                                                sendToParent={setLikeCount}
                                            />

                                            <IonCol size="6">
                                                <IonIcon icon={chatboxEllipsesOutline} color="primary" className="post-icon"
                                                    onClick={() => {
                                                        scrollToButtom()
                                                    }}
                                                />
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCardSubtitle className="post-like">{likeCount} إعجاب</IonCardSubtitle>
                                        </IonRow>
                                    </IonGrid>
                                    <IonCard className="ion-no-margin ion-margin-bottom">
                                        <IonGrid>
                                            <IonRow className="ion-margin-top">
                                                <IonAvatar>
                                                    {post.User.img_uri ?
                                                        <IonImg src={post.User.img_uri} /> :
                                                        <IonImg src={avatar} />
                                                    }
                                                </IonAvatar>
                                                <IonCol>
                                                    <IonCardSubtitle className="post-username">
                                                        {post.User.name}
                                                    </IonCardSubtitle>
                                                    <IonCardSubtitle className="post-time" color="warning">
                                                        {moment(post.createdAt).fromNow()}
                                                    </IonCardSubtitle>
                                                </IonCol>
                                                <IonCol className="ion-text-center">
                                                    <IonCardSubtitle>
                                                        {post.country}
                                                    </IonCardSubtitle>
                                                    <IonCardSubtitle>
                                                        {post.region}
                                                    </IonCardSubtitle>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                        <IonList>
                                            <IonListHeader>
                                                <IonText color='primary'>
                                                    <h3>المكونات</h3>
                                                </IonText>
                                            </IonListHeader>
                                            <IonItem lines="none">
                                                <IonText>
                                                    <p>
                                                        {post.contents}
                                                    </p>
                                                </IonText>
                                            </IonItem>
                                        </IonList>
                                        <IonList>
                                            <IonListHeader>
                                                <IonText color='primary'>
                                                    <h3>خطوات التجظير</h3>
                                                </IonText>
                                            </IonListHeader>
                                            <IonItem lines="none">
                                                <IonText>
                                                    <Editor editorState={steps} readOnly={true} />
                                                </IonText>
                                            </IonItem>
                                        </IonList>
                                    </IonCard>
                                    <IonItemDivider color="light">
                                        <IonText color="primary">
                                            <h3 className="ion-no-margin">
                                                التعليقات
                                            </h3>
                                        </IonText>
                                    </IonItemDivider>
                                    <GetComment postId={postId}
                                        newComment={newComment}
                                    />
                                    <IonItemDivider color="light">
                                        <IonText color="primary">
                                            <h3>
                                                اكتب تعليقا
                                            </h3>
                                        </IonText>
                                    </IonItemDivider>
                                    <CreateComment
                                        postId={postId}
                                        newComment={setNewComment}
                                    />

                                </IonCol>
                            </IonRow>
                        </IonGrid>

                    </IonContent>
                </>
            }
        </IonPage>
    )
}

export default GetPost