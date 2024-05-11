import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {Label} from 'flowbite-react'
import { TextInput,Button } from 'flowbite-react'
import { Alert } from 'flowbite-react'
import { Spinner } from 'flowbite-react'

export default function SignUp() {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({});
  const [errorMessage,setErrorMessage] = useState(null);
  const [loading,setLoading] = useState(false)
  const changeHandler = (e) => {
    setFormData(
      {...formData,
      [e.target.id] : e.target.value.trim()
  })
  }
  console.log(formData);
  const submitHandler = async(e) => {
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage("Please Fill out all the details");
    }
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message)
      }
      setLoading(false)
      if(res.ok) navigate('/sign-in')
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
        This is a demo Project. You can Sign up with your  email and password or with Google.
      </p>
      </div>

      <div className='flex-1'>
        {/* right side div */}
        <form className='' onSubmit={submitHandler}>
          <div>
            <Label value='Your Username'/>
            <TextInput
            type='text'
            placeholder='username'
            id='username' 
            onChange={changeHandler}
             />
          </div>
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
            placeholder='Password'
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
              </>) : ('Sign Up')
            }
          </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Have an Account?</span>
          <Link to='/sign-in' className='text-blue-500'>
            Sign in
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
