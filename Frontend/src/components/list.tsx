import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import  Edit  from "./edit";

const List: FC = () => {

    const [list, setlist] = useState<string[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5000/viewtodos').then((res) => {
            if (res.status === 200) {
                console.log(res.data, "date here");
                setlist(res.data)
            } else {
                console.log(res.data);
            }
        })
    }, [])

    console.log(list, "list here");

    return (
        <>
            <div className="flex justify-center items-center mt-10">
                <table className="table-auto border border-black-400 shadow-md w-full">
                    <thead>
                        <tr>
                            <th className="p-2 border-b">No.</th>
                            <th className="p-2 border-b">TODO</th>
                            <th className="p-2 border-b">Edit</th>
                            <th className="p-2 border-b">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item: any) => (
                            <tr key={item.todo_id}>
                                <td className="p-2 border">{item.todo_id}</td>
                                <td className="p-2 border">{item.description}</td>
                                <td className='p-3 border'><Edit todo={item}/></td>
                                <td className='p-3 border'><button className='bg-red-500 w-1/3 hover:bg-red-800'>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default List;