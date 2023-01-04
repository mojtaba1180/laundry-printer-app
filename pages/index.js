import PrinterCard from '../components/printer-card/index';
import GridContent from './../layout/grid-content/index';
import http from './../utils/http';
export default function Home({data}) {
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

export async function getStaticProps() {
  const res = await http.get('/get-printer');
  return {
    props: { data:res.data }
  }
}
