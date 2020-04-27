import db from '../db/db';


class ToDoController{
    //get all todos
    getAllToDos(req,res){
        res.status(200).send(
            {
                success:true,
                message:"todos retrieved successfully",
                todos:db
            }
        )
    };

    //get one todo 

    getToDo(req,res){
        const id = parseInt(req.params.id);
         
        //look for a todo with an id corresponding to that in the url
        db.map(
            (todo)=>{
                if(todo.id===id){
                    res.status(200).send({
                        success:true,
                        message:"todo retrived successfully",
                        todo
                    });
                }
            }
        );
    
        res.status(404).send({
            success:false,
            message:"Todo doesnot exist"
        });
    };

    //add a todo
    createToDo(req,res){
        if(!req.body.title){
            res.status(400).send({
                success:false,
                message:"title is required",
    
            });
        }
    
        else if(!req.body.description){
           res.status(400).send(
               {
                   success:false,
                   message:"description is required"
               }
           )
        }
    
    
        const todo={
            id :db.length +1,
            title:req.body.title,
            description:req.body.description
        }
    
        db.push(todo);
    
        return res.status(200).send({
            success:true,
            message:"todo added successfully",
            todo
        })
    };

    //update a todo
    UpdateToDo(req,res){

        const id =parseInt(req.params.id);
    
        let found_todo;
    
        let itemIndex;
    
        //find a todo with a given id
    
        db.map(
            (todo,index)=>{
                if (todo ===id){
                   found_todo=todo;
                   itemIndex=index;
                }
            }
        );
    
        if (!found_todo){
            res.status(400).send(
                {
                    success:false,
                    message:"todo not found"
                }
            )
        }
    
        //validate this req data
    
        if(!req.body.title){
            res.status(400).send(
              {
                  success:false,
                  message:"title is required"
              }
            );
        }
    
        else if (!req.body.title){
            res.status(400).send(
                {
                    success:false,
                    message:"description is required"
                }
            );
        }
    
        const updated_todo={
            id:found_todo.id,
            title:req.body.title||found_todo.title,
            description:req.body.description||found_todo.description
        }
    
        db.splice(itemIndex,1,updated_todo);
    
        return res.status(201).send(
            {
                success:true,
                message:"to do updated successfully",
                updated_todo
            }
        ); 
    };

    deleteToDo(req,res){
        const id =parseInt(req.params.id);
    
        db.map((todo,index)=>{
            if(todo.id===id){
                db.splice(index,1);
                res.status(200).send({
                    success:true,
                    message:"todo deleted successfully"
                    ,todo
                });
            }
    
        });
    
        res.status(404).send(
          {
              success:false,
              message:"todo not found",
          }
        );
        
    }

}

const todoController= new ToDoController();

export default todoController;