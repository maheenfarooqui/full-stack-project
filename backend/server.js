import app from "./src/app.js";
import connectDb from "./src/db/db.js"

connectDb()

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
