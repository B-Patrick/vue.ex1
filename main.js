let app = new Vue({
  el: "#app",

  // vue inctances

  data: {
    product: "Socks",
    image: "./assets/green-socks.jpg",
    inStock: true,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./assets/green-socks.jpg"
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./assets/blue-socks.jpg"
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
    updateProduct: function(variantImage) {
      this.image = variantImage;
    }
  }
});
