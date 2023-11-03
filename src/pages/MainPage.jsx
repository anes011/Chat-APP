import '../styles/MainPage.css';
import SideBar from "../components/SideBar";
import Users from "../components/Users";
import Messages from '../components/Messages';
import chatData from '../ContextData';
import { useContext } from 'react';

function MainPage() {

    const {sideBar} = useContext(chatData);

    return(
        <div className={sideBar ? 'main-page' : 'main-page-close'}>
            <SideBar />
            <Users />
            <Messages />
        </div>
    )
}

export default MainPage;