import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import  {authenticate, isAuth} from './helpers'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../core/Layout'
import Google from './Google'

const Signin = ({history}) => {
    const [values, setValues] = useState({
        email:'',
        password:'',
        buttonText:'Submit',
    })

    const {email, password, buttonText} = values

    const handleChange = (name) => (event) => {
        setValues({...values, [name]:event.target.value})
    }
    const informParent = response =>{
        authenticate(response,()=>{
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
        })    
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText:'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {email,password}
        })
        .then((response) => {
            console.log('SIGNIN SUCCESS',response);
            authenticate(response,()=>{
                setValues({...values, email:'',password:'',buttonText:'Submitted'})
                toast.success(`Hey ${response.data.user.name}, Welcome back!`)
                isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
            })    
        })
        .catch(err=>{
            console.log('SIGNIN ERROR',err.message)
            setValues({...values,buttonText:'Submit'})
            console.log(err)
            toast.error(err.response.data.error)
        })
    }

    const signinForm = () =>(
        <form>
            <div className="form-group">
                <label classname='text-muted'>Email</label>
                <input type="email" className="form-control" value={email} onChange={handleChange('email')}/>
            </div>
            <div className="form-group">
                <label classname='text-muted'>Password</label>
                <input type="password" className="form-control" value={password} onChange={handleChange('password')}/>
            </div>
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
            <ToastContainer />
            {isAuth() ? <Redirect to='/' /> : null}
            <h1 className='p-5 text-center'>Signin</h1>
            <Google informParent={informParent}></Google>
            {signinForm()}
            <br />
            <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                    Forgot Password
                </Link>
            </div>
        </Layout>
    )
}

export default Signin
