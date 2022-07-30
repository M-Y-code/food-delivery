import React, { useContext } from "react";
import App from "next/app";
import Head from "next/head";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import AppContext from "../context/AppContext";

const Layout = (props) => {
  //Appcontextで_appjsのvalue(state)を操作できるようにする
  const { user, setUser } = useContext(AppContext);
  return (
    <div>
      <Head>
        <title>フードデリバリーサービス</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
          `}
        </style>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link href="/">
              <a className="navbar-brand">ホーム</a>
            </Link>
          </NavItem>
          <NavItem className="ml-auto">
            {/* _appjsのstateにユーザーが存在すればログアウト存在しなければログイン表示 */}
            {user ? (
              <Link href="/">
                <a
                  className="nav-link"
                  //クリック時setUserをnullに変更
                  onClick={() => {
                    setUser(null);
                  }}
                >
                  ログアウト
                </a>
              </Link>
            ) : (
              <Link href="/login">
                <a className="nav-link">ログイン</a>
              </Link>
            )}
          </NavItem>
          <NavItem>
            {/* _appjsのstateにユーザーが存在すれば名前表示存在しなければ新規登録表示 */}
            {user ? (
              <h5>{user.username}</h5>
            ) : (
              <Link href="/register">
                <a className="nav-link">新規登録</a>
              </Link>
            )}
          </NavItem>
        </Nav>
      </header>
      <Container>{props.children}</Container>
    </div>
  );
};

export default Layout;
