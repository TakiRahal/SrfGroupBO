import React from 'react';
import {ALL_APP_ROUTES} from "../../../core/config/all-app-routes";
import {Route} from "react-router";
import Dashboard from "../../../main-features/dashboard/dashboard";
import SiderBar from "../side-bar/SideBar";
import Header from "../header/Header";
import LayoutRoutes from "../../layout-routes/LayoutRoutes";
import Footer from "../footer/Footer";
import {IAppProps} from "../../../App";

export default function MainAdmin(props: IAppProps){
    return (
        <div className="flex flex-row container-app">
            <div className="basis-1/5 container-side-bar rounded-r-lg shadow-md">
                <SiderBar/>
            </div>
            <div className="basis-full bg-slate-50 relative">
                <Header {...props}/>
                <main className="m-4">
                    <LayoutRoutes/>
                    <Footer/>
                </main>
            </div>
        </div>
    );
}