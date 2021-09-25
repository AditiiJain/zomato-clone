//importing express
import express from "express";

import cors from "cors";
import helmet from "helmet";

//initializing express 
const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));
zomato.use(helmet());
zomato.use(cors());

zomato.get("/",async(req,res)=>{
 return res.json({message:"i am aditi"});
})

zomato.listen(4000,()=>console.log("server running!"));