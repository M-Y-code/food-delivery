import { useState } from "react";
import { Alert, Button, Col, Input, InputGroup, InputGroupText, Row } from "reactstrap"
import RestaurantList from "../components/RestaurantsList";

const index = () => {
    const [query, setQuery] = useState("")

    return (
        <div className="container-fluid">
            <Row>
                <Col>
                    <div className="search">
                        <InputGroup>
                            <InputGroupText>探す</InputGroupText>
                            <Input
                                placeholder="レストラン名を入力してください"
                                //入力内容を全て小文字に変換
                                onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())} />
                        </InputGroup>
                    </div>
                    <RestaurantList
                        //RestaurantListに入力内容を渡す
                        search={query} />
                </Col>
            </Row>
            <style jsx>
                {`
            .serch {
                margin: 20px;
                width: 500px;
            }
            `}
            </style>
        </div>
    )
}

export default index;