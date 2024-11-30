import { IonContent, IonPage, IonAlert, IonGrid, IonRow, IonCol } from "@ionic/react"
import Header from "../components/Header/Header"

import './styles/profile.css'
import { useState } from "react"
import { Loading } from "../components"
import axios from '../config/axios'
import { AuthContext } from "../context/AuthContext"
import { useContext, useEffect } from "react"
import { PROFILE_URL, PROFILE_UPDATE_URL } from "../config/urls"
import UserDetails from "../components/UserProfile/UserDetails"
import UserAvatar from "../components/UserProfile/UserAvatar"

const Profile = () => {

    const [showLoading, setShowLoading] = useState(true);
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [userImg, setUserImg] = useState();
    const [showAlert, setShowAlert] = useState(false);



    const { jwt } = useContext(AuthContext);

    useEffect(() => {
        getProfile();
    }, [])



    const getProfile = async () => {
        setShowLoading(true);
        try {
            await axios.get(PROFILE_URL, {
                headers: {
                    Authorization: jwt
                }
            }).then(res => {
                setName(res.data.name)
                setEmail(res.data.email)
                setUserImg(res.data.img_uri)
            })
        } catch (e) {
            console.log(e.response)
        } finally {
            setShowLoading(false)
        }

    }

    const onSubmit = async () => {
        setShowLoading(true);
        const updateForm = {
            name,
            password,
        }
        try {
            await axios.put(PROFILE_UPDATE_URL, updateForm, {
                headers: {
                    Authorization: jwt
                }
            }).then(async (res) => {
                console.log(res);
            });
        } catch (error) {
            console.log(error)
        } finally {
            setShowLoading(false);
            setShowAlert(false)
        }
    }


    return (
        <IonPage>
            {
                showLoading ?
                    <Loading isOpen={showLoading} /> :
                    <>

                        <IonAlert
                            isOpen={showAlert}
                            header="تنبيه"
                            message="هل تريد بالفعل تعديل البيانات الشخصية؟"
                            onDidDismiss={() => { setShowAlert(false) }}
                            buttons=
                            {[
                                {
                                    text: "موافق",
                                    handler: () => {
                                        onSubmit()
                                    }
                                },
                                {
                                    text: "إلغاء",
                                    role: "cancel"
                                }
                            ]}
                        />
                        <Header headerTitle="الصفحة المسخدم" />
                        <IonContent className="ion-padding">

                            <IonGrid>
                                <IonRow>
                                    <IonCol sizeMd="6" offsetMd="3" sizeLg="4" offsetLg="4">
                                        <UserAvatar userImg={userImg} jwt={jwt} />


                                        <UserDetails
                                            name={name}
                                            email={email}
                                            userName={setName}
                                            password={setPassword}
                                            showAlert={setShowAlert}
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

export default Profile