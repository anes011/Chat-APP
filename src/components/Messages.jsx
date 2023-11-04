import '../styles/Messages.css';
import chatData from '../ContextData';
import { useContext, useEffect, useRef, useState } from 'react';

function Messages() {

    const user = JSON.parse(localStorage.getItem('user'));

    const {userClicked, loggedUser, person} = useContext(chatData);

    const [sendButton, setSendButton] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [sendClicked, setSendClicked] = useState(false);
    const [messageRemove, setMessageRemove] = useState(false);
    const [messageID, setMessageID] = useState(null);

    const messagesIcon = useRef(null);
    const yourMessagesHere = useRef(null);
    const messageInput = useRef(null);

    useEffect(() => {
        const handleApiRender = async () => {
            try {
                const response = await fetch('http://localhost:7000/messages');
                const data = await response.json();
                setApiData(data.messages);
            } catch (err) {
                console.error(err);
            }
        }

        handleApiRender();


        const handleApi = async () => {
            try {
                const response = await fetch('http://localhost:7000/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        senderID: user._id,
                        receiverID: person._id,
                        content: messageInput.current.value
                    })
                });
                const data = await response.json();
            } catch (err) {
                console.error(err);
            }
        }

        if (sendClicked) {
            handleApi();
            handleApiRender();
        } else {
            handleApi();
            handleApiRender();
        }

        if (messageRemove) {
            handleApiRender();
        }else {
            handleApiRender();
        }
    }, [sendClicked, messageRemove]);

    const handlePost = () => {
        setSendClicked(!sendClicked);
        setTimeout(() => {
            messageInput.current.value = '';
        }, 1000);
    };

    if (userClicked) {
        if (messagesIcon.current && yourMessagesHere.current) {
            messagesIcon.current.remove();
            yourMessagesHere.current.remove();
        }
    };

    const handleSend = () => {
        setSendButton(true);

        if (messageInput.current.value === '') {
            setSendButton(false);
        }
    };

    useEffect(() => {
        const handleApiRemove = async () => {
            try {
                if (messageID !== null) {
                    const response = await fetch(`http://localhost:7000/messages/${messageID}`, {
                    method: 'DELETE'
                    });
                    const data = await response.json();
                }
            } catch (err) {
                console.error(err);
            }
        }

        if (messageRemove) {
            handleApiRemove();
        } else {
            handleApiRemove();
        }
    }, [messageRemove, messageID]);

    const handleMessageRemove = (_id) => {
        setMessageRemove(!messageRemove);

        const target = apiData.find((x) => x._id === _id);
        setMessageID(target._id);
    }

    return(
        <div className={userClicked ? 'messages-open' : 'messages'}>
            <svg ref={messagesIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z"/>
                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
            </svg>
            <p ref={yourMessagesHere} className='your-messages-here'>Your Messages Here!</p>

            {userClicked && (
                <div className="messages-field">
                    <div className="messages-container">
                        {
                            apiData.map((m) => {
                                if (m.senderID === user._id && m.receiverID === person._id) {
                                    return(
                                        <div onDoubleClick={() => handleMessageRemove(m._id)} className="message-sender">{m.content}</div>
                                    )
                                }else if (m.senderID === person._id && m.receiverID === user._id) {
                                    return(
                                        <div className="message-receiver">{m.content}</div>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className="message-input">
                        <input ref={messageInput} onChange={handleSend} type="text" />
                        <button onClick={handlePost} className={sendButton ? 'send-btn-active' : 'send-btn'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Messages;