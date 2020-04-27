import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';



const app =express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(router);

const port= process.env.PORT||5000;

app.listen(port,()=>{
   console.log("Server running on port " +port);
   
});