import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {entitiesAboutUs, fetchAboutUs} from "../../src/store/about-us/slice";
import {useRouter} from "next/router";


export default function AboutUs(){

    const dispatch = useDispatch();
    const router = useRouter();

    const entitiesAboutUsSelector = useSelector(entitiesAboutUs) ?? [];

    React.useEffect(() => {
        dispatch(fetchAboutUs({
            page: 0,
            size: 20,
            queryParams: ''
        }));
    }, [])

    const redirectToAddUpdate = () =>{
        router.push('/about-us/add-update');
    }

    return (
        <div>
            <SideBar />
            <Header />
            <main className="container-main">
                <div className="flex">
                    <div className="flex-1">
                        List of about us
                    </div>
                    <div className="">
                        <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                        onClick={redirectToAddUpdate}>
                            Add new AboutUs
                        </button>
                    </div>
                </div>

                <table className="border-collapse border border-slate-400 w-full">
                    <thead className="bg-gray-200">
                    <tr>
                        <th>#</th>
                        <th className="border border-slate-300">ID</th>
                        <th className="border border-slate-300">contentAr</th>
                        <th className="border border-slate-300">contentFr</th>
                        <th className="border border-slate-300">contentEn</th>
                    </tr>
                    </thead>

                    {
                        entitiesAboutUsSelector.map((aboutUs: any, index: number) => (
                            <tbody className="bg-white" key={`entity-${index}`}>
                            <tr >
                                <td className="border border-slate-100">Ar</td>
                                <td className="border border-slate-100">{aboutUs.id}</td>
                                <td className="border border-slate-100">{aboutUs.contentAr}</td>
                                <td className="border border-slate-100">{aboutUs.contentFr}</td>
                                <td className="border border-slate-100">{aboutUs.contentEn}</td>
                                <td className="border border-slate-100">
                                    <button className="px-6 py-2 rounded bg-rose-400 hover:bg-rose-500 text-rose-100">Delete</button>
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
