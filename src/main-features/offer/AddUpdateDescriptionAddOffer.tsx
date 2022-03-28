import React from 'react';
import {getPublicEntities, reset as resetCategory} from "../../shared/reducers/category.reducer";
import {ListCategories} from "../category/ListCategories";
import {connect} from "react-redux";
import {IRootState} from "../../shared/reducers";

export interface IDescriptionAddOfferProps extends StateProps, DispatchProps{}

export const AddUpdateDescriptionAddOffer = (props: IDescriptionAddOfferProps) => {
    return (
        <div>cccc</div>
    );
}


const mapStateToProps = ({category}: IRootState) => ({

});

const mapDispatchToProps = {
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddUpdateDescriptionAddOffer);