import {
    Card,
    Input,
    Button,
    Typography,
    Alert,
    Tooltip
  } from "@material-tailwind/react";
    import { useState } from "react";
    import { BiCopy } from "react-icons/bi";
   

    const PORT_BACKEND='https://backend-shorturl-nlmc.onrender.com'
  export function MainCard() {
    const [longurl, setLongurl] = useState("");
    const [shorturl, setShorturl] = useState("");
    const [detail, setDetail] = useState("");
    const [open, setOpen] = useState(false);
    const [copyalert, setCopyalert] = useState(false);


    const checkValidURL = (str) => {
        if (str.includes("https://") || str.includes("http://") && str.includes(".")) {
          return true;
        } else {
          return false;
        }
      };
    const handleGenerate=async()=>{
        const token=localStorage.getItem("token");
       try {
         
          if(!longurl || !checkValidURL(longurl) ){
            setOpen(true);
            return;
          }
          const res=await fetch(`${PORT_BACKEND}/shorturl`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`,
            },
            body:JSON.stringify({
                longURL:longurl,
                detail:detail,
            }),
        });
        const data=await res.json();
        setShorturl(data.shortURL);
        console.log(data);
       } catch (error) {
              
         console.log(error);
       }
        
    }

    const handleCopy=()=>{
        navigator.clipboard.writeText(`${PORT_BACKEND}/${shorturl}`);
        setCopyalert(true);
        }

    return (
        <div className="flex flex-col mt-10">
         {open && (
            <Alert
            open={open}
            color="red"
            onClose={() => setOpen(false)}
            animate={{
              mount: { y: 0 },
              unmount: { y: 100 },
            }}
            className="mb-10"
          >
            Please enter a valid url .
          </Alert>
          )}
         
          {copyalert && (
            <Alert
            open={copyalert}
            color="green"
            onClose={() => setCopyalert(false)}
            animate={{
              mount: { y: 0 },
              unmount: { y: 100 },
            }}
            className="mb-10"
          >
            Copied to clipboard .
          </Alert>
          )}
       <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Short URL
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your url to make it short.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Enter URL
            </Typography>
            <Input
              size="lg"
              value={longurl}
              onChange={(e)=>setLongurl(e.target.value)}
              placeholder="https://longURL.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Enter Detail
            </Typography>
            <Input
              size="lg"
              value={detail}
              onChange={(e)=>setDetail(e.target.value)}
              placeholder="Give a detail about your url"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
           {shorturl && <div className="flex flex-col gap-6">
           <Typography variant="h6" color="blue-gray" className="-mb-3">
              <div className="flex justify-between">
              <h1>Here is your short url</h1>
               <Tooltip placement="top" content="Copy">
               <h2><BiCopy onClick={handleCopy} className="hover:text-[green] cursor-pointer "/></h2>
                </Tooltip>
              </div>
            </Typography>
            <Input
              size="lg"
              value={`shorturl/${shorturl}`}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            </div>}
          </div>
          <Button className="mt-6" fullWidth onClick={handleGenerate}>
            Generate
          </Button>
        </form>
      </Card>
      </div>
    );
  }