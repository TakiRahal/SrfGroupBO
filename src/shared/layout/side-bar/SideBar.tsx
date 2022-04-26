import React from 'react';
import {useHistory} from "react-router";
import {ALL_APP_ROUTES} from "../../../core/config/all-app-routes";
import {Accordion, AccordionTab} from "primereact/accordion";
import {Link} from "react-router-dom";

export default function SiderBar() {

    const history = useHistory();

    const redirectTo = (path: string) => {
        history.push(path);
    }

    return (
        <div className="w-full">
            <div className="divide-y divide-blue-200">
                <div className="p-5">Menu</div>
            </div>

            <div className="p-3 cursor-pointer hover:bg-purple-100">
                <Link to={ALL_APP_ROUTES.DASHBOARD}>Dashboard</Link>
            </div>
            <Accordion activeIndex={0}>
                <AccordionTab header="Module User">
                    <div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.USER.LIST)}>list users</div>
                    <div className="p-3 cursor-pointer hover:bg-purple-100">Add user</div>
                </AccordionTab>

                <AccordionTab header="Module Offer">
                    <div className="p-3 cursor-pointer hover:bg-purple-100">list offers</div>
                    <div className="p-3 cursor-pointer hover:bg-purple-100">Add offer</div>
                    <div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.OFFER.DESCRIPTION_ADD_OFFER.LIST)}>
                        Description for add offer
                    </div>
                </AccordionTab>

                <AccordionTab header="Module Category">
                    <div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.CATEGORY.LIST)}>list categories</div>
                    <div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.CATEGORY.ADD_UPDATE)}>Add category</div>
                </AccordionTab>

                <AccordionTab header="Module Home">
                    <div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.HOME.TOPHOMESLIDESIMAGE.LIST)}>TopHomeSlidesImage</div>
                    <div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.HOME.POST_HOME_FEATURE.LIST)}>PostHomeFeature</div>
                </AccordionTab>

                <AccordionTab header="Module Support">
                    <div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.CONTACT_US.LIST)}>Contact Us</div>
                    <div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.ABOUT_US.LIST)}>About Us</div>
                    <div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.FAQ.LIST)}>FAQ</div>
                </AccordionTab>

            </Accordion>

            <div className="p-3 cursor-pointer hover:bg-purple-100">
                <Link to={ALL_APP_ROUTES.ADDRESS}>Address</Link>
            </div>

            {/*<div className="divide-y divide-blue-200">*/}

                {/*<div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.DASHBOARD)}>Dashboard</div>*/}

                {/*<div className="">*/}
                    {/*<Disclosure>*/}
                        {/*{({ open }) => (*/}
                            {/*<>*/}
                                {/*<Disclosure.Button className="p-3 flex justify-between w-full text-sm font-medium text-left hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">*/}
                                    {/*<span>User</span>*/}
                                    {/*<ChevronUpIcon*/}
                                        {/*className={`${*/}
                                            {/*open ? 'transform rotate-180' : ''*/}
                                            {/*} w-5 h-5 text-purple-500`}*/}
                                    {/*/>*/}
                                {/*</Disclosure.Button>*/}
                                {/*<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 divide-y divide-blue-200">*/}
                                    {/*<div className="p-3 cursor-pointer hover:bg-purple-100">list users</div>*/}
                                    {/*<div className="p-3 cursor-pointer hover:bg-purple-100">Add user</div>*/}
                                {/*</Disclosure.Panel>*/}
                            {/*</>*/}
                        {/*)}*/}
                    {/*</Disclosure>*/}
                {/*</div>*/}
                {/*<div className="">*/}
                    {/*<Disclosure>*/}
                        {/*{({ open }) => (*/}
                            {/*<>*/}
                                {/*<Disclosure.Button className="p-3 flex justify-between w-full text-sm font-medium text-left hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">*/}
                                    {/*<span>Offer</span>*/}
                                    {/*<ChevronUpIcon*/}
                                        {/*className={`${*/}
                                            {/*open ? 'transform rotate-180' : ''*/}
                                            {/*} w-5 h-5 text-purple-500`}*/}
                                    {/*/>*/}
                                {/*</Disclosure.Button>*/}
                                {/*<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 divide-y divide-blue-200">*/}
                                    {/*<div className="p-3 cursor-pointer hover:bg-purple-100">list offers</div>*/}
                                    {/*<div className="p-3 cursor-pointer hover:bg-purple-100">Add offer</div>*/}
                                    {/*<div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.OFFER.DESCRIPTION_ADD_OFFER.LIST)}>List Description Add offer</div>*/}
                                {/*</Disclosure.Panel>*/}
                            {/*</>*/}
                        {/*)}*/}
                    {/*</Disclosure>*/}
                {/*</div>*/}
                {/*<div className="">*/}
                    {/*<Disclosure>*/}
                        {/*{({ open }) => (*/}
                            {/*<>*/}
                                {/*<Disclosure.Button className="p-3 flex justify-between w-full text-sm font-medium text-left hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">*/}
                                    {/*<span>Categories</span>*/}
                                    {/*<ChevronUpIcon*/}
                                        {/*className={`${*/}
                                            {/*open ? 'transform rotate-180' : ''*/}
                                            {/*} w-5 h-5 text-purple-500`}*/}
                                    {/*/>*/}
                                {/*</Disclosure.Button>*/}
                                {/*<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 divide-y divide-blue-200">*/}
                                    {/*<div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.CATEGORY.LIST)}>list categories</div>*/}
                                    {/*<div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.CATEGORY.ADD_UPDATE)}>Add category</div>*/}
                                {/*</Disclosure.Panel>*/}
                            {/*</>*/}
                        {/*)}*/}
                    {/*</Disclosure>*/}
                {/*</div>*/}

                {/*<div className="">*/}
                    {/*<Disclosure>*/}
                        {/*{({ open }) => (*/}
                            {/*<>*/}
                                {/*<Disclosure.Button className="p-3 flex justify-between w-full text-sm font-medium text-left hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">*/}
                                    {/*<span>Home</span>*/}
                                    {/*<ChevronUpIcon*/}
                                        {/*className={`${*/}
                                            {/*open ? 'transform rotate-180' : ''*/}
                                            {/*} w-5 h-5 text-purple-500`}*/}
                                    {/*/>*/}
                                {/*</Disclosure.Button>*/}
                                {/*<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 divide-y divide-blue-200">*/}
                                    {/*<div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.HOME.TOPHOMESLIDESIMAGE.LIST)}>TopHomeSlidesImage</div>*/}
                                    {/*<div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.HOME.POST_HOME_FEATURE.LIST)}>PostHomeFeature</div>*/}
                                {/*</Disclosure.Panel>*/}
                            {/*</>*/}
                        {/*)}*/}
                    {/*</Disclosure>*/}
                {/*</div>*/}

                {/*<div className="">*/}
                    {/*<Disclosure>*/}
                        {/*{({ open }) => (*/}
                            {/*<>*/}
                                {/*<Disclosure.Button className="p-3 flex justify-between w-full text-sm font-medium text-left hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">*/}
                                    {/*<span>Support</span>*/}
                                    {/*<ChevronUpIcon*/}
                                        {/*className={`${*/}
                                            {/*open ? 'transform rotate-180' : ''*/}
                                            {/*} w-5 h-5 text-purple-500`}*/}
                                    {/*/>*/}
                                {/*</Disclosure.Button>*/}
                                {/*<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 divide-y divide-blue-200">*/}
                                    {/*<div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.CONTACT_US.LIST)}>Contact Us</div>*/}
                                    {/*<div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.ABOUT_US.LIST)}>About Us</div>*/}
                                    {/*<div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.FAQ.LIST)}>FAQ</div>*/}
                                {/*</Disclosure.Panel>*/}
                            {/*</>*/}
                        {/*)}*/}
                    {/*</Disclosure>*/}
                {/*</div>*/}
                {/*<div className="p-3 cursor-pointer hover:bg-purple-100" onClick={() => redirectTo(ALL_APP_ROUTES.NEWS_LETTER)}>NewsLetter</div>*/}
                {/*<div className="p-3">03</div>*/}

            {/*</div>*/}
        </div>
    );
}