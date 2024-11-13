import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import commandRoutes from "./routes/command.route.js"
import dotenv from "dotenv"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI)
    console.log(`Connected to MongoDB database!!`)
} catch (error) {
    console.log(error);
}

app.use(bodyParser.json());
app.use('/api/v1/commands',commandRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

