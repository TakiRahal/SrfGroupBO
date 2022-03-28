import React from 'react';
import {useFormik} from "formik";
import {connect} from "react-redux";
import {IRootState} from "../../shared/reducers";
import {createEntity, getEntity, updateEntity} from "../../shared/reducers/category.reducer";
import {reset as resetCategory} from "../../shared/reducers/category.reducer";
import {initialValuesCategoryAddUpdate, validationSchemaCategoryAddUpdate} from "./validation/validation-category";
import {useHistory, useParams} from "react-router";
import {ALL_APP_ROUTES} from "../../core/config/all-app-routes";

const initialValues = initialValuesCategoryAddUpdate;

export interface IAddUpdateCategoryProps extends StateProps, DispatchProps{}

export const AddUpdateCategory = (props: IAddUpdateCategoryProps) => {
    const history = useHistory();

    const {id} = useParams<{ id: string }>();

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemaCategoryAddUpdate,
        onSubmit: values => {
            console.log('values ', values);
            const entity = {
                ...props.entityCategory,
                ...values
            }
            console.log('entity ', entity);

            if(!id){
                props.createEntity(entity);
            }
            else{
                props.updateEntity(entity);
            }
            // props.createEntityCategory(entity);
        },
    });

    React.useEffect(() => {
        if(id){ // For update
            console.log('id = ', id);
            props.getEntity(Number(id) || -1);
        }
    }, [id])

    React.useEffect(() => {
        if(props.entityCategory && !props.loadingEntityCategory){
            console.log('entityCategory ', props.entityCategory);
            formik.setFieldValue('id', props.entityCategory?.id || 0);
            formik.setFieldValue('titleAr', props.entityCategory?.titleAr || '');
            formik.setFieldValue('titleFr', props.entityCategory?.titleFr || '');
            formik.setFieldValue('titleEn', props.entityCategory?.titleEn || '');
        }
    }, [props.entityCategory])

    React.useEffect(() => {
        if(props.addSuccessCategory){
            props.resetCategory();
            history.push(ALL_APP_ROUTES.CATEGORY.LIST);
        }
    }, [props.addSuccessCategory])

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h2>Create or edit a Faq</h2>
                <table className="border-collapse border border-slate-400 w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-slate-300 p-3">#</th>
                            <th className="border border-slate-300 p-3">Category</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr>
                            <td className="border border-slate-300 ...">
                                <div className="p-5 text-gray-700">
                                    <label className="block mb-1" htmlFor="questionAr">New category</label>
                                </div>
                            </td>
                            <td className="border border-slate-300 ...">

                                {
                                    id ? <div className="p-5 text-gray-700">
                                        <label className="block mb-1" htmlFor="responseAr">Id</label>
                                        <input
                                            id="id"
                                            name="id"
                                            type="text"
                                            disabled
                                            className={formik.touched.titleAr && Boolean(formik.errors.id) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :
                                                'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}
                                            aria-describedby="responseAr"
                                            value={formik.values.id}
                                            onChange={formik.handleChange}/>
                                        <span className="text-xs text-red-700" id="responseAr">{formik.touched.id && formik.errors.id}</span>
                                    </div>: null
                                }


                                <div className="p-5 text-gray-700">
                                    <label className="block mb-1" htmlFor="responseAr">Title Ar</label>
                                    <input
                                        id="titleAr"
                                        name="titleAr"
                                        type="text"
                                        placeholder="Title Ar..."
                                        className={formik.touched.titleAr && Boolean(formik.errors.titleAr) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :
                                            'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}
                                        aria-describedby="responseAr"
                                        value={formik.values.titleAr}
                                        onChange={formik.handleChange}/>
                                    <span className="text-xs text-red-700" id="responseAr">{formik.touched.titleAr && formik.errors.titleAr}</span>
                                </div>

                                <div className="p-5 text-gray-700">
                                    <label className="block mb-1" htmlFor="responseAr">Title Fr</label>
                                    <input
                                        id="titleFr"
                                        name="titleFr"
                                        type="text"
                                        placeholder="Title Fr..."
                                        className={formik.touched.titleFr && Boolean(formik.errors.titleFr) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :
                                            'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}
                                        aria-describedby="responseAr"
                                        value={formik.values.titleFr}
                                        onChange={formik.handleChange}/>
                                    <span className="text-xs text-red-700" id="responseAr">{formik.touched.titleFr && formik.errors.titleFr}</span>
                                </div>

                                <div className="p-5 text-gray-700">
                                    <label className="block mb-1" htmlFor="responseAr">Title En</label>
                                    <input
                                        id="titleEn"
                                        name="titleEn"
                                        type="text"
                                        placeholder="Title En..."
                                        className={formik.touched.titleEn && Boolean(formik.errors.titleEn) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :
                                            'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}
                                        aria-describedby="responseAr"
                                        value={formik.values.titleEn}
                                        onChange={formik.handleChange}/>
                                    <span className="text-xs text-red-700" id="responseAr">{formik.touched.titleEn && formik.errors.titleEn}</span>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>

                <div className="flex flex-row-reverse">
                    <div>
                        <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                                type="submit">
                            {id ? 'Update Category' : 'Add new Category'}

                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}


const mapStateToProps = ({category}: IRootState) => ({
    loadingEntityCategory: category.loadingEntity,
    entityCategory: category.entity,
    addSuccessCategory: category.addSuccess,
});

const mapDispatchToProps = {
    createEntity,
    updateEntity,
    getEntity,
    resetCategory,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateCategory);