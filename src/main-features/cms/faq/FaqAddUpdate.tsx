import React from 'react';
import {useFormik} from "formik";
import {initialValuesFaqAddUpdate, validationSchemaFaqAddUpdaten} from "./validation/validation-faq-add-update";
import {IRootState} from "../../../shared/reducers";
import {connect} from "react-redux";
import { createEntity as createEntityFaq } from '../../../shared/reducers/faq.reducer';
import {useHistory} from "react-router";
import {ALL_APP_ROUTES} from "../../../core/config/all-app-routes";


const initialValues = initialValuesFaqAddUpdate;


export interface IFaqUpdateProps extends StateProps, DispatchProps{}

export const FaqAddUpdate = (props: IFaqUpdateProps) => {

    const history = useHistory();

    const {
        loadingEntityFaq,
        entityFaq,
        addSuccessFaq,
        createEntityFaq
    } = props;

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemaFaqAddUpdaten,
        onSubmit: values => {
            createEntityFaq(values);
        },
    });

    React.useEffect(() => {
        if(addSuccessFaq){
            history.push(ALL_APP_ROUTES.FAQ.LIST);
        }
    }, [addSuccessFaq]);

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h2>Create or edit a Faq</h2>
                <table className="border-collapse border border-slate-400 w-full">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-slate-300 p-3">Question</th>
                        <th className="border border-slate-300 p-3">Response</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    <tr>
                        <td className="border border-slate-300 ...">
                            <div className="p-5 text-gray-700">
                                <label className="block mb-1" htmlFor="questionAr">Question Ar</label>
                                <input
                                    id="questionAr"
                                    name="questionAr"
                                    type="text"
                                    placeholder="Question Ar..."
                                    className={formik.touched.questionAr && Boolean(formik.errors.questionAr) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :
                                        'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}
                                    aria-describedby="passwordHelp"
                                    value={formik.values.questionAr}
                                    onChange={formik.handleChange}/>
                                <span className="text-xs text-red-700" id="questionAr">{formik.touched.questionAr && formik.errors.questionAr}</span>
                            </div>
                        </td>
                        <td className="border border-slate-300 ...">
                            <div className="p-5 text-gray-700">
                                <label className="block mb-1" htmlFor="responseAr">Response Ar</label>
                                <input
                                    id="responseAr"
                                    name="responseAr"
                                    type="text"
                                    placeholder="Response Ar..."
                                    className={formik.touched.responseAr && Boolean(formik.errors.responseAr) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :
                                        'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}
                                    aria-describedby="responseAr"
                                    value={formik.values.responseAr}
                                    onChange={formik.handleChange}/>
                                <span className="text-xs text-red-700" id="responseAr">{formik.touched.responseAr && formik.errors.responseAr}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 ...">
                            <div className="p-5 text-gray-700">
                                <label className="block mb-1" htmlFor="questionFr">Question Fr</label>
                                <input
                                    id="questionFr"
                                    name="questionFr"
                                    type="text"
                                    placeholder="Question Fr..."
                                    className={formik.touched.questionFr && Boolean(formik.errors.questionFr) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :
                                        'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}
                                    aria-describedby="questionFr"
                                    value={formik.values.questionFr}
                                    onChange={formik.handleChange}/>
                                <span className="text-xs text-red-700" id="questionFr">{formik.touched.questionFr && formik.errors.questionFr}</span>
                            </div>
                        </td>
                        <td className="border border-slate-300 ...">
                            <div className="p-5 text-gray-700">
                                <label className="block mb-1" htmlFor="responseFr">Response Fr</label>
                                <input
                                    id="responseFr"
                                    name="responseFr"
                                    type="text"
                                    placeholder="Response Fr..."
                                    className={formik.touched.responseFr && Boolean(formik.errors.responseFr) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :
                                        'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}
                                    aria-describedby="responseFr"
                                    value={formik.values.responseFr}
                                    onChange={formik.handleChange}/>
                                <span className="text-xs text-red-700" id="responseFr">{formik.touched.responseFr && formik.errors.responseFr}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 ...">
                            <div className="p-5 text-gray-700">
                                <label className="block mb-1" htmlFor="questionEn">Question En</label>
                                <input
                                    id="questionEn"
                                    name="questionEn"
                                    type="text"
                                    placeholder="Question En..."
                                    className={formik.touched.questionEn && Boolean(formik.errors.questionEn) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :
                                        'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}
                                    aria-describedby="questionEn"
                                    value={formik.values.questionEn}
                                    onChange={formik.handleChange}/>
                                <span className="text-xs text-red-700" id="questionEn">{formik.touched.questionEn && formik.errors.questionEn}</span>
                            </div>
                        </td>
                        <td className="border border-slate-300 ...">
                            <div className="p-5 text-gray-700">
                                <label className="block mb-1" htmlFor="responseEn">Response En</label>
                                <input
                                    id="responseEn"
                                    name="responseEn"
                                    type="text"
                                    placeholder="Response En..."
                                    className={formik.touched.responseEn && Boolean(formik.errors.responseEn) ? 'w-full h-10 px-3 text-base placeholder-gray-600 border border-red-700 rounded-lg focus:shadow-outline' :
                                        'w-full h-10 px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}
                                    aria-describedby="responseEn"
                                    value={formik.values.responseEn}
                                    onChange={formik.handleChange}/>
                                <span className="text-xs text-red-700" id="responseEn">{formik.touched.responseEn && formik.errors.responseEn}</span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div className="flex flex-row-reverse ...">
                    <div>
                        <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                                type="submit">
                            Add new FAQ
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = ({faq}: IRootState) => ({
    loadingEntityFaq: faq.loadingEntity,
    entityFaq: faq.entity,
    addSuccessFaq: faq.addSuccess,
});

const mapDispatchToProps = {
    createEntityFaq
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FaqAddUpdate);