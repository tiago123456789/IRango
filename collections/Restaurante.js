import mongoose from "mongoose";

const restauranteSchema = mongoose.Schema({
    name: {
        type: String, required: ["Field name required!", true],
        min:["Field min 3 letters.", 3]
    },
    loc: {
        type: { type: String },
        coordinates: { type: [Number], required: ["Field coordinates required!", true] }  // [<longitude>, <latitude>]
    }
});

restauranteSchema.index({ "loc": "2dsphere" }); 

export default mongoose.model("restaurante", restauranteSchema);