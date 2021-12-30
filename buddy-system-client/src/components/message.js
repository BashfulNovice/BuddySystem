import {useState, useEffect} from 'react'
//import { useParams } from "react-router-dom"
//import '../component-styles/trip_detail.css'


export default function Message({currentUser, message}) {


return (
    <div>{message.content}</div>
)
}