import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

interface TodoComponentProps {
    todo: any; // Replace 'any' with the actual type of your 'todo' prop
}

const Edit: FC<TodoComponentProps> = ({ todo }) => {

    const [model, setmodel] = useState(false);

    // Event handler to toggle modal visibility
    const handleEditButtonClick = () => {
        setmodel(!model);
    };

    const handleEditData = ()=> {
        axios.put('http://localhost:5000/updatetodos/${}')
    }

    return (
        <>

            <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"
                onClick={handleEditButtonClick}>
                Edit
            </button>

            <div id="popup-modal" tabIndex={-1} className={`${model ? 'block' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700  border-2 border-gray-900">
                        <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-red-600 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal"
                            onClick={handleEditButtonClick}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">TODO</h3>
                            <div className='mb-5'>
                                <input type="text" className='w-8/12 border-black border-2 p-1' value={todo.description} />
                            </div>
                            <button data-modal-hide="popup-modal" type="button" className="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                            onClick={handleEditData}>
                                Edit
                            </button>
                            <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={handleEditButtonClick}>No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Edit;