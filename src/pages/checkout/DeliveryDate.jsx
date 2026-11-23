import dayjs from "dayjs";

export function DeliveryDate({ deliveryOption }) {
    if (!deliveryOption) {
        return null;
    }
    return (
        <div className="delivery-option-date">
            Delivery date: {
                dayjs(deliveryOption.estimatedDeliveryTimeMs)
                    .format('dddd, MMMM D')
            }
        </div>
    );
}



