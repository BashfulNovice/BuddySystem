import {useState, useEffect} from 'react'
//import { useParams } from "react-router-dom"
import '../component-styles/message.css'


export default function Message({currentUser, message}) {


return (
    <div className = {message.sender.id === currentUser.id? "message-item-self" : "message-item-other"}>
        <p className = {message.sender.id === currentUser.id? "message-signature-self" : "message-signature-other"}>{message.sender.name}</p>
        <div className = "message-content">{message.content}</div>
    </div>
)
}