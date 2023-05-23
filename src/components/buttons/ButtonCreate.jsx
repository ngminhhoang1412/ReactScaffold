/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
    margin: '5px',
    borderRadius: '12px'
}));
function ButtonCreate({ title = '', handleClick }) {
    return (
        <StyledButton variant="contained" onClick={handleClick}>
            {title}
        </StyledButton>
    );
}

export default ButtonCreate;
