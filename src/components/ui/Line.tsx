import React from 'react';
import styled, { BaseThemedCssFunction } from 'styled-components';
import { NodeState } from '../../models';
import { SELECTED_STATE, LOCKED_STATE } from '../../components/constants';
import { SkillTheme } from '../../theme';

const keyframes = require('styled-components').keyframes;
const css: BaseThemedCssFunction<SkillTheme> = require('styled-components').css;

interface GapProps {
  extraGapLevel: number;
}

interface LineProps {
  state: NodeState;
}

interface StyledLineProps {
  selected: boolean;
  unlocked: boolean;
}

function Line({ state, extraGapLevel }: LineProps & GapProps) {
  return (
    <LineContainer extraGapLevel={extraGapLevel}>
      <StyledLine
        data-testid="straight-line"
        selected={state === SELECTED_STATE}
        unlocked={state !== LOCKED_STATE}
        extraGapLevel={extraGapLevel}
      />
    </LineContainer>
  );
}

export default Line;

const LineContainer = styled.div<GapProps>`
  ${({ extraGapLevel }) => `height: ${56 + extraGapLevel * (56 + 36)}px;`}
  left: 4px;
  margin: 0 auto;
  position: relative;
  width: 4px;
`;

const slidedown = keyframes`
  from,
  50% {
    background-position: right top;
  }

  to {
    background-position: left bottom;
  }
`;

const StyledLine = styled.div<StyledLineProps & GapProps>`
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 51%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 210% 100%;
  background-position: right top;
  border: ${({ theme }) => theme.edgeBorder};
  height: 4px;
  opacity: 0.5;
  transform: rotate(90deg);
  transform-origin: 0 0;
  transition: opacity 0.6s;
  ${({ extraGapLevel }) =>
    css`
      width: ${54 + extraGapLevel * (56 + 36)}px;
    `}

  ${props =>
    props.selected &&
    css`
      animation: ${slidedown} 1.2s 1 ease-out;
      background-position: left bottom;
    `}

  ${props =>
    props.unlocked &&
    `
      opacity: 1;
    `}
`;
