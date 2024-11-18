const mongoose = require('mongoose');

const suscriberSchema = mongoose.Schema({
        firstName: {
                type: String,
                required: true,
        },
        lastName: {
                type: String,
                required: true,
        },
        email: {
        type: String,
        required: [true, "Please add the user email address"],  // Corrected error message
        unique: [true, "Email address already taken"]  // Corrected error message
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Suscriber', suscriberSchema);
