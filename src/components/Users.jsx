import '../styles/Users.css';
import chatData from '../ContextData';
import { useContext, useEffect, useState } from 'react';

function Users() {

    const {setUserClicked, setPerson} = useContext(chatData);

    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        const handleApi = async () => {
            try {
                const response = await fetch('http://localhost:7000/users');
                const data = await response.json();
                setApiData(Object.values(data));
            } catch (err) {
                console.error(err);
            }
        };
        handleApi();
    }, []);

    const handleUserClicked = (_id) => {
        setUserClicked(true);

        const target = apiData.find((u) => u._id === _id);
        setPerson(target);
    };

    return(
        <div className="users">
            {
                apiData.map((x) => (
                    <button onClick={() => handleUserClicked(x._id)} className="user-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                        <p>{x.name}</p>
                    </button>
                ))
            }
        </div>
    )
}

export default Users;