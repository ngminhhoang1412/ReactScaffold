/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledButton = styled(IconButton)(({ theme }) => ({
    margin: '5px',
    backgroundColor: '#C62828',
    borderRadius: '12px',
    color: '#fff',
    width: '40px',
    height: '40px',
    // opacity: 0.7 ,
    '&:hover': {
        backgroundColor: '#C62828',
        opacity: 1
    }
}));
function ButtonDelete({ title = '', handleClick }) {
    return (
        <StyledButton aria-label="delete" onClick={handleClick}>
            <DeleteIcon />
        </StyledButton>
    );
}

export default ButtonDelete;
