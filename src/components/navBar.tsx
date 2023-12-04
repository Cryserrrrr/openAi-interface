'use client';

import styled from 'styled-components';
import Image from 'next/image';

import { Theme } from '@/utils/theme';
import chatgptIcon from '../asset/chatgpticon.svg';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  width: 50%;
  background-color: ${props => props.theme.primary};
  color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 20px;

  transition: .5s;
`;

const Logo = styled(Image)`
  height: 50px;
`;

const Slider = styled.span`
  --background: ${props => props.theme.background};
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--background);
  transition: .5s;
  border-radius: 30px;

  &:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 50%;
    left: 10%;
    bottom: 15%;
    box-shadow: inset 8px -4px 0px 0px #fff000;
    background: var(--background);
    transition: .5s;
  }
`;

const Checkbox = styled.input`
  &:checked + ${Slider} {
    background-color: ${props => props.theme.background};
  }

  &:checked + ${Slider}:before {
    transform: translateX(100%);
    box-shadow: inset 15px -4px 0px 15px #fff000;
  }
`;

const Switch = styled.label`
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;

  & ${Checkbox} {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

export default function NavBar({ handleTheme, theme }: { handleTheme: any, theme: Theme }) {

  return (
    <Container theme={theme}>
      <Logo src={chatgptIcon} alt="logo" width={40}/>
      <Switch>
        <Checkbox type="checkbox" onChange={handleTheme} theme={theme}/>
        <Slider theme={theme}/>
      </Switch>
    </Container>
  )
}