import React from 'react';
import {ALL_APP_ROUTES} from "../../../core/config/all-app-routes";
import {useHistory} from "react-router";
import {IFaq} from "../../../shared/model/faq.model";
import {getEntities as getEntitiesAboutUs} from "../../../shared/reducers/about-us.reducer";
import {IRootState} from "../../../shared/reducers";
import {connect} from "react-redux";
import {IAboutUs} from "../../../shared/model/about-us.model";


export interface IAboutUsListProps extends StateProps, DispatchProps {}

export const AboutUsList = (props: IAboutUsListProps) => {

    const history = useHistory();

    const {
        loadingEntitiesAbout,
        entitiesAbout,
        getEntitiesAboutUs
    } = props;

    React.useEffect(() => {
        getEntitiesAboutUs(1, 20, '');
    }, [])

    const redirectToAddUpdate = () =>{
        history.push(ALL_APP_ROUTES.ABOUT_US.ADD_UPDATE);
    }

    return (
        <div className="rounded-2xl">

            <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                    type="submit"
                    onClick={redirectToAddUpdate}>
                Add new About Us
            </button>

            <table className="border-collapse border border-slate-400 w-full">
                <thead className="bg-gray-200">
                <tr>
                    <th className="border border-slate-300">ID</th>
                    <th className="border border-slate-300">Content AR</th>
                    <th className="border border-slate-300">Content FR</th>
                    <th className="border border-slate-300">Content EN</th>
                    <th className="border border-slate-300">Action</th>
                </tr>
                </thead>
                <tbody className="bg-white">

                    {
                        entitiesAbout.map((aboutUs: IAboutUs, i) => (
                            <tr  key={`entity-${i}`}>
                                <td className="border border-slate-100">{aboutUs.id}</td>
                                <td className="border border-slate-100">{aboutUs.contentAr}</td>
                                <td className="border border-slate-100">{aboutUs.contentFr}</td>
                                <td className="border border-slate-100">{aboutUs.contentEn}</td>
                                <td className="border border-slate-100">Edit / Delete</td>
                            </tr>
                        ))
                    }


                </tbody>


            </table>

        </div>
    );
}

const mapStateToProps = ({aboutUs}: IRootState) => ({
    loadingEntitiesAbout: aboutUs.loadingEntity,
    entitiesAbout: aboutUs.entities,
});

const mapDispatchToProps = {
    getEntitiesAboutUs
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AboutUsList);