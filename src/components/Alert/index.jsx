import { IonAlert } from "@ionic/react"

const  Alert = (props) => {
    return(
        <IonAlert
            isOpen={props.isOpen}
            // {showErrorAlert}
            header= {props.header}
            // "تنبيه!"
            subHeader={props.subHeader}
            // "هذا البريد الإلكتروني مستخدم"
            message={props.message}
            // "هذا البريد الإلكتروني مستخدم بالفعل فهل ترغب بتسجيل الدخول؟"
            buttons={props.buttons}

            onDidDismiss={props.onDidDismiss}
            // {[
            //     {
            //         text: "موافق",
            //         handler: () => {
            //             history.push('/account/login')
            //         }
            //     },
            //     {
            //         text: "إلغاء",
            //         role: "cancel"
            //     }
            // ]}
            />
    )
}

export default Alert