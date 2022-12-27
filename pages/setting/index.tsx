import { Drawer, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import PrinterCard from '../../components/printer-card';
import GridContent from '../../layout/grid-content';
import http from './../../utils/http';

const Setting = () => {
  const [opened, setOpened] = useState(false);
  const [printers, setPrinters] = useState([])
  const [printersLoading, setPrintersLoading] = useState(false)

  useEffect(() => {
    if(opened){
      handleGetPrinters()
    }
    return () => {
      setPrinters([])
    };
  }, [opened])


  // useForm
  const form = useForm({
    initialValues: {
      name: '',
      printer: '',
    },
     validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      printer: (value) => (value.length < 1 ? 'please select printer' : null),
    },
  })
  
  const handleGetPrinters = () => {
    setPrintersLoading(true)
    http.get("/get-printers").then(res => {
    setPrintersLoading(false)
    console.log(res);
    setPrinters(res.data.map(item => {
      return {
        value:item.name,
        label:item.name
      }
    }))
    }).catch(() => {
    setPrintersLoading(false)
    })
  }
  const handleSubmit = (values) => {
    http.post("/add-printer",form).then(res =>{
      setOpened(false)
    }
    ).catch(err => {

    })
    // http.get(`/print-file?printer=${values.printer}&file=${"http://localhost:3000/dummy.pdf"}`).then(res => {
    // console.log(values);
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
      
    // })
  }
  return (<>
    <GridContent >
      <PrinterCard.Add onClick={() => setOpened(true)} />
    </GridContent>
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title="Add Printer"
      padding="xl"
      size="xl"
      position='right'
    >
      <form
        onSubmit={form.onSubmit((values) => {handleSubmit(values)}
        )}
      >
        <TextInput label="Name" description={"Creating an ID for the printer"}  placeholder="Name" {...form.getInputProps('name')} />
        <Select
          disabled={printersLoading}
          label="Select Printer"
          placeholder="empty"
          className='mt-4'
          // onClick={() => printers.length === 0 ? handleGetPrinters() : null}
          data={printers}
          {...form.getInputProps('printer')}
        />
        {/* <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} /> */}
        <button className='w-full px-4 py-2 my-5 text-white bg-blue-400 rounded-lg' type="submit" color={'blue'} >
          Submit
        </button>
      </form>
    </Drawer>
  </>
  )
}

export default Setting