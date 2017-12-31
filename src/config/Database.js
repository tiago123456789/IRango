import mongoose from "mongoose";
import configuracoes from "./Configuration";

mongoose.Promise = Promise; //Defined lib promise using in mongoose.

/**
 * @description Create connection com dabase(MONGODB).
 */
mongoose.connect(configuracoes.URL_CONNECT_DB, { useMongoClient: true });