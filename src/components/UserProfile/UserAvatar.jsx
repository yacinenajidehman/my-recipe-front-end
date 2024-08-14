import { IonAvatar, IonImg, IonIcon } from "@ionic/react"
import avatar from "../../pages/assets/images/avatar.png"
import { addOutline } from "ionicons/icons"
import { useState, useEffect, useRef } from "react"
import { usePhotoGallery } from '../../hooks/usePhotoGallery'
import axios from '../../config/axios'
import { UPLOAD_USER_PHOTO } from "../../config/urls"


const UserAvatar = (props) => {

    const [userImg, setUserImg] = useState(props.userImg)

    const takePhotoRef = useRef()

    const { takePhoto, blobUrl } = usePhotoGallery()


    useEffect(() => {
        if (blobUrl) {
            setUserImg(blobUrl);
            uploadPhoto()
        }
    }, [blobUrl])

    const uploadPhoto = async () => {
        const photoData = new FormData();
        try {
            const response = await fetch(blobUrl);
            const blob = await response.blob();
            photoData.append('avatar', blob);
            await axios.put(UPLOAD_USER_PHOTO, photoData, {
                headers: {
                    Authorization: props.jwt
                }
            }).then((res => {
                console.log(res);
            }))
        }    catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="avatar-container">
            <IonAvatar className="avatar" onClick={() => takePhoto()} ref={takePhotoRef}>
                {
                    userImg ?
                        <IonImg src={userImg} alt="user image" className="avatar-image" /> :
                        <IonImg src={avatar} />
                }


            </IonAvatar>
            <IonIcon icon={addOutline} className="user-icon" color="light" onClick={() => {takePhotoRef.current.click()}}/>
        </div>
    )
}

export default UserAvatar;