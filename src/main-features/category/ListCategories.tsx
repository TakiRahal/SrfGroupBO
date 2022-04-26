import React from 'react';
import {useHistory} from "react-router";
import {ALL_APP_ROUTES} from "../../core/config/all-app-routes";
import {connect} from "react-redux";
import {IRootState} from "../../shared/reducers";
import {
    getPublicEntities, importEntities, reset as resetCategory,
} from "../../shared/reducers/category.reducer";
import {ICategory} from "../../shared/model/category.model";
import {Button} from "primereact/button";


export interface IListCategoriesProps extends StateProps, DispatchProps{}

export const ListCategories = (props: IListCategoriesProps) => {
    const [showModal, setShowModal] = React.useState(false);
    const history = useHistory();

    const redirectTo = (path: string) => {
        history.push(path);
    }

    React.useEffect(() => {
        props.resetCategory();
        props.getPublicEntities(0, 1, '');
    }, [])

    React.useEffect(() => {
        console.log('props.importSuccess ', props.importSuccess);
        if(props.importSuccess){
            props.resetCategory();
            props.getPublicEntities(0, 1, '');
        }
    }, [props.importSuccess])

    const importCategories = () => {
        props.importEntities();
    }

    return (
        <div>
            <div className="flex">
                <div className="flex-1">
                    List of categories
                </div>
                <div className="">
                    <Button label="Import " className="p-button-success" icon="pi pi-check" onClick={() => importCategories()}/>
                    <Button label="Add new Category" className="p-button-link" onClick={() => redirectTo(ALL_APP_ROUTES.CATEGORY.ADD_UPDATE)}/>
                </div>
            </div>

            <table className="border-collapse border border-slate-400 w-full">
                <thead className="bg-gray-200">
                <tr>
                    <th className="border border-slate-300">ID</th>
                    <th className="border border-slate-300">Title Ar</th>
                    <th className="border border-slate-300">Title Fr</th>
                    <th className="border border-slate-300">Title En</th>
                    <th className="border border-slate-300">Actioins</th>
                </tr>
                </thead>

                {
                    props.entitiesCategory.map((category: ICategory, i) => (
                        <tbody className="bg-white" key={`entity-${i}`}>
                            <tr >
                                <td className="border border-slate-100">{category.id}</td>
                                <td className="border border-slate-100">{category.titleAr}</td>
                                <td className="border border-slate-100">{category.titleFr}</td>
                                <td className="border border-slate-100">{category.titleEn}</td>
                                <td className="border border-slate-100">
                                    <button className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white mx-2"
                                            onClick={() => redirectTo(ALL_APP_ROUTES.CATEGORY.ADD_UPDATE+'/'+category.id+'/edit')}>Edit</button>
                                    <button className="px-6 py-2 rounded bg-rose-400 hover:bg-rose-500 text-rose-100"
                                            onClick={() => setShowModal(true)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    ))
                }

            </table>

        </div>
    );
}


const mapStateToProps = ({category}: IRootState) => ({
    loadingEntitiesCategory: category.loadingEntities,
    entitiesCategory: category.entities,
    totalItemsCategory: category.totalItems,
    importSuccess: category.importSuccess
});

const mapDispatchToProps = {
    getPublicEntities,
    resetCategory,
    importEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories);