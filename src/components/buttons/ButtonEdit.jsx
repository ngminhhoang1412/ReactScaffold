/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const StyledButton = styled(IconButton)(({ theme }) => ({
    margin: '5px',
    backgroundColor: '#00C853',
    borderRadius: '12px',
    color: '#fff',
    width: '40px',
    height: '40px',
    '&:hover': {
        backgroundColor: '#00C853',
        opacity: 1
    }
}));
function ButtonEdit({ title = '', handleClick }) {
    return (
        <StyledButton aria-label="delete" onClick={handleClick}>
            <EditIcon />
        </StyledButton>
    );
}

export default ButtonEdit;
