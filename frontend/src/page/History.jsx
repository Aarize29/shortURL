import React,{useState,useEffect} from "react";
import { Card, Spinner, Typography } from "@material-tailwind/react";
import { StickyNavbar } from "../components/StickyNavbar";
import { Sidebar } from "../components/Sidebar";
import { RiDeleteBin6Line } from "react-icons/ri";




 
 




 
export function TableWithStripedRows() {

  useEffect(() => {
    const token=localStorage.getItem("token");
    if(!token){
        window.location.href="/login";
    }
}, [])
  const [allUrl, setAllUrl] = useState([]);
  const [loading, setLoading] = useState(true);

  const getallurl = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3000/api/urls', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAllUrl(data);
      setLoading(false);
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallurl();
  }, []);
  
  const TABLE_HEAD = ["URL","Detail", "ShortURL", "Date", ""];

  const TABLE_ROWS = allUrl.map((url) => ({
    url: url.longURL,
    detail: url.detail,
    shorturl: `http://localhost:3000/${url.shortURL}`,
    date: url.date.slice(0, 10),
  }));

  const handleDelete = async (e) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3000/api/urls/${e.target.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      //console.log(data);
      getallurl();
    } catch (error) {
      console.log(error);
    }
  }

  
  
  return (
    <div className='m-5'>
    <StickyNavbar/>
    <div className=' flex gap-4 mt-10 '>
      <Sidebar/>
      <div className='flex  justify-center w-full'>

      {loading ? 
       
       (
         <div className="flex justify-center items-center h-full w-full bg-blue-gray-50/50 rounded-2 ">
           <Spinner className="h-12 w-12" />
         </div>
       )
        
       :(
        <Card className="h-full w-full ">
        <table className="w-full min-w-max table-auto text-left rounded-lg">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ url,detail, shorturl, date }, index) => (
              <tr key={name} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {url}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {detail}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {shorturl}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {date}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                    <RiDeleteBin6Line className="hover:text-[red]" onClick={handleDelete} 
                    id={allUrl[index]._id}  
                    />
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
       )
      }
    </div>
    </div>
    </div>
  );
}