import React from 'react';
import {IRootState} from "../../shared/reducers";
import {connect} from "react-redux";
import isEmpty from 'lodash/isEmpty'
import {useFormik} from "formik";
import {initialValuesTopHomeSlidesImage, validationSchemaTopHomeSlidesImage} from "./validation/validation-home";
import {dataUrlToFile, getBase64} from "../../shared/utils/utils-functions";
import {getImageUrl} from "../../shared/utils/image-url";
import {reset, getEntity, createEntity} from "../../shared/reducers/top-home-slides-image";
import {useHistory, useParams} from "react-router";
import {ALL_APP_ROUTES} from "../../core/config/all-app-routes";
import {CustomSunEditor} from "../../shared/components/sun-editor/CustomSunEditor";

const initialValues = initialValuesTopHomeSlidesImage;

export interface IAddUpdateTopHomeSlidesImageProps extends StateProps, DispatchProps{}

export const AddUpdateTopHomeSlidesImage = (props: IAddUpdateTopHomeSlidesImageProps) => {

    const [fileState, setFileState] = React.useState('');
    const [imageUpload, setImageUpload] = React.useState<any>(null);

    const history = useHistory();

    const {id} = useParams<{ id: string }>();

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemaTopHomeSlidesImage,
        onSubmit: values => {
            const entity = {
                ...values,
                image: fileState,
            }
            console.log('entity ', entity);
            props.createEntity(entity);
        },
    });

    const selectFile = (event: any) => {
        getBase64(event.target.files[0])
            .then((result: any) => {
                dataUrlToFile(result, event.target.files[0].name)
                    .then((value: any) => {
                        setImageUpload(value);
                    })
                console.log(result);
                setFileState(result);
            });
    };

    React.useEffect(() => {
        console.log('id = ', id);
        if(id){
            props.getEntity(Number(id));
        }
    }, [id])

    React.useEffect(() => {
        if(!isEmpty(props.entity)){
            console.log('props.entity ', props.entity);
            formik.setFieldValue('descriptionAr', props.entity.descriptionAr);
            formik.setFieldValue('descriptionFr', props.entity.descriptionFr);
            formik.setFieldValue('descriptionEn', props.entity.descriptionEn);
            setFileState(props.entity.image || '');
        }
    }, [props.entity])

    React.useEffect(() => {
        if(props.addSuccess){
            props.reset();
            history.push(ALL_APP_ROUTES.HOME.TOPHOMESLIDESIMAGE.LIST);
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

    return(
        <div>

            <div className="mb-5">
                <div className="p-5 text-gray-700">
                    <label className="block mb-1" htmlFor="responseAr">Image</label>
                    <input
                        id="descriptionAr"
                        name="descriptionAr"
                        type="file"
                        placeholder="descriptionAr..."
                        className={'w-full px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline'}
                        aria-describedby="responseAr"
                        onChange={selectFile}/>
                    <span className="text-xs text-red-700" id="responseAr">aze</span>
                </div>

                <div>
                    <img src={fileState} width={250} height={250}/>
                </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <table className="border-collapse border border-slate-400 w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-slate-300 p-3" colSpan={3}>Inputs</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                    <tr>
                        <td className="border border-slate-300 ...">
                            <div className="p-5 text-gray-700">
                                <label className="block mb-1" htmlFor="descriptionAr">descriptionAr</label>
                                <CustomSunEditor defaultValue={props.entity.descriptionAr || ''} callbcakHandleChange={onEditorStateChangeAr}/>
                                <span className="text-xs text-red-700" id="descriptionAr">{formik.touched.descriptionAr && formik.errors.descriptionAr}</span>
                            </div>
                        </td>

                        <td className="border border-slate-300 ...">
                            <div className="p-5 text-gray-700">
                                <label className="block mb-1" htmlFor="descriptionFr">descriptionFr</label>
                                <CustomSunEditor defaultValue={props.entity.descriptionFr || ''} callbcakHandleChange={onEditorStateChangeFr}/>
                                <span className="text-xs text-red-700" id="descriptionFr">{formik.touched.descriptionFr && formik.errors.descriptionFr}</span>
                            </div>
                        </td>

                        <td className="border border-slate-300 ...">
                            <div className="p-5 text-gray-700">
                                <label className="block mb-1" htmlFor="descriptionEn">descriptionEn</label>
                                <CustomSunEditor defaultValue={props.entity.descriptionEn || ''} callbcakHandleChange={onEditorStateChangeEn}/>
                                <span className="text-xs text-red-700" id="descriptionEn">{formik.touched.descriptionEn && formik.errors.descriptionEn}</span>
                            </div>
                        </td>
                    </tr>

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



const mapStateToProps = ({topHomeSlidesImages}: IRootState) => ({
    loadingEntity: topHomeSlidesImages.loadingEntity,
    entity: topHomeSlidesImages.entity,
    addSuccess: topHomeSlidesImages.addSuccess,
});

const mapDispatchToProps = {
    createEntity,
    getEntity,
    reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateTopHomeSlidesImage);