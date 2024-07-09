import { connect } from "mongoose";
import { db } from "./constant";

export const dbConfig = async () => {
  try {
    await connect(db).then(() => {
      console.clear();
      console.log("DB connected 🚀🚀");
    });
  } catch (error) {
    console.log(error);
  }
};
