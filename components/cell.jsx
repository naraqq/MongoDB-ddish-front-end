import React, { useState } from 'react';
import axios from 'axios';


function Cell(props) {
    let text = props.data.text
    let index = props.index
    let id = props.data._id
    const [newText, setnewText] = useState("");
    const [editable, setEditable] = useState(false);
    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:5000/list/${id}`)
        .then(res => props.func(!props.stats))
        .catch(err => {
        return err
        })
    }
    const showEdit = () => {
        setEditable(true)
    }
    const data = {
        text: newText,
        status: true
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/list/${id}`, data)
            .then(res => {
                props.func(!props.stats), setEditable(false)
        } )
        .catch(err => {
        return err
        })
    }

    return ( 
        <div className='h-full py-2 w-full flex items-center justify-between gap-2 border-b relative'>
            <div className='flex gap-3'>
                <span className='px-2 w-[20px] h-[20px] border rounded-full flex items-center justify-center'>{index}</span>
                {text}
                {
                    editable ? 
                        <form onSubmit={handleUpdate} className='absolute bg-white h-full w-full top-0'>
                            <input onChange={(e) => {
                                setnewText(e.target.value)
                            }} type="text" className='h-full w-11/12 px-2' autoFocus/>
                            <i  onClick={() => {
                                setEditable(false)
                            }} className="bi bi-x-circle-fill hover:text-[16px]"></i>
                        </form> : null
                }
            </div>
            <div className='flex gap-3'>
            <i onClick={showEdit} className="bi bi-pencil-square"></i>
            <i onClick={handleDelete} className="bi bi-trash active:text-red-400 rounded-full"></i>
            </div>

        </div>
     );
}

export default Cell;