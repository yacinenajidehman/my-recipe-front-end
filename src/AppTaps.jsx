import { Redirect, Route } from 'react-router-dom';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import CreatePost from './pages/createPost';
import GetAllPosts from './pages/getAllPosts';
import GetPost from './pages/getPost';
import MyPosts from './pages/myPosts';
import Profile from './pages/profile';
import UpdatePost from './pages/updatePost';
import NotFound from './pages/notFound';
import { addCircle, home } from 'ionicons/icons'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const AppTaps = () => {

    const { loggedIn } = useContext(AuthContext);

    if (!loggedIn) {
        return (
            <Redirect to="/account/login" />
        )
    } else {
        return (
            <IonTabs>
                <IonRouterOutlet >
                    <Route exact path="/my-recipe/account/profile">
                        <Profile />
                    </Route>
                    <Route exact path="/my-recipe/all-posts">
                        <GetAllPosts />
                    </Route>
                    <Route exact path="/my-recipe/all-posts/:id">
                        <GetPost />
                    </Route>
                    <Route exact path="/my-recipe/my-posts">
                        <MyPosts />
                    </Route>
                    <Route exact path="/my-recipe/my-posts/:id">
                        <UpdatePost />
                    </Route>
                    <Route exact path="/my-recipe/create-post">
                        <CreatePost />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </IonRouterOutlet>
                <IonTabBar slot='bottom'>
                    <IonTabButton tab='create-post' href='/my-recipe/create-post' >
                        <IonIcon icon={addCircle} />
                        <IonLabel>
                            نشر
                        </IonLabel>
                    </IonTabButton>
                    <IonTabButton tab='all-post' href='/my-recipe/all-posts'>
                        <IonIcon icon={home} />
                        <IonLabel >
                            المنشورات
                        </IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        )

    }
}

export default AppTaps