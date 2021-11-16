import * as React from 'react';
import {useStyletron} from 'baseui';
import HeaderNav from "../components/header";
import ImageUploader from "../components/image_uploader";
import {Card, StyledAction, StyledBody} from "baseui/card";
import {Button} from "baseui/button";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {BlockProps} from "baseui/block";
import {useEffect} from "react";
import {Input} from "baseui/input";
import {ButtonGroup} from "baseui/button-group";
import CropWindow from "../components/crop_window";
import AdjustWindow from "../components/adjust_window";
import FilterWindow from "../components/filter_window";


export const sum = (a: number, b: number) => a + b;

const Index: React.FC = () => {
    const [css, theme] = useStyletron();
    const [errorMessage, setErrorMessage] = React.useState("");
    const [imageSrc, setImageSrc] = React.useState<string>("");
    const [imageFile, setImageFile] = React.useState<File>(null);
    const [isCropOpen, setIsCropOpen] = React.useState<boolean>(false);
    const [isAdjustOpen, setIsAdjustOpen] = React.useState<boolean>(false);
    const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);


    useEffect(() => {
        if (imageFile !== null) {
            let reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = () => {
                setImageSrc(reader.result as string);
            }
        }
    }, [imageFile]);

    const itemProps: BlockProps = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div>
            <HeaderNav/>
            <CropWindow
                imageSrc={imageSrc}
                isOpen={isCropOpen}
                setIsOpen={setIsCropOpen}
                onCropped={(newImage => {
                    setImageSrc(newImage)
                })}/>
            <AdjustWindow
                imageSrc={imageSrc}
                isOpen={isAdjustOpen}
                setIsOpen={setIsAdjustOpen}
                onAdjust={(uri) => setImageSrc(uri)}/>
            <FilterWindow
                imageSrc={imageSrc}
                isOpen={isFilterOpen}
                setIsOpen={setIsFilterOpen}
                onFiltered={(uri) => setImageSrc(uri)}/>

            <FlexGrid
                flexGridColumnCount={1}
                flexGridColumnGap="scale800"
                flexGridRowGap="scale800"
            >
                <FlexGridItem {...itemProps}>
                    <h3>Upload an image</h3>
                </FlexGridItem>
                <FlexGridItem {...itemProps}>
                    {imageSrc !== "" && <Card
                        overrides={{Root: {style: {width: '580px', marginTop: "40px"}}}}
                        title="Example card"
                    >
                        <img src={imageSrc} width="100%"/>
                        <StyledBody>

                            <ButtonGroup
                                overrides={{Root: {style: {alignItems: 'center', justifyContent: 'center',}}}}
                            >
                                <Button onClick={() => setIsCropOpen(true)}>Crop</Button>
                                <Button onClick={() => setIsAdjustOpen(true)}>Adjust</Button>
                                <Button onClick={() => setIsFilterOpen(true)}>Filter</Button>
                            </ButtonGroup>

                            Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
                            ornare faucibus ex, non facilisis nisl.
                            <Input
                                placeholder="Controlled Input"
                                clearOnEscape
                            />
                        </StyledBody>
                        <StyledAction>
                            <Button overrides={{BaseButton: {style: {width: '100%'}}}}>
                                Generate
                            </Button>
                        </StyledAction>
                    </Card>}
                </FlexGridItem>
                <FlexGridItem {...itemProps}>
                    <ImageUploader
                        errorMessage={errorMessage}
                        onDrop={(file: File) => {
                            setImageFile(file);
                        }}/>
                </FlexGridItem>
            </FlexGrid>
        </div>
    );
};

export default Index;
