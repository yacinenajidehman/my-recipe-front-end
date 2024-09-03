import { IonItem, IonInput, IonLabel } from "@ionic/react";

import { Geolocation } from "@capacitor/geolocation"
import { useEffect, useState } from "react";
import axios from "axios";


const GetLocation = (props) => {

    const [region, setRegion] = useState("جاري جلب المنطة ...")
    const [country, setCountry] = useState("جاري جلب الدولة ...")

    useEffect(() => {
        printCurrentPosition()
    }, [])

    const printCurrentPosition = async () => {
        try {
            const coordinates = await Geolocation.getCurrentPosition()

            const url = `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&format=json&accept-language=ar`

            let position = {};
            await axios.get(url).then((res) => {

                setCountry(res.data.address.country);
                setRegion(res.data.address.state || res.data.address.region)

            });



        } catch (e) {
            console.log(e)
            setCountry("");
            setRegion("");
        }
    }


    useEffect(() => {
        handleLocation()
    }, [region, country])

    const handleLocation = () => {
        props.region(region);
        props.country(country);
    }

    return (
        <IonItem>
            <IonLabel color="warning">الدولة</IonLabel>
            <IonInput disabled value={country} />
            <IonLabel color="warning">المنطقة</IonLabel>
            <IonInput disabled value={region} />
        </IonItem>
    )
}

export default GetLocation;