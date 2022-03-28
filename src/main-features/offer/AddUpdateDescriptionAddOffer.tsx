import React from 'react';
import {connect} from "react-redux";
import {IRootState} from "../../shared/reducers";
import {CustomSunEditor} from "../../shared/components/sun-editor/CustomSunEditor";
import {useFormik} from "formik";
import {
    initialValuesAddUpdateDescriptionAddOffer,
    validationSchemaAddUpdateDescriptionAddOffer
} from "./validation/initial-values-add-update-descriptionadd-offer";
import {reset, createEntity} from "../../shared/reducers/description-add-offer.reducer";
import {useHistory} from "react-router";
import {ALL_APP_ROUTES} from "../../core/config/all-app-routes";

const initialValues = initialValuesAddUpdateDescriptionAddOffer;

export interface IDescriptionAddOfferProps extends StateProps, DispatchProps{}

export const AddUpdateDescriptionAddOffer = (props: IDescriptionAddOfferProps) => {

    const history = useHistory();

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemaAddUpdateDescriptionAddOffer,
        onSubmit: values => {
            console.log('values ', values);
            props.createEntity(values);
        },
    });

    React.useEffect(() => {
        console.log('addSuccess ', props.addSuccess);
        if(props.addSuccess){
            props.reset();
            history.push(ALL_APP_ROUTES.OFFER.DESCRIPTION_ADD_OFFER.LIST);
        }
    }, [props.addSuccess])

    const onEditorStateChangeAr = (editorState: any) => {
        formik.setFieldValue('descriptionAr', editorState);
    };
    const onEditorStateChangeFr = (editorState: any) => {
        formik.setFieldValue('descriptionFr', editorState);
    };
    const onEditorStateChangeEn = (editorState: any) => {
        formik.setFieldValue('descriptionEn', editorState);
    };

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h2>Create or edit a Description AddOffer</h2>
                <div className="flex flex-col w-full">
                    <div className="mb-5">
                        <CustomSunEditor defaultValue='' callbcakHandleChange={onEditorStateChangeAr}/>
                        <span className="text-xs text-red-700" id="descriptionAr">{formik.touched.descriptionAr && formik.errors.descriptionAr}</span>
                    </div>
                    <div className="mb-5">
                        <CustomSunEditor defaultValue='' callbcakHandleChange={onEditorStateChangeFr}/>
                        <span className="text-xs text-red-700" id="descriptionFr">{formik.touched.descriptionFr && formik.errors.descriptionFr}</span>
                    </div>
                    <div className="mb-5">
                        <CustomSunEditor defaultValue='' callbcakHandleChange={onEditorStateChangeEn}/>
                        <span className="text-xs text-red-700" id="descriptionEn">{formik.touched.descriptionEn && formik.errors.descriptionEn}</span>
                    </div>
                </div>

                <div className="flex flex-row-reverse ...">
                    <div>
                        <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                                type="submit">
                            Add new Description
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}


const mapStateToProps = ({descriptionAddOffer}: IRootState) => ({
    addSuccess: descriptionAddOffer.addSuccess
});

const mapDispatchToProps = {
    createEntity,
    reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateDescriptionAddOffer);