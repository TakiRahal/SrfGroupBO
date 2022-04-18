import React from 'react';
import {ALL_APP_ROUTES} from "../../core/config/all-app-routes";
import {useHistory} from "react-router";
import {IRootState} from "../../shared/reducers";
import {connect} from "react-redux";
import {getEntities} from "../../shared/reducers/post-home-feature.reducer";
import {ITopHomeSlidesImages} from "../../shared/model/top-home-slides-images.model";
import {IPostHomeFeature} from "../../shared/model/post-home-feature.model";

export interface IPostHomeFeatureProps extends StateProps, DispatchProps{}

export const ListPostHomeFeature = (props: IPostHomeFeatureProps) => {

    const history = useHistory();

    React.useEffect(() => {
        props.getEntities();
    }, [])

    const redirectToAddUpdate = () =>{
        history.push(ALL_APP_ROUTES.HOME.POST_HOME_FEATURE.ADD_UPDATE);
    }

    const edit = (postHomeFeature: IPostHomeFeature) => {
        history.push(ALL_APP_ROUTES.HOME.POST_HOME_FEATURE.ADD_UPDATE +'/'+postHomeFeature.id+'/edit');
    }

    return(
        <div className="rounded-2xl">

            <div className="flex">
                <div className="flex-1">
                    List of ostHomeFeature
                </div>
                <div className="">
                    <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                            onClick={redirectToAddUpdate}>
                        Add new PostHomeFeature
                    </button>
                </div>
            </div>

            <table className="border-collapse border border-slate-400 w-full">
                <thead className="bg-gray-200">
                <tr>
                    <th className="border border-slate-300">ID</th>
                    <th className="border border-slate-300">descriptionAr</th>
                    <th className="border border-slate-300">descriptionFr</th>
                    <th className="border border-slate-300">descriptionEn</th>
                    <th className="border border-slate-300">Image</th>
                    <th className="border border-slate-300">Actions</th>
                </tr>
                </thead>

                {
                    props.entities.map((topHomeSlides: ITopHomeSlidesImages, i) => (
                        <tbody className="bg-white" key={`entity-${i}`}>
                        <tr >
                            <td className="border border-slate-100">{topHomeSlides.id}</td>
                            <td className="border border-slate-100"><div dangerouslySetInnerHTML={{ __html: topHomeSlides.descriptionAr || '' }}></div></td>
                            <td className="border border-slate-100"><div dangerouslySetInnerHTML={{ __html: topHomeSlides.descriptionFr || '' }}></div></td>
                            <td className="border border-slate-100"><div dangerouslySetInnerHTML={{ __html: topHomeSlides.descriptionEn || '' }}></div></td>
                            <td className="border border-slate-100">
                                {
                                    topHomeSlides.image ? <img src={topHomeSlides.image} width={250} height={250}/> : null
                                }
                            </td>
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


const mapStateToProps = ({postHomeFeature}: IRootState) => ({
    entities: postHomeFeature.entities,
});

const mapDispatchToProps = {
    getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListPostHomeFeature);