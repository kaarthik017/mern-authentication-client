import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../core/Layout'

const Activate = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        show: true
    })

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        if(token){
            setValues({...values,name,token})
        }
    }, [])

    const {name, token, show} = values


    const clickSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: {token}
        })
        .then((response) => {
            console.log('ACCOUNT ACTIVATION SUCCESS',response);
            setValues({...values,show:false})
            toast.success(response.data.message)
        })
        .catch(err=>{
            console.log('ACCOUNT ACTIVATION ERROR',err.message)
            toast.error(err.response.data.error)
        })
    }

    const accountLink = () =>(
        <div className="text-center">
            <h1 className="p-5">Hey {name}, Please activate your account to use.</h1>
            <button className="btn btn-primary" onClick={clickSubmit}>Activate Account</button>
        </div>
    )

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
            <ToastContainer />
            <h1 className='p-5 text-center'>Activate Account</h1>
            {accountLink()}
            </div>
        </Layout>
    )
}

export default Activate
