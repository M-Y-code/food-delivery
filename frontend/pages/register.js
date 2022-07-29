import { useContext, useState } from "react"
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import AppContext from "../context/AppContext"
import { registerUser } from "../lib/auth"

const register = () => {
    //空のユーザーデータを定義
    const [data, setData] = useState({ username: "", email: "", password: "" })
    //Appcontextで_appjsのvalue(state)を操作できるようにする
    const appContext = useContext(AppContext)
    const handleRegister = () => {
        //ユーザー登録関数を呼び出し入力した内容を渡す
        registerUser(data.username, data.email, data.password)
            //成功時
            .then((res) => {
                //_appjsのsetUserにuserレスポンスを渡す
                appContext.setUser(res.data.user)
            })
            //失敗時
            .catch((err) => console.log(err))
    }
    console.log(data)

    return (
        <Container>
            <Row>
                <Col>
                    <div className="paper">
                        <div className="header">
                            <h2>ユーザー登録</h2>
                        </div>
                    </div>
                    <section className="wrapper">
                        <Form>
                            <fieldset>
                                <FormGroup>
                                    <Label>
                                        ユーザー名：
                                    </Label>
                                    <Input
                                        type="text"
                                        name="username"
                                        style={{ height: 50, fontSize: "1.2rem" }}
                                        //スプレッド構文でstateを展開しusernameプロパティにsetDataで入力内容を挿入
                                        onChange={(e) => setData({ ...data, username: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        メールアドレス：
                                    </Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        style={{ height: 50, fontSize: "1.2rem" }}
                                        //スプレッド構文でstateを展開しemailプロパティにsetDataで入力内容を挿入
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        パスワード：
                                    </Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        style={{ height: 50, fontSize: "1.2rem" }}
                                        //スプレッド構文でstateを展開しpasswordプロパティにsetDataで入力内容を挿入
                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                    />
                                </FormGroup>
                                <span>
                                    <a href="/">
                                        <small>パスワードをお忘れですか？</small>
                                    </a>
                                </span>
                                <Button
                                    style={{ float: "right", width: 120 }}
                                    color="primary"
                                    //ユーザー登録関数を呼び出し
                                    onClick={() => {
                                        handleRegister()
                                    }}
                                >
                                    登録
                                </Button>
                            </fieldset>
                        </Form>
                    </section>
                </Col>
            </Row>
            <style jsx>
                {`
                .paper {
                    text-align: center;
                    margin-top: 50px;
                }
                .header {
                    width:100%;
                    margin-bottom: 30px;
                }
                .wrapper {
                    padding: 10px 30px 20px 30px;
                }
                `}
            </style>
        </Container>
    );
}

export default register;