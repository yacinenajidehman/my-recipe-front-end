import { IonList, IonItem, IonInput, IonButton, IonToast } from '@ionic/react';
import { useEffect, useState } from 'react';



const UserDetails = (props) => {

    const [name, setName] = useState(props.name)
    const [password, setPassword] = useState()
    const [disabled, setDisabled] = useState(true)
    const [showToast, setShowToast] = useState(false);
    const [showPassToast, setShowPassToast] = useState(false);

    const handleClick = () => {
        if (name && password) {
            if (password.length < 5) {
                setShowPassToast(true)
            } else {
                props.userName(name)
                props.password(password)
                props.showAlert(true)
            }
        } else {
            setShowToast(true)
        }
    }

    return (
        <IonList>
            <IonItem>
                <IonInput
                    name="name"
                    value={name}
                    onIonInput={(event) => {
                        setName(event.detail.value);
                    }}
                    class='custom'
                    label="الإسم "
                    labelPlacement="floating"
                    placeholder=""
                />
            </IonItem>
            <IonItem>
                <IonInput
                    name="email"
                    value={props.email}
                    class='custom'
                    label="البريد الإلكتروني "
                    labelPlacement="floating"
                    placeholder=""
                    disabled={true}
                />
            </IonItem>
            <IonItem>
                <IonInput
                    name="password"
                    value={password}
                    onIonInput={(event) => {
                        setPassword(event.detail.value);
                        setDisabled(false);
                    }}
                    class='custom'
                    label="كلمة المرور "
                    labelPlacement="floating"
                    placeholder=""
                    type="password"
                />
            </IonItem>
            <div className="btn">
                <IonButton
                    onClick={() => handleClick()}
                    expand="block"
                    disabled={disabled}> 
                    تعديل البيانات
                </IonButton>
            </div>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="يجب عليك إدخال جميع الحقول"
                duration={1500}
                color="danger"
            />
            <IonToast
                isOpen={showPassToast}
                onDidDismiss={() => setShowPassToast(false)}
                message="يجب عليك إدخال أكثر من خمسة محارف"
                duration={1500}
                color="danger"
            />
        </IonList>
    )
}

export default UserDetails;