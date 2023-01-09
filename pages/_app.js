
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import Sidebar from './../layout/sidebar/index';
function MyApp({ Component, pageProps }) {
  return (
    <div className="flex h-screen bg-white/20 ">
      <Toaster />
      <div className="w-[250px] h-full bg-gray-300/40  ">
        <Sidebar />
      </div>
      <div className="relative w-full h-full p-0" >
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp