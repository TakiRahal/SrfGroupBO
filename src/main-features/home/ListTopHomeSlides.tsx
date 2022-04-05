import React from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router";
import {ALL_APP_ROUTES} from "../../core/config/all-app-routes";
import {getEntities} from "../../shared/reducers/top-home-slides";
import {IRootState} from "../../shared/reducers";
import {ITopHomeSlides} from "../../shared/model/top-home-slides.model";
import {getImageUrl} from "../../shared/utils/image-url";
import {dataUrlToFile} from "../../shared/utils/utils-functions";
import {createEntity} from "../../shared/reducers/top-home-slides-image";

export interface ITopHomeSlidesImageProps extends StateProps, DispatchProps{}

export const ListTopHomeSlides = (props: ITopHomeSlidesImageProps) => {

    const [fileState, setFileState] = React.useState('');
    const [imageUpload, setImageUpload] = React.useState<any>(null);

    const history = useHistory();

    const redirectToAddUpdate = () =>{
        history.push(ALL_APP_ROUTES.HOME.TOPHOMESLIDES.ADD_UPDATE);
    }

    React.useEffect(() => {
        props.getEntities();
    }, [])

    const edit = (topHomeSlides: ITopHomeSlides) => {
        history.push(ALL_APP_ROUTES.HOME.TOPHOMESLIDES.ADD_UPDATE +'/'+topHomeSlides.id+'/edit');
    }

    const selectFile = (event: any) => {
        getImageUrl(event.target.files[0], 500)
            .then((result: any) => {
                dataUrlToFile(result, event.target.files[0].name)
                    .then((value: any) => {
                        setImageUpload(value);
                    })
                setFileState(result);
            });
    };

    const submit = () => {
        if(imageUpload && imageUpload.name){
            const entity = {
                image: fileState,
                // topHomeSlides: props.entities.slice()
            }
            console.log('entity ', entity);
            props.createEntity(entity);
        }
        else{
            alert('No image found');
        }
    }

    return(
        <div className="rounded-2xl">


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
                <div className="flex flex-row-reverse ...">
                    <div>
                        <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                                type="button"
                                onClick={submit}>
                            Add new TopHomeSlidesImage
                        </button>
                    </div>
                </div>
            </div>
            <hr /><br /><br /><br /><br />
            <div className="flex">
                <div className="flex-1">
                    List of ListTopHomeSlides
                </div>
                <div className="">
                    <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                            onClick={redirectToAddUpdate}>
                        Add new ListTopHomeSlides
                    </button>
                </div>
            </div>

            <table className="border-collapse border border-slate-400 w-full">
                <thead className="bg-gray-200">
                <tr>
                    <th>#</th>
                    <th className="border border-slate-300">ID</th>
                    <th className="border border-slate-300">titleAr</th>
                    <th className="border border-slate-300">titleFr</th>
                    <th className="border border-slate-300">titleEn</th>
                    <th className="border border-slate-300">subTitleAr</th>
                    <th className="border border-slate-300">subTitleFr</th>
                    <th className="border border-slate-300">subTitleEn</th>
                    <th className="border border-slate-300">descriptionAr</th>
                    <th className="border border-slate-300">descriptionFr</th>
                    <th className="border border-slate-300">descriptionEn</th>
                </tr>
                </thead>

                {
                    props.entities.map((topHomeSlides: ITopHomeSlides, i) => (
                        <tbody className="bg-white" key={`entity-${i}`}>
                            <tr >
                                <td className="border border-slate-100">Ar</td>
                                <td className="border border-slate-100">{topHomeSlides.id}</td>
                                <td className="border border-slate-100">{topHomeSlides.titleAr}</td>
                                <td className="border border-slate-100">{topHomeSlides.titleFr}</td>
                                <td className="border border-slate-100">{topHomeSlides.titleEn}</td>
                                <td className="border border-slate-100">{topHomeSlides.subTitleAr}</td>
                                <td className="border border-slate-100">{topHomeSlides.subTitleFr}</td>
                                <td className="border border-slate-100">{topHomeSlides.subTitleEn}</td>
                                <td className="border border-slate-100">{topHomeSlides.descriptionAr}</td>
                                <td className="border border-slate-100">{topHomeSlides.descriptionFr}</td>
                                <td className="border border-slate-100">{topHomeSlides.descriptionEn}</td>
                                <td className="border border-slate-100">
                                    <button className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white mx-2"
                                    onClick={() => edit(topHomeSlides)}>Edit</button>
                                    <button className="px-6 py-2 rounded bg-rose-400 hover:bg-rose-500 text-rose-100">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    ))
                }

            </table>

        </div>
    );
}



const mapStateToProps = ({topHomeSlides, topHomeSlidesImages}: IRootState) => ({
    entities: topHomeSlides.entities,

    entity: topHomeSlidesImages.entity,
    addSuccessTopHomeSlidesImages: topHomeSlidesImages.addSuccess,
    loadingEntityTopHomeSlidesImages: topHomeSlidesImages.loadingEntity
});

const mapDispatchToProps = {
    getEntities,
    createEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListTopHomeSlides);