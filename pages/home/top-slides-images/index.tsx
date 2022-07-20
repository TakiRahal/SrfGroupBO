import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";
import {Button} from "primereact/button";
import Footer from "../../../components/Footer";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {entitiesTopSlides, fetchTopSlides} from "../../../src/store/home/slice";
import {useRouter} from "next/router";


export default function TopSlidesImages(){

    const dispatch = useDispatch();
    const router = useRouter();

    const entitiesTopSlidesSelector = useSelector(entitiesTopSlides) ?? [];

    React.useEffect(() => {
        dispatch(fetchTopSlides({}));
    }, [])

    const redirectToAddUpdate = () =>{
        router.push('/home/top-slides-images/add-top-slides-images');
        // history.push(ALL_APP_ROUTES.HOME.TOPHOMESLIDESIMAGE.ADD_UPDATE);
    }

    const edit = (topHomeSlidesImages: any) => {
        // history.push(ALL_APP_ROUTES.HOME.TOPHOMESLIDESIMAGE.ADD_UPDATE +'/'+topHomeSlidesImages.id+'/edit');
    }

    return (
        <div>
            <SideBar />
            <Header />
            <main className="container-main">
                <div className="flex">
                    <div className="flex-1">
                        List of TopHomeSlidesImage
                    </div>
                    <div className="">
                        <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                                onClick={redirectToAddUpdate}>
                            Add new TopHomeSlidesImage
                        </button>
                    </div>
                </div>

                <table className="border-collapse border border-slate-400 w-full">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-slate-300">ID</th>
                        <th className="border border-slate-300">descriptionAr</th>
                        <th className="border border-slate-300">descriptionFr</th>
                        <th className="border border-slate-300">descriptionEn</th>
                        <th className="border border-slate-300">Image</th>
                        <th className="border border-slate-300">Actions</th>
                    </tr>
                    </thead>

                    {
                        entitiesTopSlidesSelector.map((topHomeSlides: any, i: number) => (
                            <tbody className="bg-white" key={`entity-${i}`}>
                            <tr >
                                <td className="border border-slate-100">{topHomeSlides.id}</td>
                                <td className="border border-slate-100"><div dangerouslySetInnerHTML={{ __html: topHomeSlides.descriptionAr || '' }}></div></td>
                                <td className="border border-slate-100"><div dangerouslySetInnerHTML={{ __html: topHomeSlides.descriptionFr || '' }}></div></td>
                                <td className="border border-slate-100"><div dangerouslySetInnerHTML={{ __html: topHomeSlides.descriptionEn || '' }}></div></td>
                                <td className="border border-slate-100">
                                    {
                                        topHomeSlides.image ? <img src={topHomeSlides.image} width={250} height={250}/> : null
                                    }
                                </td>
                                <td className="border border-slate-100">
                                    <button className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white mx-2"
                                            onClick={() => edit(topHomeSlides)}>Edit</button>
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
    );
}
