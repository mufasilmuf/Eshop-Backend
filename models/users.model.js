module.exports = (mongoose) => {
  const User = mongoose.model(
    "users",
    mongoose.Schema(
      {
        email: { type: String, require: true },
        first_name: { type: String, require: true },
        last_name: { type: String, require: true },
        password: { type: String, require: true },
        phone_number: { type: Number, require: true },
        role: { type: String, default: "user" },
      },
      { timestamps: true }
    )
  );
  return User;
};
