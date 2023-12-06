'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';

// Images
import user from '../asset/user.svg';

// Types
import { Message, Theme } from '@/types/types';

// markdownReader
import MarkdownPreview from '@uiw/react-markdown-preview';

// Icon function
import Logo from '@/utils/modelsLogo';

interface ContainerProps {
  image: string[] | null;
  textareaRef: any;
}

interface MessageBoxProps {
  isUser: boolean;
  theme: Theme;
}

interface ChatSectionProps {
  messages: Message[];
  images: string[] | null;
  theme: Theme;
  textareaRef: React.RefObject<HTMLElement>;
}

const Container = styled.div<ContainerProps>`
  max-height: ${props => props.image ? 'calc(100vh - 400px)' : `calc(100vh - 200px - ${props.textareaRef}px)`};
  width: 50%;
  color: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  padding: 0 10px;

  transition: .5s;
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

  transition: .5s;
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

  transition: .5s;
`;

const ImageBox = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${props => props.theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0 10px;

  transition: .5s;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  color: ${props => props.theme.colorChat};

  transition: .5s;
`;

/**
 * ChatSection
 *
 * @export
 * @param {ChatSectionProps} {
 *   messages,
 *   images,
 *   theme,
 *   textareaRef
 * }
 * @return {*} 
 */
export default function ChatSection({
  messages,
  images,
  theme,
  textareaRef
} : ChatSectionProps ) {

  const containerRef = useRef<HTMLDivElement | null>(null);

  /**
   * scrollToBottom
   * Scroll to the bottom of the chat when assisstant is writing
   * @return {void}
   * @memberof ChatSection
   */
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Call scrollToBottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])


  /**
   * renderIcon
   * Render the icon of the message
   * @param {Message} message
   * @return {*} 
   * @memberof ChatSection
   */
  const renderIcon = (message: Message) => {
    if (message.isUser) {
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
          <Logo models={message.model} />
        </ImageDiv>
      )
    }
  }

  /**
   * renderImages
   * Render the images of the message
   * @param {Message}
   * @return {void}
   * @memberof ChatSection
   */
  const renderImages = (message: Message) => {
    return message.image?.map((image, index) => (
      <Image src={image} width={200} height={200} alt='User Image' key={index}/>
    ))
  }

  /**
   * renderMessages
   * Render the messages
   * @return {*}
   * @memberof ChatSection
   */
  const renderMessages = () => {
    return messages?.map((message, index) => {
      return (
        <MessageBox isUser={message.isUser} key={index} theme={theme}>
          <IconContainer>
            {renderIcon(message)}
          </IconContainer>
          <TextBox theme={theme}>
            {message.image ? renderImages(message) : null}
            {message.isUser ?
              <pre>{message.text}</pre>
            :
              <MarkdownPreview
                source={message.text}
                style={{ backgroundColor: 'transparent', width: '100%' }}
              />
            }
          </TextBox>
        </MessageBox>
      )
    })
  }

  return (
    <Container 
      image={images && images?.length !== 0 ? images : null}
      textareaRef={textareaRef?.current?.clientHeight ? (textareaRef.current.clientHeight as number) : 5}
    >
      {renderMessages()}
      <div ref={containerRef}></div>
    </Container>
  )
}