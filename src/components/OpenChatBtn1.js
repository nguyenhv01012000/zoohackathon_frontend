import React, { useContext, useEffect, useRef, useState } from 'react'
import '../Styles/Chat.css'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../contexts/User';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/33/');

function OpenChatBtn(props) {
    const messageRef = useRef();

    const inputRef = useRef();
    const [openChat, setOpenChat] = useState(false)
    const [onHover, setOnHover] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const [chatList, setChatList] = useState([])

    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userInfoExist, setUserInfoExist] = useState(false)
    const location = props.history.location.pathname;

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply! ', dataFromServer);
            if (dataFromServer.command === "messages") {
                dataFromServer.messages.map(item=>{
                    setChatList(chatList=>[...chatList,item])
                })
            }
            else{
                setChatList(chatList=>[...chatList, dataFromServer.message])
            }
            setTimeout(()=>{
                messageRef.current.scrollIntoView({ behavior: "smooth" })
            }, 100)
        }
        }, [])
    const sendFirstChatOnSubmit = event => {
        event.preventDefault() 

        client.send(JSON.stringify({
            command: "fetch_messages",
            username: "nguyen",
            chatId: 33
        }));

        client.send(JSON.stringify({
            command: "new_message",
            from: "nguyen",
            message: inputValue.chatContent,
            chatId: 33
        }));
    }
    const handleChange = (event) => {
        setInputValue({ ...inputValue, [event.target.name]: event.target.value })
    }
    const sendChatOnSubmit = (event) => {
        event.preventDefault();
        console.log(chatList)
        client.send(JSON.stringify({
            command: "new_message",
            from: "nguyen",
            message: inputValue.messageSend,
            chatId: 33
        }));
        inputRef.current.value = ""
    }

    return (
        <div
            className={location === "/checkout" || location === "/admin" || location === "/admin/dashboard" ? "chat-btn displayNone" : "chat-btn"}
            onMouseEnter={() => { setOnHover(true) }}
            onMouseLeave={() => { if (openChat) { setOnHover(true) } else setOnHover(false) }}
        >
            <div
                className={onHover ? "chat-btn-container chat-btn-hover" : "chat-btn-container"}
                onClick={() => {
                    if (messageRef.current) messageRef.current.scrollIntoView({ behavior: "smooth" });
                    if (openChat) {
                        setOpenChat(false);
                        setOnHover(false)
                    } else {
                        setOpenChat(true);
                        setOnHover(true)
                    }
                }}
            >
                <FontAwesomeIcon icon={faComment} className="icon" />
                <p>Live Chat</p>
            </div>
            <div className={openChat ? "chat-box hide_chat_box" : "chat-box"}>
                <div className="chat-box-header">
                    Live Chat
                </div>
                {(chatList.length === 0) &&
                    <div className="chat-box-body">
                        {userInfoExist === true &&
                            <form onSubmit={sendFirstChatOnSubmit} className={openChat ? "form-chat hide_chat_box_item" : "form-chat"}>
                                <label>Introduce yourself *</label>
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        setUserName(event.target.value)
                                    }}
                                    value={userName}
                                    placeholder="Name"
                                    className="intro" disabled></input>
                                <input
                                    type="email"
                                    onChange={(event) => {
                                        setUserEmail(event.target.value)
                                    }}
                                    value={userEmail}
                                    placeholder="Email"
                                    className="intro" disabled></input>
                                <label>Message *</label>
                                <textarea name="chatContent" type="textarea" onChange={handleChange} className="message" required></textarea>
                                <button className="btn chat-box-body-btn">Chat</button>
                            </form>
                        }
                        {userInfoExist === false &&
                            <form onSubmit={sendFirstChatOnSubmit} className={openChat ? "form-chat hide_chat_box_item" : "form-chat"}>
                                <label>Introduce yourself *</label>
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        setUserName(event.target.value)
                                    }}
                                    value={userName}
                                    placeholder="Name"
                                    className="intro" required></input>
                                <input
                                    type="email"
                                    onChange={(event) => {
                                        setUserEmail(event.target.value)
                                    }}
                                    value={userEmail}
                                    placeholder="Email"
                                    className="intro" required></input>
                                <label>Message *</label>
                                <textarea name="chatContent" type="textarea" onChange={handleChange} className="message" required></textarea>
                                <button className="btn chat-box-body-btn">Chat</button>
                            </form>
                        }
                    </div>
                }
                {(chatList.length > 0) &&
                    <div className="chat-box-body no-p">
                        <form onSubmit={sendChatOnSubmit} className={openChat ? "form-chat hide_chat_box_item" : "form-chat"}>
                            <div className="flex-col chat-box-list">
                                {
                                    chatList.map((item, index) => {
                                        return (
                                            <div key={index} ref={messageRef} className="chat-list">
                                                {
                                                    item.author === "admin" &&
                                                    <div className="clienttext">
                                                        <p>{item.content}</p>
                                                    </div>
                                                }
                                                {
                                                    item.author !== "admin" &&
                                                    <div className="admintext">
                                                        <p>{item.content}</p>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="flex chat-box-send">
                                <input name="messageSend" type="text" onChange={handleChange} placeholder="Make a message" ref={inputRef}></input>
                                <button className="flex-center sendchat">
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}

export default withRouter(OpenChatBtn);