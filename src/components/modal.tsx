'use client';

import styled from 'styled-components';

// Types
import { Theme, models } from '@/types/types';

interface ModalProps {
  model: models;
  setModel: (model: models) => void;
  theme: Theme;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 40%;
  background-color: ${props => props.theme.primary};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;

  transition: .5s;
`;

const Title = styled.h2`
  color: #fff;
  margin: 20px 0;
`;

const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  height: 80%;
`;

const Choice = styled.div`
  border-radius: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.unselected};
  font-size: 1.2em;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.text};
  }

  transition: .5s;
`;

const SelectedChoice = styled(Choice)`
  color: ${props => props.theme.text};
`;

/**
 * Modal
 *
 * @export
 * @param {ModalProps} {
 *   model,
 *   setModel,
 *   theme
 * }
 * @return {*} 
 */
export default function Modal({
  model,
  setModel,
  theme
}: ModalProps) {

  /**
   * renderModels
   * Renders the models
   *
   * @return {*}
   * @memberof Modal 
   */
  const renderModels = () => {
    return Object.values(models).map((choice, index) => (
      choice === model ?
        <SelectedChoice key={index} onClick={() => setModel(choice)} theme={theme}>{choice}</SelectedChoice>
      :
        <Choice key={index} onClick={() => setModel(choice)} theme={theme}>{choice}</Choice>
    ))
  }

  return (
    <Container theme={theme}>
      <Title>Choose a model</Title>
      <ChoiceContainer>
        {renderModels()}
      </ChoiceContainer>
    </Container>
  )
}
