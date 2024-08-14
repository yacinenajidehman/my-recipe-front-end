import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle } from "@ionic/react"
import { useParams } from 'react-router-dom';
import Header from "../components/Header/Header";

const UpdatePost = () => {
    const {id} = useParams()
    const headerTitle = `التعديل  على الوصفة ${id}`
    return (
        <IonPage>
            <Header headerTitle={headerTitle}/>
            <IonContent>
                
            </IonContent>
        </IonPage>
    )
}

export default UpdatePost;