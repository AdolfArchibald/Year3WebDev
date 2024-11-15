let webstore = new Vue({
    el: '#webstore',
    data: {
        message: 'Browse Available Lessons!',
        checkoutMessage: 'Checkout', 
        cart:[],
        showProduct: true,
        filterMenuVisible: false,
        filterStatus: '',
        sortedAscending: true,
        products: [],

        order: {
            firstName: ``,
            phoneNum: ``,
        },
    },
    created () {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            console.log("Trying to get data");
            try {
                // Fetch the data
                const response = await fetch('https://year3webdevserver.onrender.com/lessons');
        
                // Check if the response is successful (status 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                // Parse the JSON data from the response
                const data = await response.json();
        
                // Update the products with the lessons received
                this.products = data;
        
                // Log the fetched data to the console
                console.log(this.products);

            }
            catch (error) {
                console.log("Error fetching data", error);
            }
        },
        addToCart(product)
        {
            this.cart.push(product.id);
        },
        toggleFilterMenu()
        {
            this.filterMenuVisible = !this.filterMenuVisible;
        },
        setFilterStatus(status)
        {
            this.filterStatus = status;
            console.log(this.filterStatus);
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
        cartCount(id)
        {
            let count = 0;
            for(let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        },
        canAddToCart(product)
        {
            return product.spaces > this.cartCount(product.id);
        },
        removeFromCart(id)
        {
            const index = this.cart.lastIndexOf(id);
            if (index !== -1) {
                this.cart.splice(index, 1); // Remove one instance of the product ID from the end of the list
            }
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
        itemsLeft()
        {
            return this.product.availabilityInventory - this.itemInCart;
        },
        sortedProducts()
        {
            if (this.filterStatus === 'price' || this.filterStatus === '') {
                return this.products.sort((a, b) => this.sortedAscending ? a.price - b.price : b.price - a.price);
            }
        
            if (this.filterStatus === 'location') {
                return this.products.sort((a, b) => {
                    return this.sortedAscending ? a.location.localeCompare(b.location) : b.location.localeCompare(a.location);
                });
            }
        
            if (this.filterStatus === 'availability') {
                return this.products.sort((a, b) => {
                    return this.sortedAscending ? (a.spaces - this.cartCount(a.id)) - (b.spaces - this.cartCount(b.id)) : (b.spaces - this.cartCount(b.id)) - (a.spaces - this.cartCount(a.id));
                });
            }
        
            if (this.filterStatus === 'subject') {
                return this.products.sort((a, b) => {
                    return this.sortedAscending ? a.subject.localeCompare(b.subject) : b.subject.localeCompare(a.subject);
                });
            }
        
            return this.products;
        },        
        cartProducts()
        {
            return this.cart.map(id => this.products.find(product => product.id === id));
        },
        totalPrice()
        { 
            return this.cartProducts.reduce((total, product) => total + product.price, 0); 
        },
        enableCheckout()
        {
            // Check if the name contains only letters and spaces
            const namePattern = /^[A-Za-z\s]+$/;
            const isValidName = namePattern.test(this.order.firstName);
        
            // Remove spaces from the phone number and check if it contains only numbers and is longer than 5 characters
            const phoneNumber = this.order.phoneNum.replace(/\s+/g, '');
            const phonePattern = /^[0-9]+$/;
            const isValidPhone = phonePattern.test(phoneNumber) && phoneNumber.length >= 5;
        
            // Return true if both name and phone number are valid
            return isValidName && isValidPhone;
        }
    }
});