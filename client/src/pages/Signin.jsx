import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {Label} from 'flowbite-react'
import { TextInput,Button } from 'flowbite-react'
import { Alert } from 'flowbite-react'
import { Spinner } from 'flowbite-react'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'
import { useDispatch,useSelector } from 'react-redux'
import OAuth from '../components/OAuth'

export default function signin() {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({});
  const {loading,error:errorMessage} = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const changeHandler = (e) => {
    setFormData(
      {...formData,
      [e.target.id] : e.target.value.trim()
  })
  }
  console.log(formData);
  const submitHandler = async(e) => {
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please Fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
      }
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/')
      };
    } catch (error) {
       dispatch(signInFailure(error.message))
    }
  }
  return ( 
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl flex-col md:flex-row mx-auto 
      md:items-center gap-5">
      <div className='flex-1'>
        {/* left side div  */}
        <Link
        to='/'
        className='text-4xl font-bold dark:text-white'
      >
        <span className='bg-red-500 px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          KR's
        </span>
        Blog
      </Link>
      <p className='text-sm  text-gray-800 mt-5 font-bold'>
        This is a demo Project. You can Sign in with your  email and password or with Google.
      </p>
      </div>

      <div className='flex-1'>
        {/* right side div */}
        <form className='' onSubmit={submitHandler}>
          <div>
            <Label value='Your Email'/>
            <TextInput
            type='email'
            placeholder='name@company.com'
            id='email'
            onChange={changeHandler} />
          </div>
          <div>
            <Label value='Your Password'/>
            <TextInput
            type='password'
            placeholder='********'
            id='password'
            onChange={changeHandler}
             />
          </div>
          <Button gradientDuoTone='purpleToPink' type='submit'
          className='w-full mt-4'
          disabled={loading}>
            {
              loading ? (<>
              <Spinner size='sm' />
              <span>Loading...</span> 
              </>) : ('Sign In')
            }
          </Button>
          <OAuth/>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Dont Haven't Account?</span>
          <Link to='/sign-up' className='text-blue-500'>
            Sign Up
          </Link>
        </div>
        {
          errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )
        }
      </div>
      </div>
    </div>
  )
}
