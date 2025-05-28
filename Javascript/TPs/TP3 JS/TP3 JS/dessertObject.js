class Dessert{
    constructor(image, name, category, price){
        this.image = image;
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = 0;
        this.totalPrice = 0;
        this.selected = false;
    }

    calculerTotal(){
        this.totalPrice = this.price * this.quantity
        return this.totalPrice.toFixed(2)
    }
    cardDessert(){
        return `
            <div class="top">
                <div class="cover-img">
                    <img src=${this.image} alt="" />
                </div>
                <button class="addToCart">
                    <div class="addToCartImg">
                        <img src="assets/images/icon-add-to-cart.svg" alt="" />
                    </div>
                    <p>Add to Cart</p>
                </button>
            </div>
            <div class="bottom">
                <div class="productTitle">${this.category}</div>
                <div class="productName">${this.name}</div>
                <div class="productPrice"><span>$</span>${this.price}</div>
            </div>
            `;
    }

    cardSelected(){
        return `
            <p class="selectName">${this.name}</</p>
            <div class="lineSelect">
                <div class="selectQuantity">x<span class="selectValue">${this.quantity}</</span></div>
                <div class="selectPriceDiv">@ $<span class="selectPrice">${this.price}</</span></div>
                <div class="selectTotalDiv">$<span class="selectTotal">${this.calculerTotal()}</</span></div>
            </div>
            <div name="${this.name}" class="closeDiv">
                <img src="assets/images/icon-remove-item.svg" alt="">
            </div>
        `
    }
    
    
}
export default Dessert