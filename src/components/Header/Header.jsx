import { IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonBackButton } from "@ionic/react"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Header(props) {
    const { loggedIn } = useContext(AuthContext);

    return (
        <IonHeader>
            <IonToolbar color='primary'>
                <IonTitle>
                    {props.headerTitle}
                </IonTitle>
                <IonButtons slot="end">
                    {
                        loggedIn ? <IonMenuButton /> : <></>
                    }

                </IonButtons>
                <IonButtons slot="start">
                    {loggedIn ? <IonBackButton defaultHref={props.defaultHref} disabled={props.disabledBackButton}></IonBackButton> : <></>}
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}