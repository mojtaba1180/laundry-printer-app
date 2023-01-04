import { useLayoutEffect, useState } from 'react';
import PrinterCard from '../components/printer-card/index';
import GridContent from '../layout/grid-content/index';
import http from '../utils/http';
export default function Home() {
  const [data, setData] = useState([])
  useLayoutEffect(() => {
    return () => {
      http.get('/get-printer').then(res => {
        setData(res.data)
      })
    }
  })
  return (
    <GridContent>
      {data?.map((item, idx) => {
          return (
           <PrinterCard key={idx} printer={item.printer} name={item.name}/>
          )
      })}
    </GridContent>
  )
}
