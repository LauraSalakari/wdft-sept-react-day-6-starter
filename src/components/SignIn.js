import React, {useEffect} from 'react';

export default function SignIn(props){

    useEffect(() => {
        return props.onUnmount
    }, [])

    return (
        <form onSubmit={props.onSignIn}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="text" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input name="password" type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            {
                props.errorMessage ? (
                    <p style={{color: "red"}}>{props.errorMessage}</p>
                ) : null
            }
        </form>
    )
}