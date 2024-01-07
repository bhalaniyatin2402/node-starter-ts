import express, { Request, Response } from "express";
import cors from 'cors'
import { config } from "dotenv";

import { connectToDB } from "./config/db.config";

config()
connectToDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
  res.send('done')
})

// importing all routes
import userRoutes from "./routes/user.routes";
import errorMiddleware from "./middlewares/error.middleware";

app.use('/api/v1/user', userRoutes)

// handle all the errors
app.use(errorMiddleware)

const port: number = Number(process.env.PORT) || 3000
app.listen(port, async () => {
  console.log(`server is running on port: ${port}`);
})
