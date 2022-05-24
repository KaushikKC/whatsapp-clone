import React from 'react'
import { Avatar, Button, IconButton } from '@mui/material';
import styled from 'styled-components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';


function Sidebar() {
  return (
    <container>
        <Header>
            <UserAvatar />

            <IconContainer>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
                
                
            </IconContainer>

        </Header> 

        <Search>
            <SearchIcon />
            <SearchInput placeholder='Search in chats' />
        </Search>
        <SidebarButton>Start a New chat</SidebarButton>
    </container>
  );
}

export default Sidebar

const container = styled.div`

`;

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0 ;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;

`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;

const IconContainer = styled.div``;
const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;
const SearchInput = styled.input`
    outline-width: 0ch;
    border: none;
    flex: 1;
`;

const SidebarButton = styled(Button)`
    width: 100%;
    color: black;
    &&&{
        border-top: 1px solid whitesmoke ;
        border-bottom: 1px solid whitesmoke;
    }
    
`;