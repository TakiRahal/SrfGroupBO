import React from 'react';
import {connect} from "react-redux";
import {IRootState} from "../../shared/reducers";
import {Button} from "primereact/button";
import {getEntities, importEntities, reset} from "../../shared/reducers/address.reducer";
import {IAddress} from "../../shared/model/address.model";


export interface IListAddressProps extends StateProps, DispatchProps{}

export const ListAddress = (props: IListAddressProps) => {

    React.useEffect(() => {
        props.reset();
        props.getEntities(0, 100, '');
    }, [])

    React.useEffect(() => {
        if(props.importSuccess){
            props.reset();
            props.getEntities(0, 100, '');
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
                    {/*<Button label="Add new Category" className="p-button-link" onClick={() => redirectTo(ALL_APP_ROUTES.CATEGORY.ADD_UPDATE)}/>*/}
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
                    props.entitiesAddress.map((address: IAddress, i) => (
                        <tbody className="bg-white" key={`entity-${i}`}>
                        <tr >
                            <td className="border border-slate-100">{address.id}</td>
                            <td className="border border-slate-100">{address.city}</td>
                            <td className="border border-slate-100">{address.country}</td>
                            <td className="border border-slate-100">{address.admin_name}</td>
                            <td className="border border-slate-100">
                                <button className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white mx-2" >Edit</button>
                                <button className="px-6 py-2 rounded bg-rose-400 hover:bg-rose-500 text-rose-100" >Delete</button>
                            </td>
                        </tr>
                        </tbody>
                    ))
                }

            </table>

        </div>
    );
}


const mapStateToProps = ({address}: IRootState) => ({
    loadingEntitiesAddress: address.loadingEntities,
    entitiesAddress: address.entities,
    // totalItemsCategory: address.totalItems,
    importSuccess: address.importSuccess
});

const mapDispatchToProps = {
    getEntities,
    importEntities,
    reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListAddress);