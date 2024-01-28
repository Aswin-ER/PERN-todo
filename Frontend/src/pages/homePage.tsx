import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const HomePage: FC = () => {

   const [description, setDescription] = useState<string>("");

   const [data, setdata] = useState<string[]>([]);

   const [list, setlist] = useState<{ todo_id: number, description: string }[]>([]);

   const [toEdit, setToEdit] = useState<{ todo_id: number, description: string } | null>(null);

   const [toDelete, setToDelete] = useState<{ todo_id: number, description: string } | null>(null);

   const [model, setmodel] = useState(false);

   const [updated, setupdated] = useState<boolean>(false);

   const onSubmitForm = async (e: any) => {
      e.preventDefault();
      try {
         const data = await axios.post('http://localhost:5000/todos', { description });
         if (data.status === 200) {
            toast.success('New todo Added successfully 🤝')
            setdata(data.data);
         } else {
            console.log(data.data);
            toast.error("Error in Adding todo ⚠️")
         }
      } catch (error) {
         console.log(error);
         toast.error("Internal sever Error ⚠️")

      }
   }

   const handleEditData = (id: number, des: string) => {
      try {
         const description = des
         axios.put(`http://localhost:5000/updatetodos/${id}`, { description }).then((res) => {
            if (res.status === 200) {
               toast.success("updated todo successfully");
               setupdated((prev) => !prev);
               setmodel((prev) => !prev)
            } else {
               toast.error("error updating todo");
            }
         });

      } catch (error) {
         console.log(error);
         toast.error("Internal server error");
      }
   }

   const handleDeleteData = (id: number) => {
      try {
         axios.delete(`http://localhost:5000/deletetodos/${id}`).then((res) => {
            if (res.status === 200) {
               toast.success("Deleted todo successfully");
               setupdated((prev) => !prev);
               setmodel((prev) => !prev)
            } else {
               toast.error("error updating todo");
            }
         });

      } catch (error) {
         console.log(error);
         toast.error("Internal server error");
      }
   };

   const ModalModal = ({ id, description }: { id: number, description: string }) => {
      const [des, setDes] = useState(description);
      const todoFile = list.filter(x => x.todo_id === id)
      return (
         <>
            <div id="popup-modal" tabIndex={-1} className={`${model ? 'block' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
               <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700  border-2 border-gray-900">
                     <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-red-600 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal"
                        onClick={() => setmodel(!model)}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                     </button>
                     <div className="p-4 md:p-5 text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">TODO</h3>
                        <div className='mb-5'>
                           <input type="text" className='w-8/12 border-black border-2 p-1' value={des} onChange={(e) => {
                              const tempValue = e.target.value
                              console.log({ tempValue });
                              setDes(tempValue)


                           }} />
                        </div>
                        <button data-modal-hide="popup-modal" type="button" className="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                           onClick={() => handleEditData(id, des)}>
                           Edit
                        </button>
                        <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => setmodel((item) => !item)}>No, cancel</button>
                     </div>
                  </div>
               </div>
            </div>

         </>
      )
   }

   const DeleteModal = ({ id, description }: { id: number, description: string }) => {
      return (
         <>
            <div id="popup-modal" tabIndex={-1} className={`${model ? 'block' : 'hidden'} items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-50`}>
               <div className="relative p-4 w-full max-w-md">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border-2 border-gray-900">
                     <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-red-600 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal"
                        onClick={() => setmodel(!model)}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                     </button>
                     <div className="p-4 md:p-5 text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure ?</h3>
                        <div className='mb-5'>
                           <input type="text" className='w-8/12 border-black border-2 p-1' value={description} disabled/>
                        </div>
                        <button data-modal-hide="popup-modal" type="button" className="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                           onClick={() => handleDeleteData(id)}>
                           Delete
                        </button>
                        <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => setmodel((item) => !item)}>No, cancel</button>
                     </div>
                  </div>
               </div>
            </div>

         </>
      )
   }

   useEffect(() => {
      axios.get('http://localhost:5000/viewtodos').then((res) => {
         if (res.status === 200) {
            setlist(res.data)
         } else {
            console.log(res.data);
         }
      })
   }, [data, updated]);

   return (
      <>
         {/* Adding Todos  */}
         <h1 className='text-5xl font-bold'>Todo List</h1>
         <form action="" className='d-flex mt-5' onSubmit={onSubmitForm}>
            <input type="text" value={description} className='border-4 border-black mx-4 w-1/2 p-1' onChange={e => setDescription(e.target.value)} />
            <button className='btn bg-green-600 p-2 font-bold' type='submit'>Add Todo</button>
         </form>

         {/* Listing Todos */}
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
                        {/* Edit Modal */}
                        <td className='p-3 border' >
                           <button onClick={() => {
                              setToEdit(item)
                              setmodel((modal) => !modal)
                           }} className='bg-yellow-500 w-1/3 hover:bg-yellow-800'> Edit</button></td>

                        {/* Delete Modal */}
                        <td className='p-3 border'><button className='bg-red-500 w-1/3 hover:bg-red-800'
                           onClick={() => { setToDelete(item); setmodel((model) => !model) }}>Delete</button></td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Edit Modal  */}
         {
            toEdit ?
               <ModalModal id={toEdit?.todo_id} description={toEdit?.description} /> : null
         }

         {/* Delete Modal  */}
         {
            toDelete ?
               <DeleteModal id={toDelete?.todo_id} description={toDelete?.description} /> : null
         }
      </>
   )
}

export default HomePage;