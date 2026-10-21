import dotenv from "dotenv";
import app from "./src/app.js";
import connectDb from "./src/db/db.js";

dotenv.config();
connectDb();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
