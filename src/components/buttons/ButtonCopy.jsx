/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { styled } from '@mui/material/styles';
import { IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const StyledButton = styled(IconButton)(({ theme }) => ({
    margin: '5px',
    backgroundColor: '#FFC107',
    borderRadius: '12px',
    color: '#fff',
    width: '40px',
    height: '40px',
    '&:hover': {
        backgroundColor: '#FFC107',
        opacity: 1
    }
}));
function ButtonEdit({ title = '', handleClick }) {
    return (
        <StyledButton aria-label="delete" onClick={handleClick}>
            <Tooltip title="Copy password">
                <ContentCopyIcon />
            </Tooltip>
        </StyledButton>
    );
}

export default ButtonEdit;
