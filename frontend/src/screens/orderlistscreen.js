
import { Container,Table } from 'react-bootstrap';
import { useGetallordersQuery } from '../slices/productapislice';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';




function OrderListScreen(){

    const  {
        data: orders,
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetallordersQuery();
      console.log(orders);
    return (
        <>
            {
                isLoading?<Loader/>:
                <Container>
                    <Table striped hover responsive className="table-sm">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER_ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                            
                        </tr>
                        </thead>
                        <tbody>
                            {orders.map((order)=>{
                                return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.paid?"YES":"NO"}</td>
                                    <td>{order.isDelivered?"YES":"NO"}</td>
                                    <td><Link to={`/order/${order._id}`}>Details</Link></td>
                                </tr>
                                )
                            })}
                        </tbody>
                   

                </Table>
                </Container>
            }
        </>
    )

    
}

export default OrderListScreen;