import Link from 'next/link'
import {Accordion, AccordionTab} from "primereact/accordion";
import {Card} from "primereact/card";

const SideBar = () => (
    <div className="container-side-bar">

        <Card title="SrfGroup">
            <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
        </Card>
        <Accordion multiple activeIndex={[0]}>
            <AccordionTab header="User Mangment">
                <ul>
                    <li className="py-4">
                        <Link href="/user/list-users">
                            <a>List users</a>
                        </Link>
                    </li>
                    <li className="py-4">
                        <Link href="/about">
                            <a>Add user</a>
                        </Link>
                    </li>
                </ul>
            </AccordionTab>
            <AccordionTab header="Offer Mangment">
                <ul>
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <a>About</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/post/first">
                            <a>First Post</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/post/second">
                            <a>Second Post</a>
                        </Link>
                    </li>
                </ul>
            </AccordionTab>

            <AccordionTab header="Home Mangment">
                <ul>
                    <li className="py-4">
                        <Link href="/home/top-slides-images">
                            <a>Top Slides Images</a>
                        </Link>
                    </li>
                    <li className="py-4">
                        <Link href="/home/feature-home">
                            <a>Feature Home</a>
                        </Link>
                    </li>
                </ul>
            </AccordionTab>


            <AccordionTab header="Support Mangment">
                <ul>
                    <li className="py-4">
                        <Link href="/contact-us">
                            <a>Contact us</a>
                        </Link>
                    </li>
                    <li className="py-4">
                        <Link href="/about">
                            <a>About US</a>
                        </Link>
                    </li>
                    <li className="py-4">
                        <Link href="/faq">
                            <a>FAQ</a>
                        </Link>
                    </li>
                    <li className="py-4">
                        <Link href="/news-letter">
                            <a>NewsLetter</a>
                        </Link>
                    </li>
                </ul>
            </AccordionTab>

            <AccordionTab header="Category Mangment">
                <ul>
                    <li className="py-4">
                        <Link href="/category/list-categories">
                            <a>List categories</a>
                        </Link>
                    </li>
                    <li className="py-4">
                        <Link href="/about">
                            <a>Add category</a>
                        </Link>
                    </li>
                </ul>
            </AccordionTab>

            <AccordionTab header="Address Mangment">
                <ul>
                    <li className="py-4">
                        <Link href="/address/list-address">
                            <a>List address</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <a>Add address</a>
                        </Link>
                    </li>
                </ul>
            </AccordionTab>
        </Accordion>

    </div>
)

export default SideBar
