module.exports = (mongoose) => {
  const Order = mongoose.model(
    "orders",
    mongoose.Schema({
      amount: { type: Number, require: true },
      orderDate: { type: Date, default: Date.now },
      product: { type: Object, require: true },
      address: { type: Object, require: true },
      user: { type: Object, require: true },
      quantity: { type: Number, require: true },
    })
  );
  return Order;
};
