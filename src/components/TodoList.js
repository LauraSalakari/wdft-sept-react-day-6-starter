import React from 'react'
import {Link} from 'react-router-dom'
// import MyChatBot from './MyChatBot'
// import MyMap from './MyMap'
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import "../App.css";

function TodoList(props) {

    // props.todos = [{}, {}, {}]

    // const promise = loadStripe("pk_test_51Hj18JFNasNlOLrVPN4iYki7YPaBSTB9fecoPSwsmR6F4xEkCUsrkcgC8zm4l1MiZGKJrHovcaG99S9575MHWEeK00fWC4smR9");

    return (
        <div>
        {/* for leaflet component */}
            {/* <MyMap /> */}

        {/* for Kommunicate component */}
            {/* <MyChatBot />   */}
{/* 
        <Elements stripe={promise}>
        <CheckoutForm />
      </Elements> */}


           In todo list  
           {
               props.todos.map((todo) => {
                    return <Link to={`/todo/${todo._id}`}>
                        <p key={todo._id} >{todo.name}</p>
                        </Link>
               })
           }
        </div>
    )
}


export default TodoList