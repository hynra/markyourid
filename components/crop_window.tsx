import React from "react";
import Cropper from 'react-easy-crop'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


const CropWindow: React.FC<{imageSrc: string}> = ({imageSrc}) => {

    const [crop, setCrop] = React.useState({ aspect: 16 / 9 });

    const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])

    return (
        <ReactCrop
            src={imageSrc}
            crop={crop}
            ruleOfThirds
            onChange={newCrop => console.log(newCrop)} />
    )
}

export default CropWindow;
