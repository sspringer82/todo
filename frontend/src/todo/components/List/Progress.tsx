import styled, { css } from 'styled-components';

type ProgressElProps = {
    color?: string;
    percentage: number;
}

const Progress = styled.div`
    position: absolute;
    ${({color = 'green'}: ProgressElProps) => css`
        background-color: ${color};
    `}; 
    top: 0; 
    left: 0;
    bottom: 0;
    right: 0;
    ${({percentage}: ProgressElProps) => css`
        max-width: ${percentage}%;
    `};
    opacity: 0.2;
`;

export default Progress;