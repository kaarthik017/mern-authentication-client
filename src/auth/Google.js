import React from 'react'
import  {authenticate, isAuth} from './helpers'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

const Google = ({informParent = f => f}) =>{
    const responseGoogle = (response) =>{
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/google-login`,
            data:{idToken:response.tokenId}
        })
        .then(response =>{
            console.log('Google Login Success',response);
            informParent(response);
        })
        .catch(error =>{
            console.log('Google Login Error',error);
        })
    }
    return(
        <div className="pb-3">
            <GoogleLogin
                 clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-danger btn-lg btn-block">
                        <i className="fab fa-google pr-2"></i>Login With Google
                        </button>
                  )}
                cookiePolicy={'single_host_origin'}
  />,
        </div>
    )
}

export default Google

