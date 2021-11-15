import {FileUploader} from "baseui/file-uploader";
import * as React from "react";

const ImageUploader: React.FC<{errorMessage: string, onDrop: Function}> = ({errorMessage, onDrop}) => {
    return(
        <FileUploader
            errorMessage={errorMessage}
            accept='image/*'
            multiple={false}
            onDrop={(acceptedFiles, rejectedFiles) => {
                onDrop(acceptedFiles[0])
            }}
        />
    )
}

export default ImageUploader;
