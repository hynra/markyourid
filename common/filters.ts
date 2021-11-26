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
    Vintage, Lomo, Clarity, SinCity, Sunrise,
    CrossProcess, OrangePeel, Love, Grungy, Jarques, Pinhole,
    OldBoot, GlowingSun, HazyDays, HerMajesty, Nostalgia,
    Hemingway, Concentrate
}

export const addFilters = (filter: FilterMode, img: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        switch (filter) {
            case FilterMode.BrightnessAdd:
                // @ts-ignore
                window.Caman("#canvasAdjust", img, function () {
                    this.brightness(5).render();
                    resolve(true);
                });
                break;
            case FilterMode.BrightnessRemove:
                // @ts-ignore
                window.Caman("#canvasAdjust", img, function () {
                    this.brightness(-5).render();
                    resolve(true);
                });
                break;
            case FilterMode.ContrastAdd:
                // @ts-ignore
                window.Caman("#canvasAdjust", img, function () {
                    this.contrast(5).render();
                    resolve(true);
                });
                break;
            case FilterMode.ContrastRemove:
                // @ts-ignore
                window.Caman("#canvasAdjust", img, function () {
                    this.contrast(-5).render();
                    resolve(true);
                });
                break;
            case FilterMode.SaturationAdd:
                // @ts-ignore
                window.Caman("#canvasAdjust", img, function () {
                    this.saturation(5).render();
                    resolve(true);
                });
                break;
            case FilterMode.SaturationRemove:
                // @ts-ignore
                window.Caman("#canvasAdjust", img, function () {
                    this.saturation(-5).render();
                    resolve(true);
                });
                break;
            case FilterMode.VibranceAdd:
                // @ts-ignore
                window.Caman("#canvasAdjust", img, function () {
                    this.vibrance(5).render();
                    resolve(true);
                });
                break;
            case FilterMode.VibranceRemove:
                // @ts-ignore
                window.Caman("#canvasAdjust", img, function () {
                    this.vibrance(-5).render();
                    resolve(true);
                });
                break;
            case FilterMode.HueAdd:
                // @ts-ignore
                window.Caman("#canvasAdjust", img, function () {
                    this.hue(5).render();
                    resolve(true);
                });
                break;
            case FilterMode.HueRemove:
                // @ts-ignore
                window.Caman("#canvasAdjust", img, function () {
                    this.hue(-5).render();
                    resolve(true);
                });
                break;
            case FilterMode.GammaAdd:
                // @ts-ignore
                window.Caman("#canvasAdjust", img, function () {
                    this.gamma(5).render();
                    resolve(true);
                });
                break;
            case FilterMode.GammaRemove:
                // @ts-ignore
                window.Caman("#canvasAdjust", img, function () {
                    // this.gamma(0).render();
                    resolve(true);
                });
                break;
            case FilterMode.Clarity:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.clarity().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.Concentrate:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.concentrate().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.CrossProcess:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.crossProcess().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.GlowingSun:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.glowingSun().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.Grungy:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.grungy().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.HazyDays:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.hazyDays().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.Hemingway:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.hemingway().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.HerMajesty:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.herMajesty().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.Jarques:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.jarques().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.Lomo:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.lomo().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.Love:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.love().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.Nostalgia:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.nostalgia().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.OldBoot:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.oldBoot().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.OrangePeel:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.orangePeel().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.Pinhole:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.pinhole().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.SinCity:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.sinCity().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.Sunrise:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.sunrise().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
            case FilterMode.Vintage:
                // @ts-ignore
                window.Caman("#canvasFilter", img, function () {
                    this.vintage().render(function() {
                        const image = this.toBase64();
                        resolve(image);
                    });
                });
                break;
        }
    })
}

export const saveImageAsUrl = (canvas: any, format = "image/jpeg"): any => {
    return canvas.toDataURL("image/jpeg", 0.8);
}

export const downloadCanvasToImage = (url: string) => {
    let link = document.createElement('a');
    link.download = `${new Date().getTime()}.jpeg`;
    link.href = url
    link.click();
}
