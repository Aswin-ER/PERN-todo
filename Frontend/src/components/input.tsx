import React, { FC, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Input: FC = () => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/todos', { description });
            if (response.status === 200) {
                console.log(response.data);
                toast.success('New todo Added successfully 🤝')
            } else {
                console.log(response.data);
                toast.error("Error in Adding todo ⚠️")
            }
        } catch (error) {
            console.log(error);
            toast.error("Internal sever Error ⚠️")

        }
    }

    return (
        <>
            <h1>Todo List</h1>
            <form action="" className='d-flex mt-5' onSubmit={onSubmitForm}>
                <input type="text" value={description} className='border-4 mx-4' onChange={e => setDescription(e.target.value)} />
                <button className='btn bg-green-600 p-1' type='submit'>Add</button>
            </form>
        </>
    )
}

export default Input;