
import axios from 'axios'

export default{
  
 
    //actions
    addItem({commit},item){
        
        axios.post("http://localhost:8888/Goods/addBookPickGood",item).then(
            res=>{
                alert("添加成功");

            }
          ).catch(reason => {
             alert(reason);
              });
    },
    addItemFromBoss({commit},item){
        
        axios.post("http://localhost:8888/packages/addPackage",item).then(
            res=>{
               
             commit("addTodos1",item);
            }
          ).catch(reason => {
             alert(reason);
              });
    },
    
    getAllItem({commit}){
     commit("cleanTodo");
    axios.get("http://localhost:8888/packages").then(
     res=>{
         if(res.data.length>0){
             console.log(res.data);
            res.data.map(e=>{      
                let item={};
                item.id=e.id;
                item.customerName=e.customerName;
                item.phone =e.phone;
                item.state=e.state;
                item.loaclDateTime=e.loaclDateTime     
                commit("addTodos1",item);
            }) 
         }
        
     }
   ).catch(reason => {
                alert(reason)
    });
    },
    getItemByState({commit},state){

        axios.get("http://localhost:8888/packages?state="+state).then(
         res=>{
            
                
                // res.data.map(e=>{      
                //     let item={};
                //     item.id=e.id;
                //     item.customerName=e.customerName;
                //     item.phone =e.phone;
                //     item.state=e.state;
                //     item.loaclDateTime=e.loaclDateTime     
                    
                // }) 
                commit("changeTodos",res.data);
            
            
            
         }
       ).catch(reason => {
                    alert(reason)
        });
        },

    changeState({commit},item){
        if(item.state!="未预约"){
            axios.put("http://localhost:8888/packages/"+item.id,item).then(
                e=>{
                   commit("changeState",item);
    
                }
            ).catch(reason => {
             alert(reason)
           });  
        }
     
    }

     
}
