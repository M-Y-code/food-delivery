import Link from "next/link";
import { Card, CardBody, CardImg, CardTitle, Col, Row } from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

//graphqlでクエリ取得
const query = gql`
{
    restaurants {
        id
        name
        description
        image {
            url
        }
    }
}
`;

const RestaurantList = () => {
    //graphqlでクエリ内のデータ取得
    const { loading, error, data } = useQuery(query)
    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>Error!!</h1>
    //データがあればhtmlを出力
    if (data) {
        //データをmapで展開
        return (
            <Row>
                {data.restaurants.map((res) => (
                    <Col xs="6" sm="4" key={res.id}>
                        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                            <CardImg
                                src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
                                top={true} style={{ height: 250 }} />
                            <CardBody>
                                <CardTitle>{res.name}</CardTitle>
                                <CardTitle>{res.description}</CardTitle>
                            </CardBody>
                            <div className="card-footer">
                                <Link
                                    href={`restaurants/${res.id}`}
                                    as={`restaurants?id=${res.id}`}
                                >
                                    <a className="btn btn-primary">もっと見る</a>
                                </Link>
                            </div>
                        </Card>
                    </Col>
                ))}
                <style jsx>
                    {`
                    a {
                        color: white;
                    }
                    a:link {
                        text-decoration: none;
                        color: white;
                    }
                    a:hover {
                        color: white
                    }
                    .card-colums {
                        column-connt: 3;
                    }
                    `}
                </style>
            </Row>
        );
    } else {
        <h1>レストランが見つかりませんでした。</h1>
    }


}

export default RestaurantList;