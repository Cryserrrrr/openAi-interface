'use client';

import { useEffect, useState, useRef, use } from 'react';

import styled from 'styled-components';

// Types
import { models, Theme } from '@/models/models';

// Theme
import Image from 'next/image';
import photo from '../asset/photo.svg';
import cross from '../asset/cross.svg';
import stop from '../asset/stop.svg';

interface InputBarProps {
  theme: Theme;
  handleModal: any;
  model: models;
  images: string[] | null;
  setImages: (images: string[]) => void;
  inputValue: string;
  setInputValue: any;
  handleRequest: any;
  textareaRef: any;
  loading: boolean;
  abortRequest: boolean;
  setAbortRequest: any;
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
  min-height: ${props => props.haveimage ? '200px' : '50px'};
  width: 50%;
  color: #fff;
  border-radius: 10px;
  position: absolute;
  bottom: 50px;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
  background-color: transparent;
  max-height: 200px;
  border: none;
  color: #fff;
  font-size: 1.4em;
  outline: none;
  padding: 0 10px;
  overflow-y: auto;
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
  font-size: 1em;
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
  display: flex;
  align-items: center;
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

const AbortButton = styled.div`
  height: 50px;
  width: 300px;
  background-color: ${props => props.theme.primary};
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
`;

const StyledStop = styled(Image)`
  margin-right: 15px;
`;

export default function InputBar({ 
  theme,
  handleModal,
  model,
  images,
  setImages,
  inputValue,
  setInputValue,
  handleRequest,
  textareaRef,
  loading,
  abortRequest,
  setAbortRequest,
} : InputBarProps ) {

  const [haveicon, setHaveicon] = useState<boolean>(false);

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
    input.multiple = true;
    input.onchange = async (e) => {
      const files = e.target?.files;
      if (!files || files.length === 0) {
        return;
      }
      const readFiles = async () => {
        const base64Promises = Array.from(files).map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const result = event.target?.result;
              if (typeof result === 'string') {
                resolve(result);
              }
            };
            reader.readAsDataURL(file);
          });
        });
        const base64Results = await Promise.all(base64Promises);
        if (images) {
          const newImages = base64Results.filter((image: string) => !images.includes(image));
          setImages([...images, ...newImages]);
          return;
        }
        setImages(base64Results);
      };
      readFiles();
    };
    input.click();
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
      handleRequest();
    }
  }

  const handleDeleteImage = (image: string) => {
    const newImage = images?.filter((i: string) => i !== image);
    setImages(newImage || []);
  }


  const renderImages = () => {
    return images?.map((image: string, index: number) => (
      <ImagePreviewDiv key={index}>
        <DeleteButton onClick={() => handleDeleteImage(image)}>
        <Image src={cross} alt="cross" width={20} height={20} />
        </DeleteButton>
        <Image src={image} alt="image" width={80} height={80} />
      </ImagePreviewDiv>
    ))
  }

  return (
    <Container haveimage={images?.length !== 0 && model === 'GPT-Vision' ? true : false}>
      {images?.length !== 0 && model === models.GPTVision && 
        <ImagePreviewContainer theme={theme}>
          {renderImages()}
        </ImagePreviewContainer>
      }
      <SubContainer>
        {loading && !abortRequest ?
          <AbortButton theme={theme} onClick={() => setAbortRequest(true)}>
            <StyledStop src={stop} alt="stop" width={20} height={20} />
            Stop the generation
          </AbortButton>
        :
          <InputContainer theme={theme} image={images?.length !== 0 && model === models.GPTVision}>
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
        }
        <Select theme={theme} onClick={handleModal}>
          {model}
        </Select>
      </SubContainer>
    </Container>
  )
}