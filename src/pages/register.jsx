import { IonContent, IonPage, IonAvatar, IonImg, IonItem, IonInput, IonButton, IonRouterLink, IonText, IonGrid, IonRow, IonCol } from "@ionic/react";
import Header from "../components/Header/Header";
import avatar from "./assets/images/avatar.png";
import './styles/register.css';
import { Formik } from "formik";
import * as yup from 'yup';
import axios from '../config/axios'
import { REGISTER_URL } from "../config/urls";
import { useState } from "react";
import { Alert, Loading } from '../components'
import { useHistory } from "react-router";




const Register = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setSowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);


    const history = useHistory()

    const validationSchema = yup.object({
        name: yup
            .string()
            .nullable()
            .required("يجب عليك إدخال اسم المستخدم"),
        email: yup
            .string()
            .nullable()
            .email("يجب عليك إدخال بريد إلكتروني صحيح")
            .required("يجب عليك إدخال البريد الإلكتروني"),
        password: yup
            .string()
            .nullable()
            .min(5, 'يجب عليك إدخال 5 محارف على الأقل')
            .required("يجب عليك إدخال كلمة مرور"),
    });

    const onSubmit = async (values) => {
        try {
            setIsLoading(true);
            await axios.post(REGISTER_URL, values).then(() => {
            })
            setSowAlert(true);
        } catch (error) {
            setShowErrorAlert(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <IonPage>
            <Loading isOpen={isLoading} />
            <Alert
                isOpen={showAlert}
                header="تنبيه!"
                subHeader="لقد تم تسجيل حسابك بالفعل"
                message="يمكنك الانتقال إلى صفحة تسجيل الدخول"
                buttons={[
                    {
                        text: "موافق",
                        handler: () => {
                            history.push('/account/login')
                        }
                    }
                ]}
            />
            <Alert
                isOpen={showErrorAlert}
                header="تنبيه!"
                subHeader="هذا البريد الإلكتروني مستخدم"
                message="هذا البريد الإلكتروني مستخدم بالفعل فهل ترغب بتسجيل الدخول؟"
                buttons={[
                    {
                        text: "موافق",
                        handler: () => {
                            history.push('/account/login')
                        }
                    },
                    {
                        text: "إلغاء",
                        role: "cancel"
                    }
                ]}
            />
            <Header headerTitle="صفحة مستخدم جديد" />

            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol sizeMd="6" offsetMd="3" sizeLg="4" offsetLg="4">
                            <IonAvatar className="avatar">
                                <IonImg src={avatar} />
                            </IonAvatar>

                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    password: ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { resetForm }) => {
                                    onSubmit(values);
                                    resetForm();
                                    setShowErrorAlert(false);
                                }}
                            >
                                {
                                    formikProps => (
                                        <form onSubmit={formikProps.handleSubmit}>
                                            <IonItem>

                                                <IonInput
                                                    name="name"
                                                    value={formikProps.values.name}
                                                    onIonChange={formikProps.handleChange}
                                                    onIonBlur={formikProps.handleBlur}
                                                    class='custom' label="اسم المستخدم" labelPlacement="floating" placeholder="ادخل الإسم"
                                                />

                                            </IonItem>
                                            <IonText className="error">{formikProps.touched.name && formikProps.errors.name}</IonText>
                                            <IonItem>

                                                <IonInput
                                                    name="email"
                                                    value={formikProps.values.email}
                                                    onIonChange={formikProps.handleChange}
                                                    onIonBlur={formikProps.handleBlur}
                                                    class='custom' label="البريد الإكتروني" labelPlacement="floating" placeholder="ادخل البريد الإلكتروني"
                                                />

                                            </IonItem>
                                            <IonText className="error">{formikProps.touched.email && formikProps.errors.email}</IonText>


                                            <IonItem>

                                                <IonInput
                                                    name="password"
                                                    value={formikProps.values.password}
                                                    onIonChange={formikProps.handleChange}
                                                    onIonBlur={formikProps.handleBlur}
                                                    class='custom' type="password" label="كلمة المرور" labelPlacement="floating" placeholder="ادخل كلمة المرور"
                                                />

                                            </IonItem>
                                            <IonText className="error">{formikProps.touched.password && formikProps.errors.password}</IonText>
                                            <div className="ion-text-center btn">
                                                <IonButton type="submit" >إنشاء حساب</IonButton>
                                                <IonRouterLink routerLink="/account/login" className="router-link" color='warning'>تسجيل الدخول</IonRouterLink>
                                            </div>
                                        </form>
                                    )
                                }


                            </Formik>
                        </IonCol>
                    </IonRow>
                </IonGrid>



            </IonContent>
        </IonPage>
    )
}

export default Register