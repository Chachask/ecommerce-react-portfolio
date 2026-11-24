import axios from "axios"
import { formatMoney } from "../../utils/money"
import { useState } from 'react'

export function CartItemDetails({ cartItem, loadCart }) {
    const [isClicked, setIsClicked] = useState(false)
    const [quantity, setQuantity] = useState(cartItem.quantity)

    function handleChange(e) {
        const quantitySelected = Number(e.target.value)
        setQuantity(quantitySelected)

    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            updateQuantity();
        } else if (e.key === 'Escape') {
            setQuantity(cartItem.quantity)
            setIsClicked(false)
        }

    }
    const handleUpdateClick = () => {
        setIsClicked(true)
    }

    const updateQuantity = async () => {
        try {

            await axios.put(`/api/cart-items/${cartItem.productId}`,
                { quantity }

            );
            await loadCart();
            setIsClicked(false)


            console.log('Cart Updated: ', quantity)
        } catch (error) {
            console.error('error updating cart', error)
        }
        setIsClicked(false)
    }
    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();

    }
    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">

                    <span>
                        Quantity: {isClicked ? (
                            <input type="text" className="quantity-input"
                                value={quantity}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}

                            />)
                            : (
                                <span className="quantity-label">{cartItem.quantity}</span>

                            )}
                    </span>

                    <span className="update-quantity-link link-primary" onClick={isClicked ? updateQuantity : handleUpdateClick} >
                        {isClicked ? 'save' : 'update'}
                    </span>
                    <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    )
}