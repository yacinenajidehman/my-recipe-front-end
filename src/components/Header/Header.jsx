import { IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonBackButton } from "@ionic/react"


export default function Header(props) {
    return (
        <IonHeader>
            <IonToolbar color='primary'>
                <IonTitle>
                    {props.headerTitle}
                </IonTitle>
                <IonButtons slot="end">
                    <IonMenuButton />
                </IonButtons>
                <IonButtons slot="start">
                    <IonBackButton defaultHref={props.defaultHref}  disabled={props.disabledBackButton}></IonBackButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}