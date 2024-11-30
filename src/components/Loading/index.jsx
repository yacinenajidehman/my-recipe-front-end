
import { IonLoading } from "@ionic/react";
import './index.css';

const Loading = props => {
    return props.isOpen ?? <IonLoading isOpen={props.isOpen} className='custom-loading' />;
};

export default Loading;