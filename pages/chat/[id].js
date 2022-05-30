import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
import { async } from '@firebase/util'
import { collection,query, doc, getDocs,getDoc, orderBy } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import getRecipienytEmail from '../../utils/getRecipienytEmail'

function Chat({chat, messages}   ) {
  // console.log(chat)
  const [user] = useAuthState(auth)
  return (
    <Container>
        <Head>
            <title>Chat with {getRecipienytEmail(chat.users, user)}</title>
        </Head>
        <Sidebar />
        <ChatContainer>
            <ChatScreen chat={chat} messages={messages} />
        </ChatContainer>


    </Container>
  )
}

export default Chat

export async function getServerSideProps(context) {
  const ref = doc(db,'chats',context.query.id)
  const q = query(collection(ref, "messages"), orderBy("timestrap", "asc", ));
  const messagesRef = await getDocs(q);

  const messages = messagesRef.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })).map(messages => ({
    ...messages,
    timestamp : messages.timestamp.toDate().getTime()

  }));

  const chatRes = await getDoc(ref)
  const chat = {
    id: chatRes.id,
    ...chatRes.data()
  }


  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat
    }
  }
}

const Container = styled.div`
 display: flex;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;