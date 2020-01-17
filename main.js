// Refactoring the whole code to use Components:

// creating product review component: using Forms with v-model:

Vue.component("product-review", {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <!-- Display errors -->
        <p v-if="errors.length">
            <b> Please correct the following error(s): </b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>


        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>

        <p>
            <label for="review"> Review: </label>
            <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
            <label for="rating">Rating: </label>
            <!-- v-model.number : modifier for numbers -->
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <p>Would you recommend this product?</P>
        <label> Yes
            <input type="radio" value="Yes" name="answer" v-model="recommend" />
        </label>
        <label> No
            <input type="radio" value="No" name="answer" v-model="recommend" />
        </label>


        <p>
            <input type="submit" value="Submit">
        </p>

    </form>
    `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      // add errors array to collect errors:
      errors: []
    };
  },
  methods: {
    onSubmit() {
      // build our own costume error forms: here we will catch the errors
      this.errors = [];
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        };
        // to send it to the parent product component:
        this.$emit("review-submitted", productReview);
        // to rest the form when click submit
        (this.name = null),
          (this.review = null),
          (this.rating = null),
          (this.recommend = null);
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommend) this.errors.push("Recommendation required.");
      }
    }
  }
});

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

// main product component:

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
    <p v-if="inStock">
      In Stock
      <span v-if="onSale && inStock"> {{ sale }}</span>
    </p>

    <!-- Binding outofstock to a class -->
    <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>

    <!-- Adding shipping status if premium is true with shipping computed property-->
    <p>Shipping: {{ shipping }}</p>

    <!-- Adding the Product details Component in here -->
    <product-details :details="details"> </product-details>

    <ul class="sizes">
      <li v-for="size in sizes">{{ size }}</li>
    </ul>

    <!-- list rendering / showing product variants
        it's recommended to use key attribute when dealing with kinds of lists to let vue keeps track of the identies -->

    <!-- using v-on OR @ as shorthand to activate hover function on colors-->
    <!-- Class and Style binding -->

    <!-- refactoring code -->
    <div
      v-for=" (variant, index) in variants"
      :key="variant.variantId"
      class="color-box"
      :style="{ backgroundColor: variant.variantColor }"
      @mouseover="updateProduct(index)"
    ></div>

    <!-- Adding Cart / and Event handling v-on / time to use methods to increment the Cart -->
    <!-- Class Binding -->
    <button
      v-on:click="addToCart"
      :disabled="!inStock"
      :class="{disabledButton: !inStock}"
    >
      Add to Cart
    </button>

    <button
      v-on:click="removeFromCart"
      :disabled="!inStock"
      :class="{disabledButton: !inStock}"
    >
      Remove Item
    </button>
  </div>
  <div>
      <h2>Reviews</h2>
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul>
        <li v-for="review in reviews"> 
            <p>{{ review.name }}</p>
            <p> Rating: {{ review.rating }} </p>
            <p> {{ review.review }} </p>
        </li>
      <ul>
  </div>

  <product-review @review-submitted="addReview"></product-review>
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
      sizes: [40, 42, 43, 45, 46],
      reviews: []
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
    },
    addReview: function(productReview) {
      this.reviews.push(productReview);
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
