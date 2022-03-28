import React from 'react';
import {getEntities } from "../../../shared/reducers/contact-us.reducer";
import {connect} from "react-redux";
import {IRootState} from "../../../shared/reducers";
import {IContactUs} from "../../../shared/model/contact-us.model";
import {ALL_APP_ROUTES} from "../../../core/config/all-app-routes";


export interface IContactUsProps extends StateProps, DispatchProps {}

export const ContactUsList = (props: IContactUsProps) => {

    React.useEffect(() => {
        props.getEntities(0, 20, '');
    }, [])

    return(
        <div>
            <div className="flex">
                <div className="flex-1">
                    List of contact us
                </div>
                <div className="">
                    <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                            >
                        Add new ContactUs
                    </button>
                </div>
            </div>

            <table className="border-collapse border border-slate-400 w-full">
                <thead className="bg-gray-200">
                <tr>
                    <th>#</th>
                    <th className="border border-slate-300">ID</th>
                    <th className="border border-slate-300">name</th>
                    <th className="border border-slate-300">email</th>
                    <th className="border border-slate-300">subject</th>
                    <th className="border border-slate-300">message</th>
                    <th className="border border-slate-300">Actions</th>
                </tr>
                </thead>

                {
                    props.entitiesContactUs.map((contactUs: IContactUs, index: number) => (
                        <tbody className="bg-white" key={`entity-${index}`}>
                            <tr >
                                <td className="border border-slate-100">Ar</td>
                                <td className="border border-slate-100">{contactUs.id}</td>
                                <td className="border border-slate-100">{contactUs.name}</td>
                                <td className="border border-slate-100">{contactUs.email}</td>
                                <td className="border border-slate-100">{contactUs.subject}</td>
                                <td className="border border-slate-100">{contactUs.message}</td>
                                <td className="border border-slate-100">
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

const mapStateToProps = ({ contactUs }: IRootState) => ({
    loadingEntitiesContactUs: contactUs.loadingEntities,
    entitiesContactUs: contactUs.entities,
});

const mapDispatchToProps = {
    getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsList);