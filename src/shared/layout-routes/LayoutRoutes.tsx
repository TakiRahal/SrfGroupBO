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
import ListNewsLetter from "../../main-features/news-letter/ListNewsLetter";
import ListTopHomeSlidesImage from "../../main-features/home/ListTopHomeSlidesImage";
import AddUpdateTopHomeSlidesImage from "../../main-features/home/AddUpdateTopHomeSlidesImage";
import AddUpdatePostHomeFeature from "../../main-features/home/AddUpdatePostHomeFeature";
import ListPostHomeFeature from "../../main-features/home/ListPostHomeFeature";

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
            <Route exact path={ALL_APP_ROUTES.OFFER.DESCRIPTION_ADD_OFFER.ADD_UPDATE}>
                <AddUpdateDescriptionAddOffer />
            </Route>

            <Route exact path={ALL_APP_ROUTES.HOME.TOPHOMESLIDESIMAGE.LIST}>
                <ListTopHomeSlidesImage />
            </Route>
            <Route exact path={ALL_APP_ROUTES.HOME.TOPHOMESLIDESIMAGE.ADD_UPDATE}>
                <AddUpdateTopHomeSlidesImage />
            </Route>
            <Route path={ALL_APP_ROUTES.HOME.TOPHOMESLIDESIMAGE.ADD_UPDATE + '/:id/edit'}>
                <AddUpdateTopHomeSlidesImage />
            </Route>
            <Route exact path={ALL_APP_ROUTES.HOME.POST_HOME_FEATURE.ADD_UPDATE }>
                <AddUpdatePostHomeFeature />
            </Route>
            <Route path={ALL_APP_ROUTES.HOME.POST_HOME_FEATURE.LIST }>
                <ListPostHomeFeature />
            </Route>
            <Route path={ALL_APP_ROUTES.HOME.POST_HOME_FEATURE.ADD_UPDATE + '/:id/edit' }>
                <AddUpdatePostHomeFeature />
            </Route>


            <Route exact path={ALL_APP_ROUTES.NEWS_LETTER}>
                <ListNewsLetter />
            </Route>

            {/*<Route path="*">*/}
                {/*<Dashboard />*/}
            {/*</Route>*/}
        </div>
    );
}