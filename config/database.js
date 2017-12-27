import mongoose from "mongoose";

mongoose.Promise = Promise; //Defined lib promise using in mongoose.

/**
 * @description Create connection com dabase(MONGODB).
 */
mongoose.connect("mongodb://mongo/irango", { useMongoClient: true });