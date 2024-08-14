import { IonContent, IonPage, IonItem, IonInput, IonButton, IonRouterLink, IonText, IonIcon, IonList } from "@ionic/react";
import Header from "../components/Header/Header";
import { logIn } from "ionicons/icons";
import './styles/register.css';
import { Formik } from "formik";
import * as yup from 'yup';
import axios from '../config/axios';
import { LOGIN_URL } from "../config/urls";
import { useState, useContext } from "react";
import { Alert, Loading } from '../components';
import { useHistory } from "react-router";
import './styles/login.css';
import { Preferences } from '@capacitor/preferences';
import { AuthContext } from '../context/AuthContext';



const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const { setLoggedIn, setJwt } = useContext(AuthContext)

    const history = useHistory();

    const onSubmit = async (values) => {
        try {
            setIsLoading(true);
            await axios.post(LOGIN_URL, values).then(async (res) => {
                await Preferences.set({
                    key: 'accessToken',
                    value: res.data.accessToken,
                });
                setLoggedIn(true);
                setJwt(res.data.accessToken);
                history.push('/my-recipe/all-posts');
            });

        } catch (e) {
            if (e.response.status === 401) {
                setShowErrorAlert(true)
            } else {
                console.log(e.response);
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <IonPage>
            <Loading isOpen={isLoading} />

            <Alert
                isOpen={showErrorAlert}
                header="تنبيه!"
                subHeader="البريد الإلكتروني او كلمة المرور خاطئة"
                message="تحقق من صحة البريد الإلكتروني و كلمة المرور"
                buttons={[
                    {
                        text: "موافق",
                        role: "ok",
                    }
                ]}
            />
            <Header headerTitle="صفحة تسجيل الدخول" disabledBackButton="true" />

            <IonContent>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={yup.object({
                        email: yup.string().email('البريد الإلكتروني غير صالح').required('مطلوب'),
                        password: yup.string().required('مطلوب')
                    })}
                    onSubmit={(values, { resetForm }) => {
                        onSubmit(values);
                        resetForm();
                        setShowErrorAlert(false)
                    }}
                >
                    {({ handleChange, handleSubmit, values, errors, touched, handleBlur }) => (
                        <form onSubmit={handleSubmit}>
                            <IonList>
                                <IonIcon icon={logIn} className="icon" />
                                <div className="ion-margin-bottom">
                                    <IonItem >
                                        <IonInput
                                            name="email"
                                            value={values.email}
                                            onIonChange={handleChange('email')}
                                            onIonBlur={handleBlur}
                                            class='custom'
                                            label="البريد الإكتروني"
                                            labelPlacement="floating"
                                            placeholder="ادخل البريد الإلكتروني"
                                        />

                                    </IonItem>
                                    {touched.email && errors.email && (
                                        <IonText className="error">{errors.email}</IonText>
                                    )}
                                </div>
                                <IonItem>
                                    <IonInput
                                        name="password"
                                        value={values.password}
                                        onIonChange={handleChange('password')}
                                        class='custom'
                                        onIonBlur={handleBlur}
                                        type="password"
                                        label="كلمة المرور"
                                        labelPlacement="floating"
                                        placeholder="ادخل كلمة المرور"
                                    />

                                </IonItem>
                                {touched.password && errors.password && (
                                    <IonText className="error">{errors.password}</IonText>
                                )}
                            </IonList>
                            <div
                                className="ion-text-center btn"
                            >
                                <IonButton type="submit">تسجيل الدخول</IonButton>
                                <IonRouterLink routerLink="/account/register" className="router-link" color='warning'>
                                    إنشاء حساب
                                </IonRouterLink>
                            </div>
                        </form>
                    )}
                </Formik>
            </IonContent>
        </IonPage >
    );
};

export default Login;
