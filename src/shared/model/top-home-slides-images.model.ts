import {ITopHomeSlides} from "./top-home-slides.model";

export interface ITopHomeSlidesImages {
    id?: any;
    // titleAr?: string;
    // titleFr?: string;
    // titleEn?: string;
    // subTitleAr?: string;
    // subTitleFr?: string;
    // subTitleEn?: string;
    descriptionAr?: string;
    descriptionFr?: string;
    descriptionEn?: string;
    image?: string;
}
export const defaultValue: Readonly<ITopHomeSlidesImages> = {};