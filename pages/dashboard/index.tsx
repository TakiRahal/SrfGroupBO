import React from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Dashboard(){

    React.useEffect(() => {
        console.log('process.env. ', process.env.NEXT_PUBLIC_API_END_POINT);
    }, [])

    return (
        <div>
            <SideBar />
            <Header />
            <main className="container-main">
                <h1>Hello Dashboard</h1>
            </main>
            <Footer />
        </div>
    );
}
