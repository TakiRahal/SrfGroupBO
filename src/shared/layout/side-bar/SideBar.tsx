import React from 'react';
import {useHistory} from "react-router";
import {ALL_APP_ROUTES} from "../../../core/config/all-app-routes";

export default function SiderBar() {

    const history = useHistory();

    const redirectFAQ = () => {
        history.push(ALL_APP_ROUTES.FAQ.LIST);
    }

    const redirectAboutUs = () => {
        history.push(ALL_APP_ROUTES.ABOUT_US.LIST);
    }

    return (
        <div className="">
            <div className="divide-y divide-blue-200">
                <div className="p-5">Menu</div>
            </div>

            <div className="divide-y divide-blue-200">
                <div className="p-3">Offer</div>
                <div className="p-3">02</div>
                <div className="p-3">03</div>
                <div className="p-3" onClick={redirectFAQ}>FAQ</div>
                <div className="p-3" onClick={redirectAboutUs}>AboutUs</div>
            </div>
        </div>
    );
}