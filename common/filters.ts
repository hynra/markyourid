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
        case FilterMode.Clarity:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.clarity().render();
            });
            break;
        case FilterMode.Concentrate:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.concentrate().render();
            });
            break;
        case FilterMode.CrossProcess:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.crossProcess().render();
            });
            break;
        case FilterMode.GlowingSun:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.glowingSun().render();
            });
            break;
        case FilterMode.Grungy:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.grungy().render();
            });
            break;
        case FilterMode.HazyDays:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.hazyDays().render();
            });
            break;
        case FilterMode.Hemingway:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.hemingway().render();
            });
            break;
        case FilterMode.HerMajesty:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.herMajesty().render();
            });
            break;
        case FilterMode.Jarques:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.jarques().render();
            });
            break;
        case FilterMode.Lomo:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.lomo().render();
            });
            break;
        case FilterMode.Love:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.love().render();
            });
            break;
        case FilterMode.Nostalgia:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.nostalgia().render();
            });
            break;
        case FilterMode.OldBoot:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.oldBoot().render();
            });
            break;
        case FilterMode.OrangePeel:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.orangePeel().render();
            });
            break;
        case FilterMode.Pinhole:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.pinhole().render();
            });
            break;
        case FilterMode.SinCity:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.sinCity().render();
            });
            break;
        case FilterMode.Sunrise:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.sunrise().render();
            });
            break;
        case FilterMode.Vintage:
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.vintage().render();
            });
            break;
    }
}

export const saveImageAsUrl = (canvas: any): any => {
    return canvas.toDataURL("image/jpeg", 0.8);
}
