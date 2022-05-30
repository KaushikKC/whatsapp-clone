import { Avatar } from '@mui/material';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import {useRouter} from "next/router"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { IconButton } from '@mui/material';
import {useCollection} from "react-firebase-hooks/firestore"
import { addDoc, collection, doc, orderBy, query, setDoc, Timestamp, where } from 'firebase/firestore';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import Message from './Message';
import firebase from 'firebase/compat/app';
import { useRef, useState } from 'react';
import 'firebase/compat/firestore';
import { serverTimestamp } from '@firebase/firestore'
import getRecipientEmail from '../utils/getRecipienytEmail'
import TimeAgo from 'timeago-react';





function ChatScreen(chat,messages) {
  const [user] = useAuthState(auth)
  const [input, setInput] = useState("")
  const router = useRouter();
  const docref = doc(collection(db,"chats"),router.query.id)
  const [messagesSnapshot] = useCollection(query(collection(docref,'messages')),orderBy("timestrap","asc"));
  const endOfMessagesRef = useRef(null);
  
  // console.log(chat.chat.users)

  const [recipientSnapshot] = useCollection(query(collection(db,'users'),where('email', '==', getRecipientEmail(chat.chat.users,user))));

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message 
          key = {message.id}
          user = {message.data().user}
          message = {{
            ...message.data(),
            Timestamp: message.data().tiestamp?.toData().getTime(), 
          }}
          />
      ));
    }
  };

  const ScrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

    const SendMessage = (e) => {
      e.preventDefault();

      setDoc(doc(collection(db,"users"),user.uid), {
        lastSeen: serverTimestamp(),
      }, {
        merg:true
      });
    

   const refdoc = doc(collection(db,"chats"),router.query.id)
   addDoc(collection(refdoc,'messages'), {
     timestamp: serverTimestamp(),
     message: input,
     user: user.email,
     photoURL: user.photoURL,
   });

   setInput("");
   ScrollToBottom();
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data()
  console.log(recipient?.lastSeen?.toDate())
  const recipientEmail = getRecipientEmail(chat.chat.users,user);
  return (
    <Container>
        <Header>
        {recipient ? (
            <Avatar src={recipient.photoURL} />
        ) : (
            <Avatar>{recipientEmail[0]}</Avatar>
        )}

          <HeaderInformation>
              <h3>{recipientEmail}</h3>
              {recipientSnapshot ? (
                <p>Last active: {' '}
                {recipient?.lastSeen?.toDate() ?(
                    <TimeAgo datatime={'2016-08-08 08:08:08'} />
                ): ("Unavailable")}
                </p>
              ): (
                <p>Loding Last Seen</p>
              )};
          </HeaderInformation>
          <HeaderIcon>
              <IconButton>
                <AttachFileIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
          </HeaderIcon>
        </Header>

        <MessageContainer>
            {showMessages()}
            <EndOfMessage ref={endOfMessagesRef}/>
        </MessageContainer>
        <InputContainer>
          <InsertEmoticonIcon />
          <Input value={input} onChange={e => setInput(e.target.value)} />
          <button hidden disabled={!input} type="submit" onClick={SendMessage}>
            Send Message
          </button>
          <MicIcon />
        </InputContainer>
    </Container>
  )
}

export default ChatScreen

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcon = styled.div``;

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const Input = styled.input`
  flex : 1;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: whitesmoke;
  border-radius: 10px;
  border: none;
  margin-left: 15px;
  outline: 0;
`;

