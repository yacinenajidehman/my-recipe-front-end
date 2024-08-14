
import { IonLoading } from "@ionic/react";
import './index.css';

const Loading = (props) => {
    return (
        <IonLoading isOpen={props.isOpen} className="custom-loading" />
    )
}

export default Loading;