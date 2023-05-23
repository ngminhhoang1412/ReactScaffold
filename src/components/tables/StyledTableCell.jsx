import { styled } from '@mui/material/styles';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#673AB7',
        color: theme.palette.common.white
        // color: '#2196F3'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

export default StyledTableCell;
