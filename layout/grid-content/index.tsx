
interface Prop {
  children:any,
}

const GridContent = ({children}:Prop) => {
  return (
    <div className="grid w-full h-[95%] grid-cols-3 gap-3 grid-rows-3 p-3">
        {children}
    </div>
  )
}

export default GridContent