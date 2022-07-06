import regeneratorRuntime from "regenerator-runtime";
import 'dotenv/config';
import app from "./server";
import "./db";

const port = process.env.PORT || 4000;
const handleListen = () => console.log(`Listening on : ✅ http://localhost:${port}/`);

app.listen(port, handleListen);