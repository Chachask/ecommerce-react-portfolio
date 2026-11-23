import axios from 'axios'
import { formatMoney } from "../../utils/money"

import { DeliveryDate } from "./DeliveryDate"
export function DeliveryOptions({ cartItem, deliveryOptions, loadCart }) {
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {deliveryOptions.map((deliveryOption) => {
                let priceString = "FREE Shipping"
                if (deliveryOption.priceCents > 0) {
                    priceString = `${formatMoney(deliveryOption.priceCents)} - shipping`
                }
                const updateDeliveryOption = async () => {
                    console.log("Selected option:", deliveryOption.id);
                    await axios.put(`/api/cart-items/${cartItem.productId}`, {
                        deliveryOptionId: deliveryOption.id
                    });
                    
                    await loadCart();
                    

                }
                return (
                        
                        <div key={deliveryOption.id} className="delivery-option" onClick={updateDeliveryOption}>
                            <input type="radio"
                                checked={deliveryOption.id === cartItem.deliveryOptionId}
                                onChange={() => {}}
                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`} />
                            <div>
                               <DeliveryDate  cartItem={cartItem} deliveryOptions={deliveryOptions} deliveryOption={deliveryOption}/>
                                <div className="delivery-option-price">
                                    {priceString}
                                </div>
                            </div>
                        </div>
      

                    
    )
})}


        </div >
    )
}