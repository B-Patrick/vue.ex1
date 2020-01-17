let app = new Vue({
  el: "#app",

  // vue inctances

  data: {
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
    cart: 0
  },
  methods: {
    // increment the cart
    addToCart: function() {
      this.cart += 1;
    },
    removeFromCart: function() {
      this.cart -= 1;
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
    }
  }
});
