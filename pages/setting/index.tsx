import { Drawer, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import PrinterCard from '../../components/printer-card';
import GridContent from '../../layout/grid-content';

const Setting = () => {
  const [opened, setOpened] = useState(false)



  // useForm
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
    },
     validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })
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
        onSubmit={form.onSubmit((values) => console.log(values)
        )}
      >
        <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
        <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
        <button className='bg-blue-400 px-4 py-2 text-white w-full my-5 rounded-lg' type="submit" color={'blue'} >
          Submit
        </button>
      </form>
    </Drawer>
  </>
  )
}

export default Setting