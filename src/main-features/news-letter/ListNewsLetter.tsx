import React from 'react';
import {connect} from "react-redux";
import {IRootState} from "../../shared/reducers";
import {getEntities} from "../../shared/reducers/news-letter.reducer";
import {INewsLetter} from "../../shared/reducers/news-letter.reducer";


export interface IListNewsLetterProps extends StateProps, DispatchProps{}

export const ListNewsLetter = (props: IListNewsLetterProps) => {

    React.useEffect(() => {
        props.getEntities(0, 20, '');
    }, [])

    return (
        <div>
            <div className="flex">
                <div className="flex-1">
                    List of News Letter
                </div>
            </div>

            <table className="border-collapse border border-slate-400 w-full">
                <thead className="bg-gray-200">
                <tr>
                    <th>#</th>
                    <th className="border border-slate-300">ID</th>
                    <th className="border border-slate-300">email</th>
                </tr>
                </thead>

                {
                    props.entitiesNewsLetter.map((news: INewsLetter, i) => (
                        <tbody className="bg-white" key={`entity-${i}`}>
                        <tr >
                            <td className="border border-slate-100">Ar</td>
                            <td className="border border-slate-100">{news.id}</td>
                            <td className="border border-slate-100">{news.email}</td>
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


const mapStateToProps = ({newsLetter}: IRootState) => ({
    loadingEntitiesNewsLetter: newsLetter.loadingEntities,
    entitiesNewsLetter: newsLetter.entities
});

const mapDispatchToProps = {
    getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ListNewsLetter);