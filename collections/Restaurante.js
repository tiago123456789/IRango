import mongoose from "mongoose";

const restauranteSchema = mongoose.Schema({
    name: {
        type: String, required: ["Field name required!", true]
    }
});

export default mongoose.model("restaurante", restauranteSchema);