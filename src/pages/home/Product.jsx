import axios from 'axios'
import { formatMoney } from '../../utils/money'
import { useState, useEffect } from 'react';
export function Product({ product, loadCart }) {
    const [quantity, setQuantity] = useState(1);
    const [showClick, setShowClick] = useState(false)
    useEffect(() => {
        if (!showClick) return;

        const timer = setTimeout(() => {
            setShowClick(false);
        }, 1000);

        // Cleanup function clears the timer if clicked again or component unmounts
        return () => clearTimeout(timer);
    }, [showClick]);
    const addToCart =
        async () => {
            try {
            await axios.post('/api/cart-items', {
                productId: product.id,
                quantity
            })
            await loadCart();
            setShowClick(true);
        } catch(error){
            console.error('error adding to cart:', error)
        }

        }
    const selectQuantity = (event) => {
        const quantitySelected = Number(event.target.value)
        setQuantity(quantitySelected)


    }


    return (
        <div className="product-container">
            <div className="product-image-container">
                <img className="product-image"
                    src={product.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                {formatMoney(product.priceCents)}
            </div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={selectQuantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart">
                <img src="images/icons/checkmark.png" />
                Added
            </div>

            <button className="add-to-cart-button button-primary"
                onClick={addToCart}>
                {showClick ? '  ✅ Added 😀' : 'Add to Cart'}

            </button>
        </div>

    )
}