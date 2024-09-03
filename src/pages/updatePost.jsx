import { IonContent, IonPage, IonItem, IonButton, IonTextarea, IonList, IonInput, IonLabel, IonAlert, IonToast } from "@ionic/react"
import { useParams } from 'react-router-dom';
import Header from "../components/Header/Header";
import TextEditor from "../components/TextEditor/TextEditor";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { EditorState, convertFromRaw } from 'draft-js'
import { Loading } from "../components";
import axios from '../config/axios'
import { GET_MY_POSTS } from "../config/urls";


const UpdatePost = () => {
    const { id } = useParams()
    const headerTitle = `تعديل المنشور${id}`;
    const [showLoading, setShowLoading] = useState(false)
    const [title, setTitle] = useState()
    const [contents, setContents] = useState()
    const [editor, setEditor] = useState()
    const [steps, setSteps] = useState()
    const [showAlert, setShowAlert] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const { jwt } = useContext(AuthContext);

    useEffect(() => {
        getPost()
    }, [])

    const validator = () => {
        if (title && contents && steps) {
            setShowAlert(true);
        } else {
            setShowToast(true)
        }
    }

    const getPost = async () => {
        setShowLoading(true)
        try {
            await axios.get(GET_MY_POSTS + '/' + id, {
                headers: {
                    Authorization: jwt
                }
            }).then(res => {
                console.log(res);
                setTitle(res.data.title)
                setContents(res.data.contents)
                const contentState = convertFromRaw(JSON.parse(res.data.steps));
                const editorState = EditorState.createWithContent(contentState);
                setEditor(editorState);
            })
        } catch (e) {
            console.log(e);
        } finally {
            setShowLoading(false)
        }
    }

    const onSubmit = async () => {
        const postForm = {
            'title': title,
            'contents': contents,
            'steps': steps
        }
        try {
            await axios.put(GET_MY_POSTS + '/' + id + '/update', postForm, {
                headers: {
                    Authorization: jwt
                }
            }).then(res => {
                console.log(res);
            })
        } catch (e) {
            console.log(e.response);
        }
    }

    return (
        <IonPage>

            {showLoading
                ?
                <Loading isOpen={showLoading} /> :
                editor &&
                <>

                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => { setShowAlert(false) }}
                        header={"تنبيه!"}
                        subHeader={'تعديل البيانات'}
                        message={'أنت على وشك تعديل المنشور، هل تريد بالفعل تعديل المنشور'}
                        buttons={[
                            {
                                text: "نعم",
                                handler: () => { onSubmit() }
                            },
                            {
                                text: "إلغاء",
                                role: "cancel"
                            }
                        ]}
                    />

                    <Header headerTitle={headerTitle} />
                    <IonContent className="ion-padding">
                        <IonList>
                            <IonItem >
                                <IonInput
                                    name="title"
                                    value={title}
                                    onIonInput={(e) => setTitle(e.detail.value)}
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
                                    className="warning-label"
                                >
                                </IonTextarea>
                            </IonItem>
                            <IonLabel className="ion-margin">خطوات التحظير</IonLabel>
                            <IonItem lines="none" className="ion-margin-top">
                                <TextEditor editorState={editor} sendToParent={setSteps} />
                            </IonItem>
                            <div className="btn">
                                <IonButton
                                    onClick={validator}
                                    expand="block">
                                    تعديل المنشور
                                </IonButton>
                            </div>
                        </IonList>

                        <IonToast
                            isOpen={showToast}
                            onDidDismiss={() => { setShowToast(false) }}
                            message="يجب عليك إدخال جميع الحقول"
                            duration={1500}
                            color="danger"
                        />

                    </IonContent>
                </>

            }


        </IonPage>
    )
}

export default UpdatePost;