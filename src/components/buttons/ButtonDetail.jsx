/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StyledButton = styled(IconButton)(({ theme }) => ({
    margin: '5px',
    backgroundColor: '#1565C0',
    borderRadius: '12px',
    color: '#fff',
    width: '40px',
    height: '40px',
    '&:hover': {
        backgroundColor: '#1565C0',
        opacity: 1
    }
}));
function ButtonDetail({ title = '', handleClick }) {
    return (
        <StyledButton aria-label="delete" onClick={handleClick}>
            <VisibilityIcon />
        </StyledButton>
    );
}

export default ButtonDetail;
