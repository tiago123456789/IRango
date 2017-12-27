import mongoose from "mongoose";

const restauranteSchema = mongoose.Schema({
    name: {
        type: String, required: ["Field name required!", true]
    },
    loc: {
        type: { type: String },
        coordinates: [Number],  // [<longitude>, <latitude>]
    }
});

restauranteSchema.index({ "loc": "2dsphere" }); 

export default mongoose.model("restaurante", restauranteSchema);