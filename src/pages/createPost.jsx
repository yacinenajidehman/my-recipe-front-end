import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle } from "@ionic/react"
import Header from "../components/Header/Header"


const CreatePost = () => {
    return (
        <IonPage>
            <Header headerTitle='نشر منشور'
            defaultHref="all-posts"
            />
            <IonContent>

            </IonContent>
        </IonPage>
    )
}

export default CreatePost