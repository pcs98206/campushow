const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
});

const handleError = (error) => console.log(`Error : ${error}`);
const handleOpen = () => console.log("✅ Connected to DB");

db.on("error", handleError);
db.once("open", handleOpen);