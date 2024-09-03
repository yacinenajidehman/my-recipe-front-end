import { IonContent, IonPage, IonList, IonItem, IonInput, IonTextarea, IonLabel, IonText, IonIcon, IonButton, IonImg, IonToast, IonAlert } from "@ionic/react"
import Header from "../components/Header/Header"
import { useContext, useEffect, useRef, useState } from "react"
import './styles/createPost.css'
import { image } from "ionicons/icons"
import TextEditor from "../components/TextEditor/TextEditor"
import usePhotoGallery from "../hooks/usePhotoGallery"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import GetLocation from "../components/Location/GetLocation"

import axios from "../config/axios"
import { CREATE_POST } from "../config/urls"

import { AuthContext } from "../context/AuthContext"
import { useHistory } from "react-router"

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    const [region, setRegion] = useState("")
    const [country, setCountry] = useState("")

    const [steps, setSteps] = useState();

    const { takePhoto, blobUrl } = usePhotoGallery();

    const [photos, setPhotos] = useState([]);

    const [imageToast, setImageToast] = useState(false);
    const [titleToast, setTitleToast] = useState(false);
    const [contentsToast, setContentsToast] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const { jwt } = useContext(AuthContext);


    const takePhotoRef = useRef();

    const history = useHistory();



    useEffect(() => {
        if (blobUrl) {
            const imgUrls = [blobUrl, ...photos]
            setPhotos(imgUrls)
        }
    }, [blobUrl])

    const onsubmit = async () => {
        if (validation()) {
            const postData = new FormData()
            try {
                postData.append("title", title);
                postData.append("contents", contents);
                postData.append("country", country);
                postData.append("region", region);
                postData.append("steps", steps);
                console.log(photos)
                for (let i = 0; i < photos.length; i++) {
                    const response = await fetch(photos[i]);
                    const blob = await response.blob();
                    postData.append('postImg', blob);
                }
                await axios.post(CREATE_POST, postData, {
                    headers: {
                        Authorization: jwt
                    }
                }).then((res) => {
                    console.log(res);
                    setPhotos([]);
                    setSteps(null);
                    setContents("");
                    setTitle("");
                    setShowAlert(true)
                })

            } catch (error) {
                console.log(error);
            }
        }
    }

    const validation = () => {
        const checks = [
            { condition: title === "", action: () => setTitleToast(true) },
            { condition: contents === "", action: () => setContentsToast(true) },
            // { condition: !steps, action: () => setStepsToast(true) },
            { condition: photos.length === 0, action: () => setImageToast(true) }
        ];

        for (const check of checks) {
            if (check.condition) {
                check.action();
                return false;
            }
        }
        return true
    }

    return (
        <IonPage>
            <IonAlert isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="عملية النشر تمت بنجاح"
                message="تم نشر المنشور هل ترغب بالانتقال لصفحة المنشورات ؟"
                buttons={[
                    {
                        text: 'نعم',
                        handler: () => {
                            history.push('all-posts')
                        }
                    }
                ]}

            />
            <Header headerTitle='نشر منشور'
                defaultHref="all-posts"
            />
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem >
                        <IonInput
                            name="title"
                            value={title}
                            onIonInput={(e) => setTitle(e.detail.value)}
                            color="warning"
                            label="عنوان المنشور"
                            labelPlacement="floating"
                            placeholder="ادخل عنوان المنشور"
                            className="warning-label"
                        />

                    </IonItem>
                    <IonItem className="ion-margin-bottom">
                        <IonTextarea
                            value={contents}
                            onIonInput={(e) => setContents(e.detail.value)}
                            label="المكونات "
                            labelPlacement="floating"
                            placeholder="أدخل المكونات"
                            class='custom'
                            color="warning"
                            className="warning-label"
                        >
                        </IonTextarea>
                    </IonItem>

                    <IonLabel color="warning">
                        خطوات التحظير
                    </IonLabel>

                    <IonItem className="ion-margin">
                        <TextEditor
                            sendToParent={setSteps}
                        />
                    </IonItem>


                    <IonItem lines="none" >
                        <IonText>
                            اضغظ <span ref={takePhotoRef} onClick={takePhoto} style={{ color: "#20C67B", fontWeight: "bold", textDecoration: "underline" }}>هنا</span> لإضافة صورة
                        </IonText>
                    </IonItem>

                    <IonItem className="ion-margin-bottom" lines="none">
                        {photos.length > 0 ?
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
                                {photos.map((img, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <IonImg src={img}
                                                onClick={() => { takePhotoRef.current.click() }} />
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                            :
                            <div className="icon-container">
                                <IonIcon
                                    icon={image}
                                    color="primary"
                                    className="icon-images"
                                    onClick={() => { takePhotoRef.current.click() }} />
                            </div>
                        }

                    </IonItem>

                    <GetLocation
                        region={setRegion}
                        country={setCountry}
                    />

                    <div>
                        <IonButton
                            expand="block"
                            className="ion-margin"
                            onClick={onsubmit}
                        >
                            نشر
                        </IonButton>
                    </div>

                </IonList>
                <IonToast
                    isOpen={imageToast}
                    onDidDismiss={() => { setImageToast(false) }}
                    message="يجب عليك إدخال صورة على الأقل"
                    duration={1500}
                    color="danger"
                />
                <IonToast
                    isOpen={titleToast}
                    onDidDismiss={() => { setTitleToast(false) }}
                    message="يجب عليك إدخال العنوان"
                    duration={1500}
                    color="danger"
                />
                <IonToast
                    isOpen={contentsToast}
                    onDidDismiss={() => { setContentsToast(false) }}
                    message="يجب عليك إدخال المكونات"
                    duration={1500}
                    color="danger"
                />
            </IonContent>
        </IonPage>
    )
}

export default CreatePost