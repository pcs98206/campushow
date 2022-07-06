import regeneratorRuntime from "regenerator-runtime";
import 'dotenv/config';
import app from "./server";
import "./db";

const PORT = process.env.PORT || 3000;
const handleListen = () => console.log(`Listening on : ✅ http://localhost:${PORT}/`);

app.listen(PORT, handleListen);