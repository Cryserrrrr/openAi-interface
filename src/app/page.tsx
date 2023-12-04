'use client';

import { useEffect, useState, useRef } from 'react';

import styled from 'styled-components';
import Image from 'next/image';
import { whiteTheme, blackTheme } from '@/utils/theme';
import { Message, models, Theme } from '@/models/models';

// Images
import menu from '../asset/hamburger.svg';

// Send Request
import { sendRequest } from '@/utils/sendRequest';

import NavBar from '../components/navBar';
import InputBar from '../components/inputBar';
import Modal from '../components/modal';
import ChatSection from '@/components/chatSection';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.background};

  transition: .5s;
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

  const [theme, setTheme] = useState<Theme>(blackTheme);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [model, setModel] = useState<models>(models.GPT4);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Hello, I am ChatGPT',
      isUser: false,
      model: models.GPT4,
    },
  ]);

  useEffect(() => {
    setIsModalOpen(false)
    if (messages.length === 1) {
      setMessages([
        {
          text: `Hello, I am ${model}`,
          isUser: false,
          model: model,
        }
      ])
    }
  }, [model])

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
    sendRequest(inputValue, messages, model, setInputValue, setMessages, image, setImage)
  }

  return (
    <Container theme={theme}>
      <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)} theme={theme}>
        <Image src={menu} width={40} height={40} alt="menu" />
      </Button>
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
      />
    </Container>
  )
}
