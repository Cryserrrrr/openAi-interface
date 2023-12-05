'use client';

import { useEffect, useState, useRef } from 'react';

import styled from 'styled-components';
import { whiteTheme, blackTheme } from '@/utils/theme';

// Models
import { Message, models, Theme, Chat } from '@/models/models';

// Send Request
import { sendRequest } from '@/utils/sendRequest';

// Cookies
import { useCookies } from 'next-client-cookies';

import NavBar from '../components/navBar';
import InputBar from '../components/inputBar';
import Modal from '../components/modal';
import ChatSection from '@/components/chatSection';
import SideBar from '@/components/sideBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.background};

  transition: .5s;
`;

const choices = [
  'GPT-4',
  'GPT-3',
  'GPT-Vision',
  'Text-To-Speech',
  'Speech-To-Text',
  'Dall-E 3',
];

export default function Home() {

  const textareaRef = useRef(null);
  const cookieStore = useCookies();

  const [theme, setTheme] = useState<Theme>(blackTheme);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [model, setModel] = useState<models>(models.GPT4);
  const [image, setImage] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [abortRequest, setAbortRequest] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Hello, I am GPT-4.',
      isUser: false,
      model: models.GPT4,
    },
  ]);
  const [allChats, setAllChats] = useState<Chat[]>([]);

  useEffect(() => {
    const chats = cookieStore.get('chats');
    if (chats) {
      setAllChats(JSON.parse(chats));
    }
  }, [])

  useEffect(() => {
    setIsModalOpen(false)
    if (messages.length === 1) {
      setMessages([
        {
          text: `Hello, I am ${model}.`,
          isUser: false,
          model: model,
        }
      ])
    }
  }, [model])

  useEffect(() => {
    if (messages.length < 2) return
    const chat = allChats.findIndex(chat => chat.title === messages[1].text.substring(0, 20));
    if (chat === -1) {
      setAllChats([
        ...allChats,
        {
          id: allChats.length,
          title: messages[1].text.substring(0, 20),
          messages: messages,
        }
      ])
    } else if (chat !== -1) {
      const newChats = allChats;
      newChats[chat].messages = messages;
      setAllChats(newChats);
    }
  }, [messages])

  useEffect(() => {
    if (allChats.length === 0) {
      const chats = cookieStore.get('chats');
      const parsedChats = chats && JSON.parse(chats)
      parsedChats.length === 1 && setAllChats(allChats);
      return
    }
    cookieStore.set('chats', JSON.stringify(allChats));
  }, [allChats])

  const handleTheme = () => {
    if (theme === whiteTheme) {
      setTheme(blackTheme);
    } else if (theme === blackTheme) {
      setTheme(whiteTheme);
    }
  }

  const handleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleRequest = () => {
    sendRequest(
      inputValue,
      messages,
      model,
      setInputValue,
      setMessages,
      abortRequest,
      setAbortRequest,
      setLoading,
      image,
      setImage
    )
  }

  return (
    <Container theme={theme}>
      <SideBar
        chat={allChats}
        theme={theme}
        setMessages={setMessages}
        setModel={setModel}
        setAllChats={setAllChats}
      />
      <NavBar handleTheme={handleTheme} theme={theme}/>
      {isModalOpen && <Modal choices={choices} model={model} setModel={setModel} theme={theme}/>}
      <ChatSection
        messages={messages}
        image={image}
        theme={theme}
        textareaRef={textareaRef}
      />
      <InputBar 
        theme={theme}
        handleModal={handleModal}
        model={model}
        image={image}
        setImage={setImage}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleRequest={handleRequest}
        textareaRef={textareaRef}
        loading={loading}
        abortRequest={abortRequest}
        setAbortRequest={setAbortRequest}
      />
    </Container>
  )
}
