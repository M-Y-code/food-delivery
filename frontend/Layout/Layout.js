import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Button from '../Components'
import styles from './Layout.module.scss'


const Layout = (props) => {
    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.nav__home}>
                        <Link href="/">
                            <a>ホーム</a>
                        </Link>
                    </div>
                    <div className={styles.nav__user}>
                        <div>
                            <Link href="/login">
                                <a>サインイン</a>
                            </Link>
                        </div>
                        <div>
                            <Link href="/register">
                                <a>サインアップ</a>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
            {props.children}
        </>
    )
}

export default Layout;