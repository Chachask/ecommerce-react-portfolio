
import { OrdersHeader } from './OrdersHeader';
import { OrderDetailGrid } from './OrdersDetailGrid';

export function OrdersGrid({orders, loadCart}) {
    return (
        <div className="orders-grid">
            {orders.map((order) => {
                return (

                    <div key={order.id} className="order-container">

                        <OrdersHeader order={order} />

                        <OrderDetailGrid order={order} loadCart={loadCart}/>
                    </div>

                );
            })}

        </div>
    )
}