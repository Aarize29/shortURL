import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isLoggedin, setIsLoggedin] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  useEffect(() => {
    const token=localStorage.getItem("token");
    if(token){
      setIsLoggedin(true);
    }
    else{
      setIsLoggedin(false);
    }
    }, [])

  const handlelogout=()=>{
    localStorage.removeItem("token");
    window.location.href="/login";
  }
 
  const navList = (
    <ul className="mt-2  flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="px-2 py-1.5 font-normal hover:bg-[#e5e5e5]  rounded-md"

      >
        <Link to="/home" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="px-2 py-1.5 font-normal hover:bg-[#e5e5e5]  rounded-md"

      >
        <Link to="/profile" className="flex items-center">
          Profile
        </Link>
      </Typography>

    </ul>
  );
 
  return (
    <div className="-m-6 max-h-[768px] w-100 ">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-bold"
          >
            shortURL
          </Typography>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">{navList}</div>
            {isLoggedin ? 
              <div className="flex items-center gap-x-1">
              
              <Button
                variant="gradient"
                size="sm"
                onClick={handlelogout}
                className="hidden lg:inline-block"
              >
                <span>Logout</span>
              </Button>
              
            </div>:
            <div className="flex items-center gap-x-1">
            <Link to="/signup">
            <Button 
              variant="text"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Register</span>
            </Button>
            </Link>
            <Link to="/login">
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Sign in</span>
            </Button>
            </Link>
          </div>}
            
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="px-2 py-1.5 font-normal hover:bg-[#e5e5e5]  rounded-md"
      >
        <Link to="/history" className="flex items-center">
          History
        </Link>
      </Typography>
          {isLoggedin?<div className="flex items-center gap-x-1">
            
            <Button fullWidth variant="gradient" size="sm" onClick={handlelogout}>
              <span>Logout</span>
            </Button>
            
          </div>:<div className="flex items-center gap-x-1">
            <Link to="/signup" >
            <Button fullWidth variant="text" size="sm" className="">
              <span>Register</span>
            </Button>
            </Link>
            <Link to="/login">
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button>
            </Link>
          </div>}
        </Collapse>
      </Navbar>
      {/* <div className="mx-auto max-w-screen-md py-12">
        <Card className="mb-12 overflow-hidden">
          <img
            alt="nature"
            className="h-[32rem] w-full object-cover object-center"
            src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
          />
        </Card>
        <Typography variant="h2" color="blue-gray" className="mb-2">
          What is Material Tailwind
        </Typography>
        <Typography color="gray" className="font-normal">
          Can you help me out? you will get a lot of free exposure doing this
          can my website be in english?. There is too much white space do less
          with more, so that will be a conversation piece can you rework to make
          the pizza look more delicious other agencies charge much lesser can
          you make the blue bluer?. I think we need to start from scratch can my
          website be in english?, yet make it sexy i&apos;ll pay you in a week
          we don&apos;t need to pay upfront i hope you understand can you make
          it stand out more?. Make the font bigger can you help me out? you will
          get a lot of free exposure doing this that&apos;s going to be a chunk
          of change other agencies charge much lesser. Are you busy this
          weekend? I have a new project with a tight deadline that&apos;s going
          to be a chunk of change. There are more projects lined up charge extra
          the next time.
        </Typography>
      </div> */}
      
    </div>
  );
}