import React from 'react';
import {ALL_APP_ROUTES} from "../../core/config/all-app-routes";
import Dashboard from "../../main-features/dashboard/dashboard";
import {Route} from "react-router-dom";
import FaqList from '../../main-features/cms/faq/FaqList';
import FaqAddUpdate from "../../main-features/cms/faq/FaqAddUpdate";

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

            {/*<Route path="*">*/}
                {/*<Dashboard />*/}
            {/*</Route>*/}
        </div>
    );
}