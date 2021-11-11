module.exports = (mongoose) => {
  const Address = mongoose.model(
    "addresses",
    mongoose.Schema(
      {
        city: { type: String, require: true },
        landmark: { type: String, require: true },
        name: { type: String, require: true },
        contactNumber: { type: Number, require: true },
        state: { type: String, require: true },
        street: { type: String, require: true },
        zipCode: { type: String, require: true },
        user: { type: Object },
      },
      { timestamps: true }
    )
  );
  return Address;
};
