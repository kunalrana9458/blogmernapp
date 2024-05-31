import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon,FaSun } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toogleTheme } from '../redux/theme/themeSlice';
import { signOutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';


export default function Header() {
    const {theme} = useSelector((state) => state.theme)
    const dispatch = useDispatch();
    const location = useLocation()
    const {currentUser} = useSelector(state => state.user)
    const path = useLocation().pathname;
    const [searchTerm,setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFormUrl = urlParams.get('searchTerm');
      if(searchTermFormUrl){
        setSearchTerm(searchTermFormUrl);
      }
    },[location.search])


    const handleSignOut = async () => {
      try {
        const res = await fetch('/api/user/signout',{
          method:'POST',
        });
        
        const data = await res.json();
        if(!res.ok){
          console.log(data.message);
        } else{
          dispatch(signOutSuccess());
        }
      } catch (error) {
        
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search)
      urlParams.set('searchTerm',searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    }

  return (
    <Navbar className='border-b-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='bg-red-500 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          KR's
        </span>
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill
        onClick={() => dispatch(toogleTheme())}>
          {
            theme === 'light' ? <FaSun/> : <FaMoon/>
          }
        </Button>
         {
          currentUser ? (
            <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user'
              img={currentUser.profilePicture} rounded/>
            }
            >
             <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username} </span>
              <span className='block text-sm'> {currentUser.email} </span>
             </Dropdown.Header>
             <Link to='/dashboard?tab=profile'>
                <Dropdown.Item>Profile</Dropdown.Item>
             </Link>
             <Dropdown.Divider></Dropdown.Divider>
             <Dropdown.Item
             onClick={handleSignOut} >
              Sign Out
             </Dropdown.Item>
            </Dropdown>
          ) : (
        <Link to='/sign-in'>
        <Button gradientDuoTone='purpleToBlue' outline>Sign In</Button>
        </Link>
          )
         }
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}