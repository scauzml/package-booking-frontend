
export default{
         cleanTodo(state){
           state.todos1=[];  
         },
        addTodos1 (state,data) {  
         state.todos1.push(data);
         state.todos=state.todos1.map((e)=>{
            return e;
        });

        },
        changeTodos (state,data) {  
            state.todos=data;
            state.todos=state.todos.map((e)=>{
               return e;
           });
   
           },

        remove(state,todo){
            let index=state.todos1.indexOf(todo);
            state.todos1.splice(index, 1);
            let index1=state.todos.indexOf(todo);
            state.todos.splice(index1, 1);
        },
        changeState(state,item){
               
            state.todos1=state.todos1.map(e=>{
                if(e.id===item.id){
                    e.state="已取件";
                }
                return e;
            })

        }


  
}
