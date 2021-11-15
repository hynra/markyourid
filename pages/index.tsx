import * as React from 'react';
import {useStyletron} from 'baseui';
import HeaderNav from "../components/header";
import ImageUploader from "../components/image_uploader";

export const sum = (a: number, b: number) => a + b;

const Index: React.FC = () => {
    const [css, theme] = useStyletron();
    const [errorMessage, setErrorMessage] = React.useState(
        ""
    );

    return (
        <div>
            <HeaderNav />
            <div className={css({
                margin: "100px"
            })}>
                <h3>Upload an image</h3>
                <ImageUploader
                    errorMessage={errorMessage}
                    onDrop={(file: File) => {
                        console.log(file)
                    }} />
            </div>
        </div>
    );
};

export default Index;
