import React from 'react';
import {connect} from "react-redux";
import {useFormik} from "formik";
import {
    initialValuesAboutUsAddUpdate,
    validationSchemaAboutUsAddUpdaten
} from "./validation/validation-about-us-add-update";
import { createEntity as createEntityAboutUs } from '../../../shared/reducers/about-us.reducer';
import {IRootState} from "../../../shared/reducers";
import {useHistory} from "react-router";
import {ALL_APP_ROUTES} from "../../../core/config/all-app-routes";

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import EditorConvertToHTML from "../../../shared/components/editor-convert-to-html/EditorConvertToHTML";




const initialValues = initialValuesAboutUsAddUpdate;

export interface IAboutUsUpdateProps extends StateProps, DispatchProps {}

export const AboutUsAddUpdate = (props: IAboutUsUpdateProps) => {

    const history = useHistory();

    const {
        loadingEntityAbout,
        entityAbout,
        addSuccessAbout,
        createEntityAboutUs
    } = props;

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemaAboutUsAddUpdaten,
        onSubmit: values => {
            createEntityAboutUs(values);
        },
    });

    React.useEffect(() => {
        if(addSuccessAbout){
            history.push(ALL_APP_ROUTES.ABOUT_US.LIST);
        }
    }, [addSuccessAbout])


    const editorState = EditorState.createEmpty();

    const onEditorStateChangeAr = (editorState: any) => {
        formik.setFieldValue('contentAr', editorState);
    };
    const onEditorStateChangeFr = (editorState: any) => {
        formik.setFieldValue('contentFr', editorState);
    };
    const onEditorStateChangeEn = (editorState: any) => {
        formik.setFieldValue('contentEn', editorState);
    };

    return (
        <div className="rounded-2xl p-2 bg-white">
            <form onSubmit={formik.handleSubmit}>
                <h2>Create or edit a Faq</h2>

                <div className="flex flex-col w-full">
                    <div className="mb-5">
                        <EditorConvertToHTML callBackParent={onEditorStateChangeAr} placeholder="Write your content Ar"/>
                        <span className="text-xs text-red-700" id="questionAr">{formik.touched.contentAr && formik.errors.contentAr}</span>
                    </div>
                    <div className="mb-5">
                        <EditorConvertToHTML callBackParent={onEditorStateChangeFr} placeholder="Write your content Fr"/>
                        <span className="text-xs text-red-700" id="questionAr">{formik.touched.contentFr && formik.errors.contentFr}</span>
                    </div>
                    <div className="mb-5">
                        <EditorConvertToHTML callBackParent={onEditorStateChangeEn} placeholder="Write your content En"/>
                        <span className="text-xs text-red-700" id="questionAr">{formik.touched.contentEn && formik.errors.contentEn}</span>
                    </div>
                </div>

                <div className="flex flex-row-reverse ...">
                    <div>
                        <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                                type="submit">
                            Add new AboutUs
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = ({aboutUs}: IRootState) => ({
    loadingEntityAbout: aboutUs.loadingEntity,
    entityAbout: aboutUs.entity,
    addSuccessAbout: aboutUs.addSuccess,
});

const mapDispatchToProps = {
    createEntityAboutUs
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsAddUpdate);