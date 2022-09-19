
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import Sidebar from './../layout/sidebar/index';
function MyApp({ Component, pageProps }) {
  return (
    <div className="flex w-screen h-screen bg-white/20 ">
      <Toaster />
      <div className="w-[20%] h-full bg-gray-300/40  ">
        <Sidebar />
      </div>
      <div className="w-[80%] h-full p-5" >
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp