'use client'

import LogoSmallWhite from '../asset/logo_small_white.png';
import { models } from '@/models/models';
import styled from 'styled-components';
import Image from 'next/image';

interface LogoBoxProps {
  color: string,
}

interface LogoProps {
  models: models,
}

const colors = {
  [models.GPT4]: '#3c24d5',
  [models.GPT3]: '#128958',
  [models.GPTVision]: '#660099',
  [models.TextToSpeech]: '#b84e00',
  [models.SpeechToText]: '#b80000',
  [models.DallE3]: '#000',
}

const LogoBox = styled.div<LogoBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px 10px 0 10px;
  background-color: ${props => props.color};
`;

export default function Logo({ models }: LogoProps) {
  return (
    <LogoBox color={colors[models]}>
      <Image src={LogoSmallWhite} alt="Logo" height={30} width={30}/>
    </LogoBox>
  )
}