import React from 'react'
interface Prop {
    onClick?: React.MouseEventHandler
}
 const Add = ({onClick}:Prop) => {
  return (
    <div onClick={onClick}  className="w-full min-w-[30%] h-full   border-2 flex justify-center items-center p-4 gap-3 rounded-lg">
      <div className="flex items-center justify-center ">
        <div className="w-[20%] h-[30%] ">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        </div>
      </div>
    </div>
  )
}
export default Add