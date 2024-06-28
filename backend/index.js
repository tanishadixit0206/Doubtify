import express from "express";
import bodyParser from "body-parser";
import authenticate from "./middleware/Authenticate.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as UserLogin } from "./routes/Login.js";
import { requireAuth } from "./middleware/requireAuth.js";
import {router as Home} from "./routes/Home.js"

const app = express();
const port = 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json({limit:'1000mb'}));

app.use("/", UserLogin);
app.use("/home",Home)
app.listen(port, () => {
  console.log(`Server Started at port : ${port}`);
});
