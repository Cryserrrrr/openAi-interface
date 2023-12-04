'use client';

import { useEffect, useState, useRef, use } from 'react';

import styled from 'styled-components';

// Types
import { models, Theme } from '@/models/models';

// Theme
import Image from 'next/image';
import photo from '../asset/photo.svg';
import cross from '../asset/cross.svg';

interface InputBarProps {
  theme: Theme;
  handleModal: any;
  model: models;
  image: any;
  setImage: any;
  inputValue: string;
  setInputValue: any;
  handleRequest: any;
}

interface InputContainerProps {
  theme: Theme;
  image: any;
}

interface InputProps {
  haveicon: boolean;
}

interface ContainerProps {
  haveimage: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
  height: ${props => props.haveimage ? '200px' : '50px'};
  width: 50%;
  color: #fff;
  border-radius: 10px;
  position: absolute;
  bottom: 50px;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  max-height: 200px;
  min-height: 50px;
  background-color: ${props => props.theme.primary};
  border-radius: ${props => props.image ? '0 0 10px 10px' : '10px'};

  transition: .5s;
`;

const Input = styled.textarea<InputProps>`
  width: ${props => props.haveicon ? '85%' : '100%'};
  max-height: 200px;
  min-height: 50px;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.4em;
  outline: none;
  padding: 0 10px;
  overflow: hidden;
  resize: none;

  &::placeholder {
    color: #fff;
    opacity: 0.8;
  }
`;

const Select = styled.div`
  width: 15%;
  height: 50px;
  background-color: ${props => props.theme.primary};
  border-radius: 10px;
  border: none;
  color: #fff;
  font-size: 1.2em;
  outline: none;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  transition: .5s;
`;

const StyledImage = styled(Image)`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
`;

const ImagePreviewContainer = styled.div`
  width: 80%;
  background-color: ${props => props.theme.primary};
  border-radius: 10px 10px 0 0;
  padding: 10px;
`;

const ImagePreviewDiv = styled.div`
  height: 100px;
  width: 100px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.div`
  height: 20px;
  width: 20px;
  background-color: red;
  border-radius: 10px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;


export default function InputBar({ 
  theme,
  handleModal,
  model,
  image,
  setImage,
  inputValue,
  setInputValue,
  handleRequest,
} : InputBarProps ) {

  const [haveicon, setHaveicon] = useState<boolean>(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    if (model === 'GPT-Vision') {
      setHaveicon(true);
    } else {
      setHaveicon(false);
    }
  }, [model]);

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const openFolder = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
      const file = e.target?.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        setImage(e.target?.result);
      }
    }
    input.click();
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRequest();
    }
  }

  return (
    <Container haveimage={image && model === 'GPT-Vision' ? true : false}>
      {image && model === 'GPT-Vision' && 
        <ImagePreviewContainer theme={theme}>
          <ImagePreviewDiv>
            <DeleteButton onClick={() => setImage(null)}>
              <Image src={cross} alt="cross" width={20} height={20} />
            </DeleteButton>
            <Image src={image} alt="image" width={80} height={80} />
          </ImagePreviewDiv>
        </ImagePreviewContainer>
      }
      <SubContainer>
        <InputContainer theme={theme} image={image && model === models.GPTVision}>
          <Input 
            placeholder="Type your message..."
            onChange={(e: any) => handleChange(e)}
            value={inputValue}
            ref={textareaRef}
            haveicon={haveicon}
            onKeyDown={handleKeyPress}
          />
          {model === 'GPT-Vision' && <StyledImage src={photo} alt="camera" onClick={openFolder}/>}
        </InputContainer>
        <Select theme={theme} onClick={handleModal}>
          {model}
        </Select>
      </SubContainer>
    </Container>
  )
}