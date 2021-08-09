import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import  {isAuth, getCookie, signOut, updateUser} from '../auth/helpers'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../core/Layout'

const Private = ({history}) => {
    const [values, setValues] = useState({
        role:'',
        name: '',
        email:'',
        password:'',
        buttonText:'Submit',
    })
    
    const token = getCookie('token')

    useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = () => {
        axios({
            method: 'GET',
            url:`${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization:`Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Profile Update', response);
            const {name, role, email} = response.data;
            setValues({...values, role,name,email});
        })
        .catch(err => {
            console.log('Profile update error', err.message);
            if(err.response.status === '401'){
                signOut(()=>{
                    history.push('/')
                });
            }
        })
    }

    const {role, name, email, password, buttonText} = values

    const handleChange = (name) => (event) => {
        setValues({...values, [name]:event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, buttonText:'Submitting'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/update`,
            headers: {
                Authorization:`Bearer ${token}`
            },
            data: {name,password}
        })
        .then((response) => {
            console.log('PROFILE UPDATE SUCCESS',response);
            updateUser(response,()=>{
                setValues({...values,buttonText:'Submitted'})
                toast.success('Profile Updated Sucessfully')
            })
        })
        .catch(err=>{
            console.log('Profile udpate ERROR',err.message)
            setValues({...values,buttonText:'Submit'})
            toast.error(err.response.data.error)
        })
    }

    const updateForm = () =>(
        <form>
            <div className="form-group">
                <label classname='text-muted'>Name</label>
                <input type="text" className="form-control" value={name} onChange={handleChange('name')}/>
            </div>
            <div className="form-group">
                <label classname='text-muted'>Role</label>
                <input type="text" className="form-control" defaultValue={role} disabled/>
            </div>
            <div className="form-group">
                <label classname='text-muted'>Email</label>
                <input type="email" className="form-control" defaultValue={email} disabled/>
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
            <h1 className='p-3 text-center'>Profile Update Form</h1>
            {updateForm()}
            </div>
        </Layout>
    )
}

export default Private
