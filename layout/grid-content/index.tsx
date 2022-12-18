
interface Prop {
  children:any,
}

const GridContent = ({children}:Prop) => {
  return (
    <div className="grid w-full h-full grid-cols-3 gap-3 grid-rows-6 ">
        {children}
    </div>
  )
}

export default GridContent