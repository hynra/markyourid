import React from "react";

export enum FilterMode {
    BrightnessAdd,
    BrightnessRemove,
    ContrastAdd,
    ContrastRemove,
    SaturationAdd,
    SaturationRemove,
    VibranceAdd,
    VibranceRemove,
    HueAdd,
    HueRemove,
    GammaAdd,
    GammaRemove,
}

export const addFilters = (filter: FilterMode, img: any) => {
    switch (filter) {
        case FilterMode.BrightnessAdd:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.brightness(5).render();
            });
            break;
        case FilterMode.BrightnessRemove:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.brightness(-5).render();
            });
            break;
        case FilterMode.ContrastAdd:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.contrast(5).render();
            });
            break;
        case FilterMode.ContrastRemove:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.contrast(-5).render();
            });
            break;
        case FilterMode.SaturationAdd:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.saturation(5).render();
            });
            break;
        case FilterMode.SaturationRemove:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.saturation(-5).render();
            });
            break;
        case FilterMode.VibranceAdd:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.vibrance(5).render();
            });
            break;
        case FilterMode.VibranceRemove:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.vibrance(-5).render();
            });
            break;
        case FilterMode.HueAdd:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.hue(5).render();
            });
            break;
        case FilterMode.HueRemove:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.hue(-5).render();
            });
            break;
        case FilterMode.GammaAdd:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.gamma(5).render();
            });
            break;
        case FilterMode.GammaRemove:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                // this.gamma(0).render();
            });
            break;
    }
}

export const saveImageAsUrl = (canvas: any) : any=> {
    return canvas.toDataURL("image/jpeg", 0.8);
}
