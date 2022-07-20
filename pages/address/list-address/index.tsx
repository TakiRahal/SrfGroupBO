import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {entitiesAddress, fetchAddress, importAddress, importSuccessAddress, resetAddress} from "../../../src/store/address/slice";
import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";
import {Button} from "primereact/button";
import Footer from "../../../components/Footer";

export default function ListAddress(){

    const dispatch = useDispatch();

    const entitiesAddressSelector = useSelector(entitiesAddress) ?? [];
    const importSuccessAddressSelector = useSelector(importSuccessAddress) ?? false;

    React.useEffect(() => {
        dispatch(resetAddress({}));
        dispatch(fetchAddress({
            page: 0,
            size: 150,
            queryParams: ''
        }));
    }, [])

    React.useEffect(() => {
        if(importSuccessAddressSelector){
            dispatch(resetAddress({}));
            dispatch(fetchAddress({
                page: 0,
                size: 150,
                queryParams: ''
            }));
        }
    }, [importSuccessAddressSelector])

    const importCategories = () => {
        dispatch(importAddress({}));
    }

    return (
        <div>

            <SideBar />
            <Header />
            <main className="container-main">
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
                        entitiesAddressSelector.map((address: any, i: number) => (
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
            </main>
            <Footer />
        </div>
    )
}
