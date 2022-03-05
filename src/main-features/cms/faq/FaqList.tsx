import React from 'react';
import {useHistory} from "react-router";
import {ALL_APP_ROUTES} from "../../../core/config/all-app-routes";
import {IRootState} from "../../../shared/reducers";
import {connect} from "react-redux";
import { getEntities as getEntitiesFaq } from '../../../shared/reducers/faq.reducer';
import {IFaq} from "../../../shared/model/faq.model";


export interface IFaqProps extends StateProps, DispatchProps {}

export const Faq = (props: IFaqProps) => {

    const history = useHistory();

    const { getEntitiesFaq,
        loadingEntitiesFaq,
        entitiesFaq
    } = props;

    const redirectToAddUpdate = () =>{
        history.push(ALL_APP_ROUTES.FAQ.ADD_UPDATE);
    }

    React.useEffect(() => {
        getEntitiesFaq(1, 20, '');
    }, [])

    return (
        <div className="rounded-2xl">

            <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                    type="submit"
            onClick={redirectToAddUpdate}>
                Add new FAQ
            </button>

            <table className="border-collapse border border-slate-400 w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th>#</th>
                        <th className="border border-slate-300">ID</th>
                        <th className="border border-slate-300">Question</th>
                        <th className="border border-slate-300">Response</th>
                        <th className="border border-slate-300">Actions</th>
                    </tr>
                </thead>

                {
                    entitiesFaq.map((faq: IFaq, i) => (
                        <tbody className="bg-white" key={`entity-${i}`}>
                            <tr >
                                <td className="border border-slate-100">Ar</td>
                                <td className="border border-slate-100">{faq.id}</td>
                                <td className="border border-slate-100">{faq.questionAr}</td>
                                <td className="border border-slate-100">{faq.responseAr}</td>
                                <td className="border border-slate-100">Edit / Delete</td>
                            </tr>
                            <tr>
                                <td className="border border-slate-100">Fr</td>
                                <td className="border border-slate-100">{faq.id}</td>
                                <td className="border border-slate-100">{faq.questionFr}</td>
                                <td className="border border-slate-100">{faq.responseFr}</td>
                                <td className="border border-slate-100">Edit / Delete</td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300">En</td>
                                <td className="border border-slate-300">{faq.id}</td>
                                <td className="border border-slate-100">{faq.questionEn}</td>
                                <td className="border border-slate-100">{faq.responseEn}</td>
                                <td className="border border-slate-300">Edit / Delete</td>
                            </tr>

                        </tbody>
                    ))
                }

            </table>
        </div>
    );
}

const mapStateToProps = ({ faq }: IRootState) => ({
    loadingEntitiesFaq: faq.loadingEntities,
    entitiesFaq: faq.entities,
});

const mapDispatchToProps = {
    getEntitiesFaq
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Faq);