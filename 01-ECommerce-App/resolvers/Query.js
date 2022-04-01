exports.Query = {
  hello: (parent, args, context) => "World",
  products: (parent, { filter }, { db }) => {
    let filteredProducts = db.products;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => {
          // return and collect ONLY the products that are currently ON SALE 
          return product.onSale;
        });
      }
      // IF there's avgRating filter that is WITHIN 1, 2,3 4, 5 
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          // search through ALL reviews
          db.reviews.forEach((review) => {
            // and then find the reviews FOR the target product
            if (review.productId === product.id) {
              // add that to sum 
              sumRating += review.rating;
              // count number of them
              numberOfReviews++;
            }
          });
          // this is the avg for the target Product 
          const avgProductRating = sumRating / numberOfReviews;
          // do they meet the avg minimum ? 
          return avgProductRating >= avgRating;
        });
      }
    }

    return filteredProducts;
  },
  product: (parent, { id }, { db }) => {
    return db.products.find((product) => product.id === id);
  },
  categories: (parent, args, { db }) => db.categories,
  category: (parent, { id }, { db }) => {
    return db.categories.find((category) => category.id === id);
  },
};
