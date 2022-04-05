import * as Yup from 'yup';

export const initialValuesTopHomeSlidesImage = {
    // titleAr: '',
    // titleFr: '',
    // titleEn: '',
    // subTitleAr: '',
    // subTitleFr: '',
    // subTitleEn: '',
    descriptionAr: '',
    descriptionFr: '',
    descriptionEn: '',
};

export const validationSchemaTopHomeSlidesImage = Yup.object({
    // titleAr: Yup.string().required('Question Ar is required').min(5, 'Min 5 digits').max(200, 'Max 200 digits'),
    // titleFr: Yup.string().required('Question Ar is required').min(5, 'Min 5 digits').max(200, 'Max 200 digits'),
    // titleEn: Yup.string().required('Question Ar is required').min(5, 'Min 5 digits').max(200, 'Max 200 digits'),
    // subTitleAr: Yup.string().required('Question Fr is required').min(5, 'Min 5 digits').max(200, 'Max 200 digits'),
    // subTitleFr: Yup.string().required('Question Fr is required').min(5, 'Min 5 digits').max(200, 'Max 200 digits'),
    // subTitleEn: Yup.string().required('Question Fr is required').min(5, 'Min 5 digits').max(200, 'Max 200 digits'),
    descriptionAr: Yup.string().required('Question En is required').min(5, 'Min 5 digits').max(5000, 'Max 5000 digits'),
    descriptionFr: Yup.string().required('Question En is required').min(5, 'Min 5 digits').max(5000, 'Max 5000 digits'),
    descriptionEn: Yup.string().required('Question En is required').min(5, 'Min 5 digits').max(5000, 'Max 5000 digits')
});
