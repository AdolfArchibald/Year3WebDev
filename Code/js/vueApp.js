let webstore = new Vue({
    el: '#webstore',
    data: {
        message: 'Browse Available Lessons!', 
        cart:[],
        showProduct: true,
        products: products,

        order: {
            firstName: ``,
            lastName: ``,
            address: ``,
            city: ``,
            zip: ``,
            state: ``,
            method: `Home`,
            sendGift: `Send as a gift`,
            dontSendGift: `Do not send as a gift`
        },
        states: {
            AL: `Alabama`,
            AR: `Arizona`,
            CA: `California`,
            NV: `Nevada`
        }
    },
    methods: {
        addToCart(product)
        {
            this.cart.push(product.id);
        },
        showCheckout()
        {
            if (this.showProduct) {
                this.showProduct = false;
            }
            else {
                this.showProduct = true;
            }
        },
        cartCount(id) {
            let count = 0;
            for(let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        },
        canAddToCart(product) {
            return product.spaces > this.cartCount(product.id);
        },
        submitForm()
        {
            alert('Order submitted!');
        }
    },
    computed: {
        itemInCart()
        {
            return this.cart.length || "";
        },
        itemsLeft() {
            return this.product.availabilityInventory - this.itemInCart;
        },
        sortedProducts() {

            // the comparison function that defines the order
            function compare(a, b) {
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;
                return 0;
            }

            // sort the 'products' array and return it
            return this.products.sort(compare);
        }
    }
});