import React from 'react';
import {IRootState} from "../../shared/reducers";
import {connect} from "react-redux";
import {useFormik} from "formik";
import {initialValuesTopHomeSlidesImage, validationSchemaTopHomeSlidesImage} from "./validation/validation-home";
import {reset, createEntity, getEntity} from "../../shared/reducers/top-home-slides";
import {useHistory, useParams} from "react-router";
import {ALL_APP_ROUTES} from "../../core/config/all-app-routes";

const initialValues = initialValuesTopHomeSlidesImage;

export interface IAddUpdateTopHomeSlidesProps extends StateProps, DispatchProps{}

export const AddUpdateTopHomeSlides = (props: IAddUpdateTopHomeSlidesProps) => {

    const history = useHistory();

    const {id} = useParams<{ id: string }>();

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemaTopHomeSlidesImage,
        onSubmit: values => {
            console.log('values ', values);
            props.createEntity(values);
        },
    });

    React.useEffect(() => {
        if(props.addSuccess){
            props.reset();
            history.push(ALL_APP_ROUTES.HOME.TOPHOMESLIDES.LIST);
        }
    }, [props.addSuccess])

    React.useEffect(() => {
        console.log('id = ', id);
        if(id){
            props.getEntity(Number(id));
        }
    }, [id])

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <table className="border-collapse border border-slate-400 w-full">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-slate-300 p-3" colSpan={3}>Inputs</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {/*<tr>*/}
                        {/*<td className="border border-slate-300 ...">*/}
                            {/*<div className="p-5 text-gray-700">*/}
                                {/*<label className="block mb-1" htmlFor="questionAr">titleAr</label>*/}
                                {/*<input*/}
                                    {/*id="titleAr"*/}
                                    {/*name="titleAr"*/}
                                    {/*type="text"*/}
                                    {/*placeholder="titleAr..."*/}
                                    {/*className={formik.touched.titleAr && Boolean(formik.errors.titleAr) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :*/}
                                        {/*'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}*/}
                                    {/*aria-describedby="passwordHelp"*/}
                                    {/*value={formik.values.titleAr}*/}
                                    {/*onChange={formik.handleChange}/>*/}
                                {/*<span className="text-xs text-red-700" id="questionAr">{formik.touched.titleAr && formik.errors.titleAr}</span>*/}
                            {/*</div>*/}
                        {/*</td>*/}

                        {/*<td className="border border-slate-300 ...">*/}
                            {/*<div className="p-5 text-gray-700">*/}
                                {/*<label className="block mb-1" htmlFor="questionAr">titleFr</label>*/}
                                {/*<input*/}
                                    {/*id="titleFr"*/}
                                    {/*name="titleFr"*/}
                                    {/*type="text"*/}
                                    {/*placeholder="titleFr..."*/}
                                    {/*className={formik.touched.titleFr && Boolean(formik.errors.titleFr) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :*/}
                                        {/*'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}*/}
                                    {/*aria-describedby="passwordHelp"*/}
                                    {/*value={formik.values.titleFr}*/}
                                    {/*onChange={formik.handleChange}/>*/}
                                {/*<span className="text-xs text-red-700" id="questionAr">{formik.touched.titleFr && formik.errors.titleFr}</span>*/}
                            {/*</div>*/}
                        {/*</td>*/}

                        {/*<td className="border border-slate-300 ...">*/}
                            {/*<div className="p-5 text-gray-700">*/}
                                {/*<label className="block mb-1" htmlFor="questionAr">Title</label>*/}
                                {/*<input*/}
                                    {/*id="titleEn"*/}
                                    {/*name="titleEn"*/}
                                    {/*type="text"*/}
                                    {/*placeholder="titleEn..."*/}
                                    {/*className={formik.touched.titleEn && Boolean(formik.errors.titleEn) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :*/}
                                        {/*'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}*/}
                                    {/*aria-describedby="passwordHelp"*/}
                                    {/*value={formik.values.titleEn}*/}
                                    {/*onChange={formik.handleChange}/>*/}
                                {/*<span className="text-xs text-red-700" id="questionAr">{formik.touched.titleEn && formik.errors.titleEn}</span>*/}
                            {/*</div>*/}
                        {/*</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td className="border border-slate-300 ...">*/}
                            {/*<div className="p-5 text-gray-700">*/}
                                {/*<label className="block mb-1" htmlFor="responseAr">subTitleAr</label>*/}
                                {/*<input*/}
                                    {/*id="subTitleAr"*/}
                                    {/*name="subTitleAr"*/}
                                    {/*type="text"*/}
                                    {/*placeholder="subTitleAr..."*/}
                                    {/*className={formik.touched.subTitleAr && Boolean(formik.errors.subTitleAr) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :*/}
                                        {/*'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}*/}
                                    {/*aria-describedby="responseAr"*/}
                                    {/*value={formik.values.subTitleAr}*/}
                                    {/*onChange={formik.handleChange}/>*/}
                                {/*<span className="text-xs text-red-700" id="responseAr">{formik.touched.subTitleAr && formik.errors.subTitleAr}</span>*/}
                            {/*</div>*/}
                        {/*</td>*/}
                        {/*<td className="border border-slate-300 ...">*/}
                            {/*<div className="p-5 text-gray-700">*/}
                                {/*<label className="block mb-1" htmlFor="responseAr">Subtitle</label>*/}
                                {/*<input*/}
                                    {/*id="subTitleFr"*/}
                                    {/*name="subTitleFr"*/}
                                    {/*type="text"*/}
                                    {/*placeholder="subTitleFr..."*/}
                                    {/*className={formik.touched.subTitleFr && Boolean(formik.errors.subTitleFr) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :*/}
                                        {/*'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}*/}
                                    {/*aria-describedby="responseAr"*/}
                                    {/*value={formik.values.subTitleFr}*/}
                                    {/*onChange={formik.handleChange}/>*/}
                                {/*<span className="text-xs text-red-700" id="responseAr">{formik.touched.subTitleFr && formik.errors.subTitleFr}</span>*/}
                            {/*</div>*/}
                        {/*</td>*/}
                        {/*<td className="border border-slate-300 ...">*/}
                            {/*<div className="p-5 text-gray-700">*/}
                                {/*<label className="block mb-1" htmlFor="responseAr">subTitleEn</label>*/}
                                {/*<input*/}
                                    {/*id="subTitleEn"*/}
                                    {/*name="subTitleEn"*/}
                                    {/*type="text"*/}
                                    {/*placeholder="subTitleEn..."*/}
                                    {/*className={formik.touched.subTitleEn && Boolean(formik.errors.subTitleEn) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :*/}
                                        {/*'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}*/}
                                    {/*aria-describedby="responseAr"*/}
                                    {/*value={formik.values.subTitleEn}*/}
                                    {/*onChange={formik.handleChange}/>*/}
                                {/*<span className="text-xs text-red-700" id="responseAr">{formik.touched.subTitleEn && formik.errors.subTitleEn}</span>*/}
                            {/*</div>*/}
                        {/*</td>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                        {/*<td className="border border-slate-300 ...">*/}
                            {/*<div className="p-5 text-gray-700">*/}
                                {/*<label className="block mb-1" htmlFor="responseAr">descriptionAr</label>*/}
                                {/*<textarea*/}
                                    {/*id="descriptionAr"*/}
                                    {/*name="descriptionAr"*/}
                                    {/*rows={4}*/}
                                    {/*placeholder="descriptionAr..."*/}
                                    {/*className={formik.touched.descriptionAr && Boolean(formik.errors.descriptionAr) ? 'w-full px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :*/}
                                        {/*'w-full px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}*/}
                                    {/*aria-describedby="responseAr"*/}
                                    {/*value={formik.values.descriptionAr}*/}
                                    {/*onChange={formik.handleChange}/>*/}
                                {/*<span className="text-xs text-red-700" id="responseAr">{formik.touched.descriptionAr && formik.errors.descriptionAr}</span>*/}
                            {/*</div>*/}
                        {/*</td>*/}
                        {/*<td className="border border-slate-300 ...">*/}
                            {/*<div className="p-5 text-gray-700">*/}
                                {/*<label className="block mb-1" htmlFor="responseAr">descriptionFr</label>*/}
                                {/*<textarea*/}
                                    {/*id="descriptionFr"*/}
                                    {/*name="descriptionFr"*/}
                                    {/*rows={4}*/}
                                    {/*placeholder="descriptionFr..."*/}
                                    {/*className={formik.touched.descriptionFr && Boolean(formik.errors.descriptionFr) ? 'w-full px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :*/}
                                        {/*'w-full px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}*/}
                                    {/*aria-describedby="responseAr"*/}
                                    {/*value={formik.values.descriptionFr}*/}
                                    {/*onChange={formik.handleChange}/>*/}
                                {/*<span className="text-xs text-red-700" id="responseAr">{formik.touched.descriptionFr && formik.errors.descriptionFr}</span>*/}
                            {/*</div>*/}
                        {/*</td>*/}
                        {/*<td className="border border-slate-300 ...">*/}
                            {/*<div className="p-5 text-gray-700">*/}
                                {/*<label className="block mb-1" htmlFor="responseAr">Description</label>*/}
                                {/*<textarea*/}
                                    {/*id="descriptionEn"*/}
                                    {/*name="descriptionEn"*/}
                                    {/*rows={4}*/}
                                    {/*placeholder="descriptionEn..."*/}
                                    {/*className={formik.touched.descriptionEn && Boolean(formik.errors.descriptionEn) ? 'w-full px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :*/}
                                        {/*'w-full px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}*/}
                                    {/*aria-describedby="responseAr"*/}
                                    {/*value={formik.values.descriptionEn}*/}
                                    {/*onChange={formik.handleChange}/>*/}
                                {/*<span className="text-xs text-red-700" id="responseAr">{formik.touched.descriptionEn && formik.errors.descriptionEn}</span>*/}
                            {/*</div>*/}
                        {/*</td>*/}
                    {/*</tr>*/}

                    </tbody>
                </table>

                <div className="flex flex-row-reverse ...">
                    <div>
                        <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                                type="submit">
                            Add new TopHomeSlidesImage
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
}


const mapStateToProps = ({topHomeSlides}: IRootState) => ({
    loadingEntity: topHomeSlides.loadingEntity,
    entity: topHomeSlides.entity,
    addSuccess: topHomeSlides.addSuccess,
});

const mapDispatchToProps = {
    createEntity,
    getEntity,
    reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateTopHomeSlides);