import Head from 'next/head';
import Navbar from "../Navbar/Navbar";
import style from "./Layout.module.scss";

const Layout = (props) => {
    return (
        <div className={style.layout}>
            <Head>
                <title>Next js Todo</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
            </Head>
            <Navbar />
            <div className={style.content}>{props.children}</div>

        </div>
    )
}

export default Layout;