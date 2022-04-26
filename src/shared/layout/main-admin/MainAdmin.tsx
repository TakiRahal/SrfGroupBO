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
        <div className="container-app">

            <div className="container-side-bar bg-blue-200 text-white">
                <SiderBar/>
            </div>
            <div className="container-main bg-black-alpha-10">
                <Header {...props}/>
                <main className="m-4">
                    <LayoutRoutes/>
                    <Footer/>
                </main>
            </div>


            {/*<div className="flex flex-row flex-wrap">*/}
                {/*<div className="container-side-bar flex bg-blue-200 text-white">*/}
                    {/*<SiderBar/>*/}
                {/*</div>*/}
                {/*<div className="flex-grow-1 bg-black-alpha-10">*/}
                    {/*<Header {...props}/>*/}
                    {/*<main className="m-4">*/}
                        {/*<LayoutRoutes/>*/}
                        {/*<Footer/>*/}
                    {/*</main>*/}
                {/*</div>*/}
            {/*</div>*/}
            {/*<div className="flex-shrink-1 bg-blue-200 flex container-side-bar">*/}
                {/*<SiderBar/>*/}
            {/*</div>*/}
            {/*<div className="flex-grow-1 bg-black-alpha-10 container-main">*/}
                {/*<Header {...props}/>*/}
            {/*</div>*/}
            {/*<div className="container-side-bar">*/}
                {/*<SiderBar/>*/}
            {/*</div>*/}
            {/*<div className="container-main">*/}
                {/*<Header {...props}/>*/}
                {/*<main className="m-4">*/}
                    {/*<LayoutRoutes/>*/}
                    {/*<Footer/>*/}
                {/*</main>*/}
            {/*</div>*/}
        </div>
    );
}