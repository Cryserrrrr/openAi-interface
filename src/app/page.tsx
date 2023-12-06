'use client';

import { useEffect, useState, useRef } from 'react';

import styled from 'styled-components';
import { whiteTheme, blackTheme } from '@/utils/theme';

// Types
import { Message, models, Theme, Chat } from '@/types/types';

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

/**
 *  Home page
 *
 * @export
 * @return {*} 
 */
export default function Home() {

  const textareaRef = useRef(null);
  const cookieStore = useCookies();
  
  const cookiesChats = cookieStore.get('chats');

  const [theme, setTheme] = useState<Theme>(blackTheme);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [model, setModel] = useState<models>(models.GPT4);
  const [images, setImages] = useState<string[]>([]);
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
  const [chats, setChats] = useState<Chat[]>(cookiesChats ? JSON.parse(cookiesChats) : []);

  // Update first message when model change
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model])

  // Update chats when messages change
  useEffect(() => {
    if (messages.length < 2) return
    const chat = chats.findIndex(chat => chat.title === messages[1].text.substring(0, 20));
    if (chat === -1) {
      setChats([
        ...chats,
        {
          id: chats.length,
          title: messages[1].text.substring(0, 20),
          messages: messages,
        }
      ])
    } else if (chat !== -1) {
      const newChats = chats;
      newChats[chat].messages = messages;
      setChats(newChats);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  // Update cookies when chats change
  useEffect(() => {
    if (chats.length === 0) {
      const actualCookiesChats = cookieStore.get('chats');
      const parsedChats = actualCookiesChats && JSON.parse(actualCookiesChats)
      parsedChats?.length === 1 && setChats([]);
      cookieStore.remove('chats');
      return
    } else {
      cookieStore.set('chats', JSON.stringify(chats));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats])

  /**
   * Handle theme
   * Change theme of the App
   * @returns {void}
   */
  const handleTheme = () => {
    if (theme === whiteTheme) {
      setTheme(blackTheme);
    } else if (theme === blackTheme) {
      setTheme(whiteTheme);
    }
  }

  /**
   * Handle modal
   * Open or close modal
   * @returns {void}
   */
  const handleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  /**
   * Handle request
   * Send request to the API
   * @returns {void}
   */
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
      images,
      setImages
    )
  }

  return (
    <Container theme={theme}>
      <SideBar
        chats={chats}
        theme={theme}
        setMessages={setMessages}
        setModel={setModel}
        setChats={setChats}
      />
      <NavBar handleTheme={handleTheme} theme={theme}/>
      {isModalOpen && <Modal model={model} setModel={setModel} theme={theme}/>}
      <ChatSection
        messages={messages}
        images={images}
        theme={theme}
        textareaRef={textareaRef}
      />
      <InputBar 
        theme={theme}
        handleModal={handleModal}
        model={model}
        images={images}
        setImages={setImages}
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
