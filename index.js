import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import './db.js'
import {AdminRouter} from './routes/auth.js'
import {studentRouter } from './routes/student.js'
import { bookRouter } from './routes/book.js'
import {Book} from './models/Book.js'
import {Student } from './models/Student.js'
import {Admin} from './models/Admin.js'

dotenv.config();
const app =express()
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://book-store-frontend1-03yo.onrender.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use(express.json())
app.use(cookieParser())
app.use('/auth',AdminRouter)
app.use('/student',studentRouter)
app.use('/book', bookRouter)

app.get('/dashboard',async (req,res) =>{
    try {
        const student =await Student.countDocuments()
        const admin =await Admin.countDocuments()
        const book =await Book.countDocuments()
        return res.json({ok:true,student,book,admin})

    } catch(err){
        return res.status(500).json({ error: 'Internal Server Error', details: err.message });

    }

})

const port = process.env.PORT || 3000; // Default to port 3000 if not specified
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
