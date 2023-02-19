import styles from '../styles/Header.module.css';
import Head from 'next/head';
import icon from '../public/talkup.png';
import Image from 'next/image';

export default function Header({ title }) {

    return (
        <header className={styles.container}>
            <Head>
                <title>{title}</title>
            </Head>
            <div className={styles.icon}>
                <Image src={icon} />
            </div>
            <div className={styles.title}>TalkUp</div>
        </header>
    );
}
