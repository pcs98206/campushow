const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect("mongodb://127.0.0.1:27017/campushow", {
    useNewUrlParser: true,
});

const handleError = (error) => console.log(`Error : ${error}`);
const handleOpen = () => console.log("✅ Connected to DB");

db.on("error", handleError);
db.once("open", handleOpen);