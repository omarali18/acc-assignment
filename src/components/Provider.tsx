import React, {useReducer, useRef, useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { idText } from 'typescript';
import { fireEvent } from '@testing-library/react';



const rows = [1,2,3];
interface Todo {
    id: number,
    text: string
}
type ActionType = {type:"ADD"; text:string} | {type:"REMOVE"; id: number}

interface Provider {
    todo:string
  }



const Provider = () => {
    const [text, setText] = useState("")
    const inputRef = useRef<HTMLInputElement>(null);
    // const inputVal= inputRef.current.value;
    const [textArr,setTextArr] = useState<Todo[]>([]);
    const [finalArr,setFinelArr] = useState<Todo[]>([]);
  const [loading,setLoading] = useState(false);
    

    function reducer (state: Todo[], action: ActionType){
        switch(action.type){
            case "ADD":
                return[
                    ...state,
                    {
                        id: state.length,
                        text: action.text
                    }
                ];
                break;
            case 'REMOVE':
                    return state.filter((text:object,index:number)=> index !== action.id)   
                break;
        }
    }
    
    const [state, dispatch] = useReducer(reducer, []);

    useEffect(()=>{
        const getData = JSON.parse(localStorage.getItem('todo')!)
        setFinelArr([...textArr,getData])
        
    },[])
    // setFinelArr(textArr)
    console.log("todoval...", finalArr);

    useEffect(()=>{
        localStorage.setItem('todo',JSON.stringify(state))
        setTextArr(state)
    },[state])
   


    // const addToDo = (): void=>{
    //     if (inputRef.current) {
    //         const inputVal: string= inputRef.current.value;  
    //         const todoVal:any = JSON.parse(localStorage.getItem('todo')!)
       
        //    if(todoVal?.length){
        //      const list = [...todo,{todo : inputVal}];
        //      console.log(list)
        //     //  localStorage.setItem('todo',JSON.stringify(list))
        //      localStorage.setItem('todo',JSON.stringify(state))
        //     //  setTodo(list)
        //    }
        //    else{
        //      const todo =[{todo:inputVal}]
        //      localStorage.setItem('todo', JSON.stringify(state));
        //      setLoading(true)
        //    }
    //        inputRef.current.value="";
    //      }
    // }
// interface GetTodo {
//     todo: string
// }
    // useEffect(() => {
    //     const todoVal:GetTodo[] = JSON.parse(localStorage.getItem('todo')!)
    //     console.log("todoVal", todoVal);
        
    //     // setTodo(todoVal);
    //   },[inputRef,loading])

    //   const handleDelete = (id:number) => {
    //     const todoValue:any = JSON.parse(localStorage.getItem('todo')!)
    //     const filteredVal = todoValue.filter((it:object,index:number)=> index !== action.id)
    //     setTodo(filteredVal)
    //     localStorage.setItem('todo',JSON.stringify(filteredVal))
    //   }

    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{mt:5}}>
          <Grid item xs={12} sm={12} md={4} lg={4} sx={{border:1}}>
          <Box sx={{textAlign:"center", py:10}}>
            <TextField
                inputRef={inputRef}
                onChange={(e)=>setText(e.target.value)}
                sx={{width:'75%',}}
                id="filled-textarea"
                label="Write a text"
                placeholder="Write"
                multiline
                variant="filled"
            /> <br /> <br />
            <Button variant="contained" sx={{py:2}} onClick={()=>dispatch({type: 'ADD', text:text})}>Add ToDo</Button>
          </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={8} lg={8} sx={{border:1, display:"flex", justifyContent: 'center'}}>
            <Box sx={{width:'75%', my:4}}>
                <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">ToDo</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {state?.length &&
              state?.map((taxt,index) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="right">{index}</TableCell>
                        <TableCell align="right">{taxt.text}</TableCell>
                        <TableCell align="right"><Button variant="contained" onClick={()=>dispatch({type: 'REMOVE', id: index})}>Delete</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Box>
          </Grid>
         
        </Grid>
      </Box>
    );
};

export default Provider;