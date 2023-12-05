'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';

// Images
import menu from '../asset/hamburger.svg';
import arrowBackFill from '../asset/arrow_back_fill.svg';
import chatNewFill from '../asset/chat_new_fill.svg';
import trash from '../asset/trash.svg';
import check from '../asset/check.svg';
import cross from '../asset/cross.svg';

// Models
import { Chat, Theme, Message, models } from '@/models/models';

// Icon function
import Logo from '@/utils/modelsLogo';

interface SideBarProps {
  chat: Chat[];
  theme: Theme;
  setMessages: (messages: Message[]) => void;
  setModel: (model: models) => void;
  setAllChats: (chats: Chat[]) => void;
}

interface ContainerProps {
  isSideBarOpen: boolean;
}

interface ChatTitleDivProps {
  deleteConfirm: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  width: 400px;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  transform: ${props => props.isSideBarOpen ? 'translateX(0)' : 'translateX(-110%)'};
  z-index: 1;
  margin-left: 20px;

  transition: .5s;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 95%;
  border-radius: 10px;
  overflow-y: auto;
  background-color: ${props => props.theme.primary};
  padding: 20px;
`;

const Button = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  border: 3px solid ${props => props.theme.primary};
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 20px;

  transition: .5s;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Title = styled.h2`
  width: 100%;
  text-align: center;
`;

const BackArrow = styled(Image)`
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
`;

const AddChat = styled(Image)`
  position: absolute;
  top: 0px;
  left: 0px;
  cursor: pointer;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const ChatDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  border: 2px solid ${props => props.theme.lightPrimary};
  border-radius: 10px;
  margin: 10px 0;
  padding: 0 10px;
  cursor: pointer;

  transition: .5s;
`;

const ChatTitleDiv = styled.div<ChatTitleDivProps>`
  display: flex;
  align-items: center;
  width: ${props => props.deleteConfirm ? '80%' : '90%'};

  transition: .5s;
`;

const ChatIconDiv = styled.div`
  margin-right: 10px;
`;

const ChatTitle = styled.h3`
  width: 100%;
`;

const ChatDelete = styled(Image)`
  margin-left: 10px;
  z-index: 2;
`;

const ChatDeleteDiv = styled.div<ChatTitleDivProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.deleteConfirm ? '20%' : '10%'};

  transition: .5s;
`;

export default function SideBar({chat, theme, setMessages, setModel, setAllChats} : SideBarProps) {

  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const createNewMessage = () => {
    const newMessage: Message = {
      text: 'Hello, I am GPT-4.',
      isUser: false,
      model: models.GPT4,
    }
    setModel(models.GPT4);
    setMessages([newMessage]);
    setIsSideBarOpen(!isSideBarOpen);
  }

  const handlePress = (messages: Message[]) => {
    setMessages(messages);
    setIsSideBarOpen(!isSideBarOpen);
  }

  const deleteChat = (id: number) => {
    const newChat = chat.filter(c => c.id !== id);
    setDeleteConfirm(null);
    setAllChats(newChat);
  }

  return (
    <>
      <Container isSideBarOpen={isSideBarOpen} theme={theme}>
        <SubContainer theme={theme}>
          <TitleDiv>
            <AddChat src={chatNewFill} width={30} height={30} alt="add chat" onClick={createNewMessage}/>
            <Title>Chat</Title>
            <BackArrow src={arrowBackFill} width={30} height={30} alt="arrow back" onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
          </TitleDiv>
          <ChatContainer>
            {chat.map((c: Chat) => (
              <ChatDiv key={c.id}>
                <ChatTitleDiv deleteConfirm={deleteConfirm === c.id ? true : false} onClick={() => handlePress(c.messages)}>
                  <ChatIconDiv>
                    <Logo models={c.messages[0].model} />
                  </ChatIconDiv>
                  <ChatTitle>{c.title}</ChatTitle>
                </ChatTitleDiv>
                <ChatDeleteDiv deleteConfirm={deleteConfirm === c.id ? true : false}>
                  {deleteConfirm === c.id ?
                  <>
                    <ChatDelete src={check} width={20} height={20} alt="confirm delete chat" onClick={() => deleteChat(c.id)} />
                    <ChatDelete src={cross} width={20} height={20} alt="cancel delete chat" onClick={() => setDeleteConfirm(null)} />
                  </>
                  :
                    <ChatDelete src={trash} width={20} height={20} alt="delete chat" onClick={() => setDeleteConfirm(c.id)} />
                  }
                </ChatDeleteDiv>
              </ChatDiv>
            ))}
          </ChatContainer>
        </SubContainer>
      </Container>
      {!isSideBarOpen &&
        <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)} theme={theme}>
          <Image src={menu} width={40} height={40} alt="menu" />
        </Button>
      }
    </>
  )
}
