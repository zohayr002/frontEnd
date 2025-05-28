import desserts from "./data.js";
import Dessert from "./dessertObject.js";

const productsCon = document.querySelector(".productsContainer");
const billContent = document.querySelector(".billContent");
const productsNumber = document.querySelector(".productsNumber");
const factureCon = document.querySelector(".facturCon");

let quantity = 0
let total = 0
let isQuantity = false



const listObjets = []

function generateProducts() {
  desserts.forEach((dessert) => {
        const des = new Dessert(dessert.image.desktop,dessert.name,dessert.category,dessert.price)
        listObjets.push(des)
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = des.cardDessert().trim()
        productsCon.appendChild(card);
    });
}

generateProducts()
const btns = document.querySelectorAll(".addToCart");

btns.forEach((btn,index)=>{
    btn.addEventListener("click", ()=>{
        const nameElem = btn.parentElement.nextElementSibling.querySelector(".productName").textContent
        document.querySelectorAll(".card")[index].classList.add("selected")
        btn.classList.add("no-hover")
        btn.style.backgroundColor = "hsl(14, 86%, 42%)"
        btn.style.border = "1px solid hsl(14, 86%, 42%)"
        btn.innerHTML = `
            <div name="${nameElem}" class="addSelect">
                <div name="${nameElem}" class="oper mines">
                <img src="assets/images/icon-decrement-quantity.svg" alt="">
                </div>
                <p class="quantity">1</p>
                <div name="${nameElem}" class="oper plus">
                    <img src="assets/images/icon-increment-quantity.svg" alt="">
                </div>    
            </div>
        `
        choose(nameElem)
        btn.querySelector(".plus").addEventListener("click",(e)=>{
            e.stopPropagation();
            augmenterQuantity(nameElem,index)
        })
        btn.querySelector(".mines").addEventListener("click",(e)=>{
            e.stopPropagation();
            diminuerQuantity(nameElem,index)
            calculerValue()
        })
    })
})


function choose(name){
    for(let des of listObjets){
        if (des.name == name){
            if(!des.selected){
                des.selected = true
                des.quantity++
                if(quantity == 0){
                    billContent.innerHTML = ``
                }
                const cardSelected = document.createElement("div")
                cardSelected.classList.add("selectedCard")
                cardSelected.setAttribute("name",name)
                cardSelected.innerHTML = des.cardSelected().trim()
                billContent.appendChild(cardSelected)
                calculerValue()
                const x = document.querySelector(`.closeDiv[name="${name}"]`)
                x.addEventListener("click",(e)=>{
                    e.preventDefault()
                    removeFromCart(name)
                    calculerValue()
                })
            }
        }
    }
}
function calculerValue(){
    quantity = 0;
    for(let des of listObjets){
        if(des.selected){
            quantity += parseFloat(des.quantity)
        }
    }
    productsNumber.textContent = quantity
    isEmpty(quantity)
    calculerTotal()
}
function calculerTotal(){
    const productTotal = billContent.nextElementSibling.querySelector(".finalPrice")
    total = 0;
    for(let des of listObjets){
        if(des.selected){
            total += parseFloat(des.calculerTotal())
        }
    }
    productTotal.textContent = total
}

function augmenterQuantity(name, index) {
    for (let des of listObjets) {
        if (des.name === name) {
            des.quantity++;
            calculerValue()
            const cards = document.querySelectorAll(".card");
            if (index < cards.length) {
                const card = cards[index];
                const button = card.querySelector(`.addSelect[name="${name}"]`);
                const quantElem = button.firstElementChild.nextElementSibling
                if (quantElem) {
                    quantElem.textContent = des.quantity;
                }
            }

            const billItem = billContent.querySelector(`.selectedCard[name="${name}"]`);
            if (billItem) {
                const selectedQuantity = billItem.querySelector(".selectValue");
                const selectedPrice = billItem.querySelector(".selectquantity");
                
                if (selectedQuantity) {
                    selectedQuantity.textContent = des.quantity;
                }
                if (selectedPrice) {
                    selectedPrice.textContent = `${des.calculerquantity()}`;
                }
            }

        }
    }
}

function diminuerQuantity(name, index) {
    for (let des of listObjets) {
        if (des.name === name) {
            if (des.quantity > 1) {
                des.quantity--;

                const cards = document.querySelectorAll(".card");
                if (index < cards.length) {
                    const card = cards[index];
                    const button = card.querySelector(`.addSelect[name="${name}"]`);
                    const quantElem = button.firstElementChild.nextElementSibling;
                    if (quantElem) {
                        quantElem.textContent = des.quantity;
                    }
                }

                const billItem = billContent.querySelector(`.selectedCard[name="${name}"]`);
                if (billItem) {
                    const selectedQuantity = billItem.querySelector(".selectValue");
                    const selectedPrice = billItem.querySelector(".selectquantity");
                    
                    if (selectedQuantity) {
                        selectedQuantity.textContent = des.quantity;
                    }
                    if (selectedPrice) {
                        selectedPrice.textContent = `${des.calculerquantity()}`;
                    }
                }
            } else {
                removeFromCart(name, index);
            }

        }
    }
}

function removeFromCart(name, index) {
    for (let des of listObjets) {
        if (des.name === name) {
            des.selected = false;
            des.quantity = 0;
            
            const cards = document.querySelectorAll(".card");
            cards.forEach(card =>{
                const elemName = card.lastElementChild.firstElementChild.nextElementSibling.textContent
                if(elemName == name){
                    card.classList.remove("selected");
                    const btn = card.querySelector(".addToCart");
                    btn.classList.remove("no-hover");
                    btn.style.backgroundColor = "";
                    btn.style.border = "";
                    btn.innerHTML = `
                        <div class="addToCartImg">
                            <img src="assets/images/icon-add-to-cart.svg" alt="" />
                        </div>
                        <p>Add to Cart</p>
                    `;
               }
            })
            
            const billItem = billContent.querySelector(`.selectedCard[name="${name}"]`);
            if (billItem) {
                billItem.remove();
            }
            
            break;
        }
    }
}

function isEmpty(quantity){
    if(quantity == 0){
        billContent.innerHTML = `
            <img src="assets/images/illustration-empty-cart.svg" style="width: 100px;margin-top: 35px;" alt="">
            <p style="color: var(--rose-300);">Your added items will appear here.</p>
        `
        document.querySelector(".resultFinal").style.display = "none"
    }else{
        if(document.querySelector(".resultFinal")){
            document.querySelector(".resultFinal").style.display = "flex"
        }
        if(!isQuantity){
            const resultFinal = document.createElement("div")
            resultFinal.classList.add("resultFinal")
            resultFinal.innerHTML = `
                <div class="inlinediv">
                    <p class="normal">Order quantity</p>
                    <h3 class="finalPriceDiv">$<span class="finalPrice">40.08</span></h3>
                </div>
                <div class="secondInlineDiv">
                    <div class="carbonDiv">
                    <img src="assets/images/icon-carbon-neutral.svg" alt="">
                    </div>
                    <span style="font-size: 12px;">This is a <strong>carbon-neutral</strong> delivery</span>
                </div>
                <button class="confirmOrder">Confirm Order</button>
            `
            factureCon.appendChild(resultFinal)
            isQuantity = true
        }
        
    }
    
}

