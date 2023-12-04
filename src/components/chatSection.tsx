'use client';

import { useEffect, useState, useRef, use } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

// Images
import chatgpticon from '../asset/chatgpticon.svg';
import gpt4 from '../asset/gpt4.svg';
import user from '../asset/user.svg';

// Models
import { Message, Theme } from '@/models/models';

// markdownReader
import MarkdownReader from '@/utils/markdownReader';

interface ContainerProps {
  image: string | null;
}

interface MessageBoxProps {
  isUser: boolean;
  theme: Theme;
}

const Container = styled.div<ContainerProps>`
  max-height: ${props => props.image ? 'calc(100vh - 400px)' : 'calc(100vh - 250px)'};
  width: 50%;
  color: #fff;
  border-radius: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

const MessageBox = styled.div<MessageBoxProps>`
  display: flex;
  align-items: flex-start;
  width: 100%;
  background-color: ${props => props.isUser ? 'transparent' : props.theme.lightPrimary};
  font-size: 1em;
  padding: 10px;
  border-radius: 10px;
  line-height: 1.5em;
  margin-bottom: 10px;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 100%;
  margin-right: 10px;
`;

const ImageDiv = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const ImageBox = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0 10px;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

export default function ChatSection({ messages, image, theme } : { messages: Message[], image: string | null, theme: Theme } ) {

  const renderIcon = (message: Message) => {
    if (message.model === 'GPT-4' && !message.isUser) {
      return (
        <ImageDiv theme={theme}>
          <Image src={gpt4} width={40} height={40} alt='GPT-4 Logo'/>
        </ImageDiv>
      )
    } else if (message.isUser) {
      return (
        <ImageDiv theme={theme}>
          <ImageBox theme={theme}>
            <Image src={user} width={24} height={24} alt='User Logo' />
          </ImageBox>
        </ImageDiv>
      )
    } else {
      return (
        <ImageDiv theme={theme}>
          <Image src={chatgpticon} width={40} height={40} alt='GPT-3 Logo' />
        </ImageDiv>
      )
    }
  }

  const renderMessages = () => {
    return messages?.map((message, index) => {
      return (
        <MessageBox isUser={message.isUser} key={index} theme={theme}>
          <IconContainer>
            {renderIcon(message)}
          </IconContainer>
          <TextBox>
            {message.image && (
              <Image src={message.image} width={200} height={200} alt='User Image'/>
            )}
            <MarkdownReader source={message.text} />
          </TextBox>
        </MessageBox>
      )
    })
  }
  return (
    <Container image={image}>
      {renderMessages()}
    </Container>
  )
}