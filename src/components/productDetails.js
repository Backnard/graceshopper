import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Label,
  Grid,
  Button,
  Card,
  Icon,
  Image,
} from "semantic-ui-react";

const productDetails = ({
  products,
  setProducts,
  activeCart,
  setActiveCart,
}) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`/api/products/${productId}`).then((res) => {
      const prod = res.data.product;
      return setProduct(prod);
    });
  }, []);

  const addToCart = () => {
    const bearer = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    axios
      .post(`/api/orderItems/`, { productId: productId, quantity: 1 }, bearer)
      .then((response) => {
        console.log(response.data);
        setActiveCart([
          ...activeCart,
          {
            description: product.description,
            title: product.title,
            ...response.data,
          },
        ]);

        setProducts(
          products.map((product) => {
            if (product.id === productId) {
              return { ...product, quantity: product.quantity - 1 };
            } else {
              return product;
            }
          })
        );
      });
  };

  const { title, description, price, inventory, image } = product;

  return (
    <Container fluid>
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={6}>
            <Image
              src={!image ? "https://via.placeholder.com/1000" : image.img_src}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>Quantity: {inventory}</Card.Meta>
                <Card.Description>{description}</Card.Description>
              </Card.Content>
              <Card.Content>
                <Label size="large">
                  <Icon name="dollar" />
                  {price}
                </Label>
                <Button
                  content="Add to Cart"
                  floated="right"
                  compact
                  onClick={addToCart}
                />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default productDetails;
