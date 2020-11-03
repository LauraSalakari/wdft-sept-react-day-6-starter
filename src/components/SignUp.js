import React, {useEffect} from 'react';

export default function SignUp(props){

    // mount: no return but dependency array
    // update: no return or dependency array
    // unmount: return and dependency array

    // this is a componentWillUnmount hook
    useEffect(() => {
        return props.onUnmount
    }, [])

    // you can also call the on unMount function in the onChange event handler 
    // of the input fields to wipe the error when the user starts typing

    return (
        <form onSubmit={props.onSignUp}>
            <div className="form-group">
                <label htmlFor="exampleInputUsername">Username</label>
                <input type="text" onChange={props.onUnmount} className="form-control" id="exampleInputUsername" name="username" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="text" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
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