import React from 'react';
import {getPublicEntities, reset as resetCategory} from "../../shared/reducers/category.reducer";
import {ListCategories} from "../category/ListCategories";
import {connect} from "react-redux";
import {IRootState} from "../../shared/reducers";
import {ICategory} from "../../shared/model/category.model";
import {ALL_APP_ROUTES} from "../../core/config/all-app-routes";
import {useHistory} from "react-router";

export interface IDescriptionAddOfferProps extends StateProps, DispatchProps{}

export const ListDescriptionAddOffer = (props: IDescriptionAddOfferProps) => {

    const history = useHistory();

    const redirectTo = (path: string) => {
        history.push(path);
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



        </div>
    );
}


const mapStateToProps = ({category}: IRootState) => ({

});

const mapDispatchToProps = {
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListDescriptionAddOffer);