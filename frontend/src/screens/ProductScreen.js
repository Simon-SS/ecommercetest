import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'


function ProductScreen({ match }) {

    const [product, setProduct] = useState([])

    useEffect(() => {

        async function fetchProduct() {
            const { data } = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }

        fetchProduct()

        
    }, [])

    return (
        <div>
            <Link to={'/'} className='btn btn-light my-3'>Go back</Link>
            <Row>
                <Col sm={6} md={6} lg={6} xl={6}>
                    <Image src = {product.image} alt={product.name}/>
                </Col>
                <Col sm={3} md={3} lg={3} xl={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col sm={3} md={3} lg={3} xl={3}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item variant="flush">
                                <Row>
                                    <Col>Price: </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item variant="flush">
                                <Row>
                                    <Col>Status: </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button className="btn-block" disabled={product.countInStock == 0} type="button">Add to Cart</Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen
