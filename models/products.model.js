module.exports = (mongoose) => {
  const Product = mongoose.model(
    "products",
    mongoose.Schema(
      {
        name: { type: String, require: true },
        category: { type: String, require: true },
        price: { type: Number, require: true },
        description: { type: String, require: true },
        manufacturer: { type: String, require: true },
        availableItems: { type: Number, require: true },
        imageURL: { type: String, require: true },
      },
      { timestamps: true }
    )
  );
  return Product;
};
