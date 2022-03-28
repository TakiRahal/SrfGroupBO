import React from 'react';
import {ALL_APP_ROUTES} from "../../core/config/all-app-routes";
import Dashboard from "../../main-features/dashboard/dashboard";
import {Route} from "react-router-dom";
import FaqList from '../../main-features/cms/faq/FaqList';
import FaqAddUpdate from "../../main-features/cms/faq/FaqAddUpdate";
import AboutUsAddUpdate from "../../main-features/cms/about-us/AboutUsAddUpdate";
import AboutUsList from "../../main-features/cms/about-us/AboutUsList";
import AddUpdateCategory from "../../main-features/category/AddUpdateCategory";
import ListCategories from "../../main-features/category/ListCategories";
import ContactUsList from "../../main-features/cms/contact-us/ContactUsList";
import ListDescriptionAddOffer from "../../main-features/offer/ListDescriptionAddOffer";
import AddUpdateDescriptionAddOffer from "../../main-features/offer/AddUpdateDescriptionAddOffer";

export default function LayoutRoutes() {
    return (
        <div>
            <Route exact path={ALL_APP_ROUTES.DASHBOARD}>
                <Dashboard />
            </Route>

            <Route exact path={ALL_APP_ROUTES.FAQ.LIST}>
                <FaqList />
            </Route>
            <Route exact path={ALL_APP_ROUTES.FAQ.ADD_UPDATE}>
                <FaqAddUpdate />
            </Route>

            <Route exact path={ALL_APP_ROUTES.ABOUT_US.LIST}>
                <AboutUsList />
            </Route>
            <Route exact path={ALL_APP_ROUTES.ABOUT_US.ADD_UPDATE}>
                <AboutUsAddUpdate />
            </Route>

            <Route exact path={ALL_APP_ROUTES.CATEGORY.LIST}>
                <ListCategories />
            </Route>
            <Route exact path={ALL_APP_ROUTES.CATEGORY.ADD_UPDATE}>
                <AddUpdateCategory />
            </Route>
            <Route exact path={ALL_APP_ROUTES.CATEGORY.ADD_UPDATE + '/:id/edit'}>
                <AddUpdateCategory />
            </Route>

            <Route exact path={ALL_APP_ROUTES.CONTACT_US.LIST}>
                <ContactUsList />
            </Route>

            <Route exact path={ALL_APP_ROUTES.OFFER.DESCRIPTION_ADD_OFFER.LIST}>
                <ListDescriptionAddOffer />
            </Route>
            <Route exact path={ALL_APP_ROUTES.OFFER.DESCRIPTION_ADD_OFFER.ADD}>
                <AddUpdateDescriptionAddOffer />
            </Route>

            {/*<Route path="*">*/}
                {/*<Dashboard />*/}
            {/*</Route>*/}
        </div>
    );
}