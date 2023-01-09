import { Button, Drawer, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import PrinterCard from '../../components/printer-card';
import GridContent from '../../layout/grid-content';
import http from './../../utils/http';

const Setting = () => {
  const [opened, setOpened] = useState(false);
  const [printers, setPrinters] = useState([])
  const [currentPrinter, setCurrentPrinter] = useState([])
  const [printersLoading, setPrintersLoading] = useState(false)
  const [names] = useState([
    {
        value:"purple",
        label:"purple"
      },
        {
        value:"white",
        label:"white"
      },
        {
        value:"blue",
        label:"blue"
      },


  ])
  useEffect(() => {
    if(opened){
      handleGetPrinters()
    }
    return () => {
      setPrinters([])
    };
  }, [opened])


  useEffect(() => {
   handleGetPrinter()
  })

  // useForm
  const form = useForm({
    initialValues: {
      name: '',
      printer: '',
    },
     validate: {
      name: (value) => (value.length < 2 ? 'please select name' : null),
      printer: (value) => (value.length < 1 ? 'please select printer' : null),
    },
  })
  
  const handleGetPrinter= () => {
    http.get('/get-printer').then(res => {
          setCurrentPrinter(res.data)
        })
  }
  const handleGetPrinters = () => {
    setPrintersLoading(true)
    http.get("/get-printers").then(res => {
    setPrintersLoading(false)
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
  const handleSubmit = () => {
    http.post("/add-printer",form).then(res =>{
      setOpened(false)
      form.reset()
    }
    )
   }
   const handleRemove = (name: String) =>{
       http.post("/delete-printer",{name}).then(res =>{
          
       })    
   }
  return (<>
    <div className='flex items-center justify-end w-full h-12 p-2 -mt-0 bg-gray-300/40'>
      <Button
      color="blue"
      variant='outline'
      onClick={() => setOpened(true)}
      >
              Add Printer
      </Button>
    </div>
    <GridContent >
      {currentPrinter?.map((item, idx) => {
          return (
           <PrinterCard isSetting={true} onClick={() => handleRemove(item.name)} key={idx} printer={item.printer} name={item.name}/>
          )
      })}
      {/* <PrinterCard.Add  /> */}
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
        
        {/* <TextInput label="Name" description={"Creating an ID for the printer"}  placeholder="Name" {...form.getInputProps('name')} /> */}
        <Select
          disabled={printersLoading}
          label="Select Printer"
          placeholder="empty"
          className='mt-4'
          // onClick={() => printers.length === 0 ? handleGetPrinters() : null}
          data={names}
          {...form.getInputProps('name')}
        />
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