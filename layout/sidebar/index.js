import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const links = [
    {
      title: 'Home',
      link: '/'
    },
    {
      title: 'Setting',
      link: '/setting'
    },

  ]
  return (
    <div className="flex flex-col w-full h-full gap-10 p-5 ">
      <h1 className="text-xl font-semibold" >  Laundry Printer</h1>
      <ul className="flex flex-col gap-2 ">
        {
          links.map((item, idx) => {
            return (
              <li key={idx} className={`text-2xl font-semibold p-2 rounded-xl transition-all text-gray-600 ${router.pathname === item.link ? 'bg-gray-300' : ""} `}>
                <Link href={item.link}>
                  <a>{item.title}</a>
                </Link>
                <span></span>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Sidebar