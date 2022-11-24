import { useEffect, useState } from "react";
import { apiFetchGet } from "../api/utils";
import styles from '../styles/Header.module.css';
import Head from "next/head";

export default function Header({ userId, title }) {

    const [userInfo, setUserInfo] = useState(undefined);

    useEffect(() => {

        if (undefined !== userId) {
            apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + "/getUser/" + userId, {}).then((res) => {
                setUserInfo(res.data);
            });
        }

    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
            </Head>
            <div>Header</div>
            {undefined !== userInfo ? <div>ようこそ {userInfo.name} さん</div> : <div></div>}
        </div>
    );
}
