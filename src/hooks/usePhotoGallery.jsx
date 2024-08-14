import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';
export function usePhotoGallery() {
    const [blobUrl, setBlobUrl] = useState();

    const takePhoto = async () => {
        try {
            const cameraPhoto = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Prompt,
                quality: 100,
                promptLabelHeader:"صورة",
                promptLabelPhoto:"ملفات الصورة",
                promptLabelPicture:"التقاط صورة"
            });
            setBlobUrl(cameraPhoto.webPath);
        } catch (error) {
            console.log("تم إغلاق الكاميرا")
        }

    };
    



    return { takePhoto, blobUrl };
}


export default usePhotoGallery;
