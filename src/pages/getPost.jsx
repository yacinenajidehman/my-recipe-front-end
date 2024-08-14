import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle } from "@ionic/react"
import { useParams } from "react-router";
import Header from "../components/Header/Header";


const GetPost = () => {
    const { id } = useParams();
    const title = `المنشور رقم ${id}`
    return (
        <IonPage>
            <Header headerTitle={title} />
            <IonContent>

            </IonContent>
        </IonPage>
    )
}

export default GetPost