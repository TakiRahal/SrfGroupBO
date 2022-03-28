import React from 'react';
import {connect} from "react-redux";
import {IRootState} from "../../shared/reducers";
import {ALL_APP_ROUTES} from "../../core/config/all-app-routes";
import {useHistory} from "react-router";
import {IDescriptionAddOffer} from "../../shared/model/description-add-offer.model";
import {getEntities} from "../../shared/reducers/description-add-offer.reducer";

export interface IDescriptionAddOfferProps extends StateProps, DispatchProps{}

export const ListDescriptionAddOffer = (props: IDescriptionAddOfferProps) => {

    const history = useHistory();

    const redirectTo = (path: string) => {
        history.push(path);
    }

    React.useEffect(() => {
        props.getEntities(0, 20, '');
    }, [])

    const getContent = (content?: string | null | undefined): string =>{
        return content || '';
    }
    return (
        <div>
            <div className="flex">
                <div className="flex-1">
                    List of categories
                </div>
                <div className="">
                    <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                            onClick={() => redirectTo(ALL_APP_ROUTES.OFFER.DESCRIPTION_ADD_OFFER.ADD)}>
                        Add new Description Offer
                    </button>
                </div>
            </div>

            <table className="border-collapse border border-slate-400 w-full">
                <thead className="bg-gray-200">
                <tr>
                    <th>#</th>
                    <th className="border border-slate-300">ID</th>
                    <th className="border border-slate-300">descriptionAr</th>
                    <th className="border border-slate-300">descriptionFr</th>
                    <th className="border border-slate-300">descriptionEn</th>
                </tr>
                </thead>

                {
                    props.entitiesDescription.map((description: IDescriptionAddOffer, i) => (
                        <tbody className="bg-white" key={`entity-${i}`}>
                            <tr >
                                <td className="border border-slate-100">Ar</td>
                                <td className="border border-slate-100">{description.id}</td>
                                <td className="border border-slate-100"><div dangerouslySetInnerHTML={{ __html: getContent(description?.descriptionAr) }}></div></td>
                                <td className="border border-slate-100"><div dangerouslySetInnerHTML={{ __html: getContent(description?.descriptionFr) }}></div></td>
                                <td className="border border-slate-100"><div dangerouslySetInnerHTML={{ __html: getContent(description?.descriptionEn) }}></div></td>
                                <td className="border border-slate-100">
                                    <button className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white mx-2">Edit</button>
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


const mapStateToProps = ({descriptionAddOffer}: IRootState) => ({
    loadingEntitiesDescription: descriptionAddOffer.loadingEntities,
    entitiesDescription: descriptionAddOffer.entities
});

const mapDispatchToProps = {
    getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListDescriptionAddOffer);