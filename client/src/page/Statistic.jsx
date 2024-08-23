import {Card, Col, Table, Row, Spinner, ListGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import StatisticService from "../services/StatisticService";
import {observer} from "mobx-react-lite";
import Button from "react-bootstrap/Button";

const Statistic = () => {

    const [loading, setLoading] = useState(true);

    const [topFivePerWeek, setTopFivePerWeek] = useState('');
    const [ordersPerWeek, setOrdersPerWeek] = useState(0);
    const [ordersPerMonth, setOrdersPerMonth] = useState(0);
    const [ordersSumPerDay, setOrdersSumPerDay] = useState(0);

    useEffect(() => {
        StatisticService.topFivePerWeek().then(response => {
            setTopFivePerWeek(response.data);
        }).catch(e => {
            alert(e.response.data.errors[0].msg)
        })
        StatisticService.ordersPerWeek().then(response => {
            setOrdersPerWeek(response.data[0]);
        })
        StatisticService.ordersPerMonth().then(response => {
            setOrdersPerMonth(response.data[0]);
        })
        StatisticService.ordersSumPerDay().then(response => {
            setOrdersSumPerDay(response.data[0]);
            setLoading(false);
        })

    }, [])

    if (loading) {
        return <Spinner animation={'grow'} variant={'dark'}/>
    }

    return (
        <Card style={{width: 500, backgroundColor:"ghostwhite", borderWidth:"2px"}} className="p-4 mt-2">
            <h2 style={{color:"black"}}>Statistic</h2>
            <hr/>
            <Row className="d-flex justify-content-md-start pl-3 pr-3">
                <Col md={12} style={{textAlign:"center"}}>
                    <Button variant="outline-secondary" size="lg"  className="px-lg-5" disabled><h3 style={{color:"black"}}>Top 5 per week</h3></Button>
                </Col>
                <hr style={{visibility:"hidden"}}></hr>
                <Button className="px-0 py-0" variant="dark">
                <Table hover className="m-0" variant="dark">
                    <thead>
                    <tr >
                        <th>Sold</th>
                        <th>Photo</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {topFivePerWeek.topFive.map(item =>
                        <tr key={item._id}>
                            <td style={{textAlign:"center", verticalAlign:"middle"}}>
                                {item.count}
                            </td>
                            <td style={{textAlign:"center"}}>
                                <img
                                    className="rounded-circle"
                                    style={{height: 70}}
                                    src={process.env.REACT_APP_API_URL + item.img}
                                    alt="Photo"
                                />
                            </td>
                            <td style={{textAlign:"center", verticalAlign:"middle"}}>{item.name}</td>
                        </tr>
                    )}
                    </tbody>
                </Table></Button>
            </Row>
            <hr style={{visibility:"hidden"}}></hr>
            <Row className="d-flex justify-content-md-start px-1">
                <Col md={9}>
                    <h5>Number of orders by week : </h5>
                </Col>
                <Col md={3}>
                    <h5>{ordersPerWeek && ordersPerWeek.count}</h5>
                </Col>
            </Row>
            <hr/>
            <Row className="d-flex justify-content-md-start pl-3 pr-3">
                <Col md={9}>
                    <h5>Number of orders per month : </h5>
                </Col>
                <Col md={3}>
                    <h5>{ordersPerMonth && ordersPerMonth.count}</h5>
                </Col>
            </Row>
            <hr/>
            <Row className="d-flex justify-content-md-start pl-3 pr-3">
                <Col md={9}>
                    <h5>Total income per day : </h5>
                </Col>
                <Col md={3}>
                    <h5>{ordersSumPerDay && ordersSumPerDay.sumPerDay}$</h5>
                </Col>
            </Row>
        </Card>
    )
}

export default observer(Statistic);