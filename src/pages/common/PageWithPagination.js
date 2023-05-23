/* eslint-disable react/button-has-type */
import { useState, useEffect, useMemo } from 'react';
import MainCard from "../../components/cards/MainCard";
import PropTypes from 'prop-types';

// import tables component
import StyledTableCell from '../../components/tables/StyledTableCell';
import StyledTableRow from '../../components/tables/StyledTableRow';

// button component
import ButtonCreate from '../../components/buttons/ButtonCreate';
import ButtonDelete from '../../components/buttons/ButtonDelete';
import ButtonEdit from '../../components/buttons/ButtonEdit';

// Model
import ModalDetail from '../../components/modals/ModalDetail';
import ModalConfirm from '../../components/modals/ModalConfirm';

// Form

import { toast } from 'react-toastify';

import { Box, Chip, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Pagination, CircularProgress } from '@mui/material';
import { filterNullFieldOfObject } from '../../utils/filterNullFieldOfObject';
import { useLocation, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';

function PageWithPagination({ actionForm, formInitData, title, getDataList, onAdd, onUpdate, onDestroy, tableStructure, formSize }) {
    // =================================== STATE ===================================
    const [loading, setLoading] = useState(false);

    const [tableData, setTableData] = useState([]);
    const [meta, setMeta] = useState({
        total: 1,
        current_page: 1,
        per_page: 20,
        next_page_url: null,
        previous_page_url: null,
        last_page: 1
    });
    const ActionForm = actionForm;

    // STATE: modals CRUD
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState({
        open: false,
        data: null
    });
    const [showModalDelete, setShowModalDelete] = useState({
        open: false,
        data: null
    });

    // =================================== HOOKS ===================================
    const location = useLocation();
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            page: Number.parseInt(params.page, 10) || 1
        };
    }, [location.search]);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        // eslint-disable-next-line no-use-before-define
        getList().then(() => {});
    }, [queryParams]);

    // =================================== FUNCTIONS ===================================
    const getList = async () => {
        setLoading(true);
        getDataList(queryParams)
            .then((response) => {
                if (response?.status.toString() !== 'success') throw new Error(`Get list failed`);
                if (response?.data) {
                    setMeta({ ...response?.meta });
                } else {
                    setMeta({ ...response?.data });
                }
                setTableData([...response?.data]);
                setLoading(false);
            })
            .catch((error) => {
                console.log('error :>> ', error);
                setLoading(false);
            })
            .finally(() => {});
    };

    const onCreate = async (event) => {
        setShowModalCreate(false);
        setLoading(true);
        onAdd(event)
            .then((response) => {
                if (response.status.toString() !== 'success') throw new Error('Create failed');
                toast.success(`Create success`);
                getList();
            })
            .catch((error) => {
                console.log('error :>> ', error);
                toast.error(error?.message || 'Somethings error');
                setLoading(false);
            })
            .finally(() => {});
    };
    const onEdit = async (event) => {
        setShowModalEdit({ ...showModalEdit, open: false, data: null });
        setLoading(true);
        onUpdate(event)
            .then((response) => {
                if (response.status.toString() !== 'success') throw new Error('Edit failed');
                toast.success(`Edit success`);
                getList();
            })
            .catch((error) => {
                console.log('error :>> ', error);
                toast.error(error?.message || 'Somethings error');
                setLoading(false);
            })
            .finally(() => {});
    };
    const onDelete = async (event) => {
        setLoading(true);
        setShowModalDelete({ ...showModalDelete, open: false, data: null });
        onDestroy(event)
            .then((response) => {
                if (response.status.toString() !== 'success') throw new Error('Delete failed');
                toast.success(`Delete success`);
                getList();
            })
            .catch((error) => {
                console.log('error :>> ', error);
                toast.error(error?.message || 'Somethings error');
                setLoading(false);
            })
            .finally(() => {});
    };
    const onChangePage = async (event, page) => {
        setSearchParams(filterNullFieldOfObject({ ...queryParams, page }));
    };

    return (
        <MainCard
            title={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {title}
                    <Chip label={meta.total || 0} color="success" size="small" sx={{ marginLeft: '0.5rem', fontSize: '1rem' }} />
                </Box>
            }
            secondary={<ButtonCreate title={`Add ${title}`} handleClick={() => setShowModalCreate(true)} />}
        >
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableStructure.columns.map((name) => (
                                <StyledTableCell align="center" key={name}>
                                    {name}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center" style={{ width: '20%' }}>
                                Actions
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && (
                            <StyledTableRow style={{ height: 300 }}>
                                <StyledTableCell colSpan={6}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            width: '100%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <CircularProgress />
                                    </Box>
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                        {!loading &&
                            (tableData.length === 0 ? (
                                <StyledTableRow style={{ height: 300 }}>
                                    <StyledTableCell colSpan={8}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                width: '100%',
                                                height: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: '25px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            NO DATA
                                        </Box>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ) : (
                                tableData.map((item, index) => (
                                    <StyledTableRow key={index}>
                                        {tableStructure.values.map((columnStructure, index) => {
                                            const fieldName = columnStructure.fieldName;
                                            const style = columnStructure.style;
                                            const listItemFieldName = columnStructure.listItemFieldName;
                                            if (style === 'List') {
                                                return (
                                                    <StyledTableCell align="center" key={index}>
                                                        {!item[fieldName] || item[fieldName].length <= 0
                                                            ? 'None'
                                                            : item[fieldName].map((listItem, index) => (
                                                                  <Chip
                                                                      key={index}
                                                                      size="small"
                                                                      sx={{ background: '#00C853', color: '#fff', margin: '2px' }}
                                                                      label={listItem[listItemFieldName]}
                                                                  />
                                                              ))}
                                                    </StyledTableCell>
                                                );
                                            }
                                            return (
                                                <StyledTableCell align="center" key={index}>
                                                    {item[fieldName]}
                                                </StyledTableCell>
                                            );
                                        })}
                                        <StyledTableCell align="center">
                                            <ButtonEdit
                                                handleClick={() =>
                                                    setShowModalEdit({
                                                        ...showModalEdit,
                                                        open: true,
                                                        data: { ...item }
                                                    })
                                                }
                                            />
                                            <ButtonDelete
                                                handleClick={() =>
                                                    setShowModalDelete({
                                                        ...showModalDelete,
                                                        open: true,
                                                        data: { ...item }
                                                    })
                                                }
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    width: '100%',
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Pagination count={meta.last_page} page={meta.current_page} onChange={onChangePage} color="primary" />
            </Box>

            {/* Modal create */}
            <ModalDetail
                // eslint-disable-next-line react/jsx-curly-brace-presence
                title={`Add ${title}`}
                // eslint-disable-next-line react/jsx-curly-brace-presence
                maxWidth={formSize}
                onClose={() => setShowModalCreate(null)}
                aria-labelledby="customized-dialog-title"
                open={Boolean(showModalCreate)}
            >
                <div>
                    <ActionForm onFormSubmit={onCreate} initData={formInitData} />
                </div>
            </ModalDetail>

            {/* Modal edit */}
            <ModalDetail
                // eslint-disable-next-line react/jsx-curly-brace-presence
                title={`Edit ${title}`}
                // eslint-disable-next-line react/jsx-curly-brace-presence
                maxWidth={formSize}
                onClose={() => setShowModalEdit({ ...showModalEdit, open: false, data: null })}
                aria-labelledby="customized-dialog-title"
                open={Boolean(showModalEdit.open)}
            >
                <ActionForm onFormSubmit={onEdit} initData={formInitData} selectedData={{ ...showModalEdit.data }} />
            </ModalDetail>

            {/* Modal delete */}
            <ModalConfirm
                onClose={() => setShowModalDelete({ ...showModalDelete, open: false, data: null })}
                aria-labelledby="customized-dialog-title"
                open={Boolean(showModalDelete.open)}
                data={{ ...showModalDelete.data }}
                onConfirm={onDelete}
            />
        </MainCard>
    );
}

PageWithPagination.propTypes = {
    tableStructure: PropTypes.exact({
        columns: PropTypes.arrayOf(PropTypes.string),
        values: PropTypes.arrayOf(PropTypes.object)
    }).isRequired,
    onAdd: PropTypes.func.isRequired,
    onDestroy: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    getDataList: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    formInitData: PropTypes.object.isRequired,
    actionForm: PropTypes.any.isRequired,
    formSize: PropTypes.string.isRequired
};

export default PageWithPagination;
