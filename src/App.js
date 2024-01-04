

import {BrowserRouter , Routes , Route} from "react-router-dom"
import Home from "./Components/Home";
import MultiFile from "./Components/MultiFile";
import Search from "./Components/Search";
import UploadCard from "./Components/UploadCard";



const App =  ()=>{
 
  return (
    <>
    <BrowserRouter>
  
    <Routes>
      {/* <Route path="/" element={<UploadCard/>}/> */}
      {/* <Route path="/" element={<MultiFile/>}/> */}
      <Route path="/" element={<Home/>}/>
      <Route path="/search" element={<Search/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
