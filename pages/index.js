import { Button } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PrinterCard from '../components/printer-card/index';
import GridContent from '../layout/grid-content/index';
import http from '../utils/http';
export default function Home() {
  const [data, setData] = useState([])
  useEffect(() => {
    return () => {
      http.get('/get-printer').then(res => {
        setData(res.data)
      })
    }
  },[])
  if(data.length === 0){
    return (
      <div className='flex flex-col items-center justify-center w-full h-full gap-3 ' >
          <p className="text-xl font-semibold">
            please add printer 
          </p>
          <Link href={"/setting"}>
           <Button
      color="blue"
      variant='outline'
      >
              Go To Setting 
      </Button>
        </Link>
      </div>
    )
  }

  return (
    <GridContent>
      {data?.map((item, idx) => {
          console.log(item);
          return (
           <PrinterCard key={idx} printer={item.printer} name={item.name}/>
          )
      })}
    </GridContent>
  )
}
