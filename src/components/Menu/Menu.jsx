import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar, IonMenuToggle, IonAvatar, IonImg, IonText } from "@ionic/react"
import { personCircleOutline, clipboardOutline, logOutOutline } from "ionicons/icons"
import { PROFILE_URL } from "../../config/urls"
import avatar from "../../pages/assets/images/avatar.png"

import { AuthContext } from "../../context/AuthContext"

import { useState, useEffect, useContext } from "react"

import axios from "../../config/axios"

import Loading from "../../components/Loading"

import { Preferences } from '@capacitor/preferences';
import { useHistory } from "react-router"


const Menu = () => {
    const [userImg, setUserImg] = useState();
    const [name, setName] = useState();
    const [showLoading, setShowLoading] = useState(false);
    
    const history = useHistory()

    const { jwt, setLoggedIn } = useContext(AuthContext);

    const logOut = async () => {
        await Preferences.remove({ key: 'accessToken' });
        setLoggedIn(false);
        history.push('/account/login');
    };


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
                setUserImg(res.data.img_uri)
            })
        } catch (e) {
            console.log(e.response)
        } finally {
            setShowLoading(false)
        }

    }

    return (
        <IonMenu side="end" contentId="menu">
            <Loading isOpen={showLoading} />
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        قائمة
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonAvatar className="avatar" >
                    {
                        userImg ?
                            <IonImg src={userImg} alt="user image" className="avatar-image" /> :
                            <IonImg src={avatar} />
                    }


                </IonAvatar>
                <div className="ion-text-center ion-margin-top">
                    <IonText color="warning">
                        <h3>
                            {name}
                        </h3>
                    </IonText>
                </div>
                <IonList>
                    <IonMenuToggle>
                        <IonItem routerLink="/my-recipe/account/profile">
                            <IonIcon icon={personCircleOutline}
                                color="primary" />
                            <IonLabel className="ion-margin">
                                الصفحة الشخصية
                            </IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                    <IonMenuToggle>
                        <IonItem routerLink="/my-recipe/all-posts">
                            <IonIcon icon={clipboardOutline}
                                color="primary" />
                            <IonLabel className="ion-margin">
                                منشوراتي
                            </IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                    <IonMenuToggle>
                        <IonItem onClick={() => logOut()}>
                            <IonIcon icon={logOutOutline}
                                color="primary" />
                            <IonLabel className="ion-margin">
                                تسجيل الخروج
                            </IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default Menu;