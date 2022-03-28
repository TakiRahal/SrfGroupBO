import * as Yup from 'yup';

export const initialValuesCategoryAddUpdate = {
    id: 0,
    titleAr: '',
    titleFr: '',
    titleEn: '',
};

export const validationSchemaCategoryAddUpdate = Yup.object({
    id: Yup.number().nullable().notRequired(),
    titleAr: Yup.string().required('Title Ar is required').min(5, 'Min 5 digits').max(200, 'Max 200 digits'),
    titleFr: Yup.string().required('Title Fr is required').min(5, 'Min 5 digits').max(200, 'Max 200 digits'),
    titleEn: Yup.string().required('Title En is required').min(5, 'Min 5 digits').max(200, 'Max 200 digits'),
});
