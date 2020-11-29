import styled from 'styled-components';
import Delete from 'assets/delete.svg';

export const Container = styled.div`
    border: 1px solid #d6d6d6;
    margin: 0 auto;
    width: 300px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`;

export const ListHeader = styled.div`
    height: 56px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    padding: 0 8px;
    color: #e6e6e6;
    background-color: #fefefe;
`;

export const ListFooter = styled.div`
    margin-top: auto;
    height: 32px;
    border-top: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    padding: 0 8px 0px 12px;
    color: #4d4d4d;
`;

export const List = styled.div`
    list-style-type: none;
    margin: 0;
    padding: 0;
    min-height: 120px;
    max-height: 360px;
    overflow: auto;
`;

export const Item = styled.div`
    color: #4d4d4d;
    display: flex;
    align-items: center;
    padding: 0 8px;
    height: 40px;
    border-bottom: 1px solid #e6e6e6;
    display:flex;
    align-items: center;
    box-sizing: border-box;

    &:last-child:not(:nth-child(-n+2)){
        border-bottom: 0px;
    }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
   margin-right: 8px;
`;

export const AddButton = styled.button`
    background-color: #fff;
    width: 24px;
    height: 24px;
    padding: 2.4px 0;
    font-size: 14px;
    vertical-align: -1px;
    border-radius: 4px;
    border: 1px solid #1890ff;
    cursor: pointer;
    margin-left: auto;
    background-color: #1890ff;
    color: #fff;

    &:disabled{
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const DeleteButton = styled(AddButton)`
    background-color: #fff;
    border-color: #e6e6e6;
    color: #e6e6e6;

    & svg {
        fill: #e6e6e6;
    }
`;

export const ItemContent = styled.div`
    color: #4d4d4d
    font-size: 16px;
    height: 20px;
    box-sizing: border-box;
    display: ${({ hide }) => (hide ? 'none' : null)};
    width: calc(100% - 62px);
    &:hover{
        border-bottom: 1px solid  #e6e6e6;
    }
`;

export const Input = styled.input.attrs({ type: 'text' })`
    color:#4d4d4d;
    outline: 0;
    border-width: 0 0 1px;
    border-color: #4d4d4d;
    font-size: 16px;
    height: 20px;
    box-sizing: border-box;
    display: ${({ hide }) => (hide ? 'none' : null)};
    width: calc(100% - 62px);
`;

export const DeleteIcon = styled(Delete)`
    max-width: 16px;
    max-height: 16px;
`;
