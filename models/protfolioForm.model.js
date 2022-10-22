module.exports = (mongoose) => {
    const protfolioForm = mongoose.model(
        'protfolioForm',
        mongoose.Schema(
            {
                name: { type: String, required: true },
                email: { type: String, required: true },
                message: { type: String, required: true }
            },
            { timestamps: true }
        )
    );
    return protfolioForm;
}