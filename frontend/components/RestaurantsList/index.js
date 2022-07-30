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

const RestaurantList = (props) => {
  //graphqlでクエリ内のデータ取得
  const { loading, error, data } = useQuery(query);
  //loadingがtrueの場合
  if (loading) return <h1>Loading...</h1>;
  //errorがtrueの場合
  if (error) return <h1>Error!!</h1>;
  //データがあればhtmlを出力
  if (data) {
    //restaurantsに対してフィルターをかける
    const searchQuery = data.restaurants.filter((restaurant) =>
      //レストランのnameデータを小文字に変換し、propsで渡ってきた値が含まれているかどうか
      restaurant.name.toLowerCase().includes(props.search)
    );
    //フィルター後のデータをmapで展開
    return (
      <Row>
        {searchQuery.map((res) => (
          <Col xs="6" sm="4" key={res.id}>
            <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
              <CardImg
                src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
                top={true}
                style={{ height: 250 }}
              />
              <CardBody>
                <CardTitle>{res.name}</CardTitle>
                <CardTitle>{res.description}</CardTitle>
              </CardBody>
              <div className="card-footer">
                <Link
                  as={`restaurants/${res.id}`}
                  href={`restaurants?id=${res.id}`}
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
              color: white;
            }
            .card-colums {
              column-connt: 3;
            }
          `}
        </style>
      </Row>
    );
  } else {
    <h1>レストランが見つかりませんでした。</h1>;
  }
};

export default RestaurantList;
