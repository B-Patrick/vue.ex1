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
        variantColor: "green"
      },
      {
        variantId: 2235,
        variantColor: "blue"
      }
    ],
    sizes: [40, 42, 43, 45, 46]
  }
});
