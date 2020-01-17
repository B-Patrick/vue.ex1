// Refactoring the whole code to use Components:

// Creating new component presenting details only:

Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <!-- List Rendering using v-for/ showing product details -->
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `
});

Vue.component("product", {
  props: {
    premium: Boolean,
    required: true
  },
  template: `
    <div class="product">
    <div class="product-image">
      <!-- Binding src using v-bind -->
      <img v-bind:src="image" alt="socks" />
    </div>
    <div class="product-info">
        <!-- Using Computed -->
      <h1>{{ title }}</h1>

      <!-- Conditional rendering using v-if -->
      <p v-if="inStock">In Stock
        <span v-if="onSale && inStock"> {{ sale }}</span>
      </p>

      <!-- Binding outofstock to a class -->
      <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>

      <!-- Adding shipping status if premium is true with shipping computed property-->
      <p>Shipping: {{ shipping }} </p>
      

      <!-- Adding the Product details Component in here -->
      <product-details :details="details"> </product-details>

      <ul class="sizes">
          <li v-for="size in sizes"> {{ size }} </li>
      </ul>

      <!-- list rendering / showing product variants
        it's recommended to use key attribute when dealing with kinds of lists to let vue keeps track of the identies -->


        <!-- using v-on OR @ as shorthand to activate hover function on colors-->
        <!-- Class and Style binding -->

        <!-- refactoring code -->
      <div v-for=" (variant, index) in variants" 
        :key="variant.variantId"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)"> 
      </div>

      <!-- Adding Cart / and Event handling v-on / time to use methods to increment the Cart -->
      <!-- Class Binding -->
      <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}"> Add to Cart</button>
      
      <button v-on:click="removeFromCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Remove Item</button>
      
      
      </div>
    </div>
  </div>
    `,
  // vue inctances

  data() {
    return {
      brand: "Vue",
      product: "Socks",
      // refactoring code
      //image: "./assets/green-socks.jpg",
      selectedVariant: 0,
      // since we have variant qnantity, we refactor instock to computed
      // inStock: true,
      onSale: true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: "./assets/green-socks.jpg",
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "./assets/blue-socks.jpg",
          variantQuantity: 0
        }
      ],
      sizes: [40, 42, 43, 45, 46]
    };
  },
  methods: {
    // increment the cart
    addToCart() {
      // here we will use $emit to make the parent component listen to the event
      // we add the id by targetting the selected variant as a second parameter
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
    // updating product after refactoring
    updateProduct: function(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    // refactor the deleted image from data into computed property
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    // when hovering over colors will show the availability of the poroduct depending on its quantity
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    sale() {
      if (this.onSale) {
        return " / On Sale!";
      }
      return " / not on sale";
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return "$2.99";
    }
  }
});

let app = new Vue({
  el: "#app",
  data: {
    // check if the user is premium and pass it as prop
    premium: true,
    cart: []
  },
  methods: {
    incCart(id) {
      // to know what was added to the cart, make cart an array and pass the id to incCart
      this.cart.push(id);
    },
    decCart(id) {
      this.cart.pop(id);
    }
  }
});
