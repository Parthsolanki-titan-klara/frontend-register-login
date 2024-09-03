/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../interceptor/axiosInstance';
// import { setAccessToken, setRefreshToken } from './pathToYourReduxActions'; // Import your Redux actions


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function RowMenu() {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Rename</MenuItem>
                <MenuItem>Move</MenuItem>
                <Divider />
                <MenuItem color="danger">Delete</MenuItem>
            </Menu>
        </Dropdown>
    );
}

export default function OrderTable() {
    const [order, setOrder] = useState('desc');
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);

    // get userName from the redux store
    const email = useSelector((state) => state.auth.email);

    // get accessToken from the redux store
    const accessToken = useSelector((state) => state.auth.accessToken);

    // get refreshToken from the redux store
    const refreshToken = useSelector((state) => state.auth.refreshToken);

    const dispatch = useDispatch();


    // const refreshAccessToken = async () => {
    //     try {
    //         const response = await axiosInstance.post(`${import.meta.env.VITE_API_BASE_URL}/refresh-token`, {
    //             token: refreshToken,
    //         });
    //         const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
    //         dispatch(setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken}));
    //         return newAccessToken;
    //     } catch (error) {
    //         console.error('Failed to refresh token', error);
    //         // Handle token refresh failure (e.g., redirect to login)
    //     }
    // };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const allUserUrl = `${import.meta.env.VITE_API_BASE_URL}/allusers`;

                const response = await axiosInstance.get(allUserUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    params: {
                        email: email,
                    }
                });

                // // If the response indicates the token is expired, refresh the token
                // if (response.status === 401) {
                //     log('Access token expired. Refreshing token...');
                //     const newAccessToken = await refreshAccessToken();
                //     if (newAccessToken) {
                //         response = await axiosInstance.get(allUserUrl, {
                //             headers: {
                //                 'Content-Type': 'application/json',
                //                 'Authorization': `Bearer ${newAccessToken}`,
                //             },
                //             params: {
                //                 email: email,
                //             }
                //         });
                //     }
                // }

                const data = response.data;
                console.log("Response: ", data);

                const userResponseList = data.userResponseList;
                console.log("User Response List: ", userResponseList);


                // Convert JSON object to array with keys
                const dataArray = Object.keys(userResponseList).map(key => ({ key, value: userResponseList[key] }));
                console.log("Data Array with Key: ", dataArray);
                setRows(dataArray);

            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [filter, page]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRows = rows.filter(row =>
        row.value.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.value.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const renderFilters = () => (
        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>Role</FormLabel>
                <Select
                    size="sm"
                    placeholder="Filter by role"
                    // value={roleFilter}
                    // onChange={handleRoleChange}
                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                >
                    <Option value="">All</Option>
                    <Option value="admin">ADMIN</Option>
                    <Option value="user">USER</Option>
                </Select>
            </FormControl>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Sheet
                className="SearchAndFilters-mobile"
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                    my: 1,
                    gap: 1,
                }}
            >
                <Input
                    size="sm"
                    placeholder="Search by FirstName"
                    startDecorator={<SearchIcon />}
                    sx={{ flexGrow: 1 }}

                />
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => setOpen(true)}
                >
                    <FilterAltIcon />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
                        <ModalClose />
                        <Typography id="filter-modal" level="h2">
                            Filters
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {renderFilters()}
                            <Button color="primary" onClick={() => setOpen(false)}>
                                Submit
                            </Button>
                        </Sheet>
                    </ModalDialog>
                </Modal>
            </Sheet>
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: { xs: 'none', sm: 'flex' },
                    flexWrap: 'wrap',
                    gap: 1.5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' },
                    },
                }}
            >
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Search for user</FormLabel>
                    <Input size="sm" placeholder="Search by First Name , Last Name" startDecorator={<SearchIcon />} value={searchTerm}
                        onChange={handleSearchChange} />
                </FormControl>
                {renderFilters()}
            </Box>
            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0,
                }}            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px',
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                                <Checkbox
                                    size="sm"
                                    indeterminate={
                                        selected.length > 0 && selected.length !== rows.length
                                    }
                                    checked={selected.length === rows.length}
                                    onChange={(event) => {
                                        setSelected(
                                            event.target.checked ? rows.map((row) => row.key) : [],
                                        );
                                    }}
                                    color={
                                        selected.length > 0 || selected.length === rows.length
                                            ? 'primary'
                                            : undefined
                                    }
                                    sx={{ verticalAlign: 'text-bottom' }}
                                />
                            </th>
                            <th style={{ width: 120, padding: '12px 6px' }}>
                                <Link
                                    underline="none"
                                    color="primary"
                                    component="button"
                                    onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                                    fontWeight="lg"
                                    endDecorator={<ArrowDropDownIcon />}
                                    sx={{
                                        '& svg': {
                                            transition: '0.2s',
                                            transform:
                                                order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                        },
                                    }}
                                >
                                    Id
                                </Link>
                            </th>
                            <th style={{ width: 140, padding: '12px 6px' }}>First Name</th>
                            <th style={{ width: 140, padding: '12px 6px' }}>Last Name</th>
                            <th style={{ width: 100, padding: '12px 6px' }}>Status</th>
                            <th style={{ width: 200, padding: '12px 6px' }}>Email</th>
                            <th style={{ width: 140, padding: '12px 6px' }}>Role </th>
                            <th style={{ width: 140, padding: '12px 6px' }}> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stableSort(filteredRows, getComparator(order, 'key')).map((row) => (
                            <tr key={row.key}>
                                <td style={{ textAlign: 'center', width: 120 }}>
                                    <Checkbox
                                        size="sm"
                                        checked={selected.includes(row.key)}
                                        color={selected.includes(row.key) ? 'primary' : undefined}
                                        onChange={(event) => {
                                            setSelected((ids) =>
                                                event.target.checked
                                                    ? ids.concat(row.key)
                                                    : ids.filter((itemId) => itemId !== row.key),
                                            );
                                        }}
                                        slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                                        sx={{ verticalAlign: 'text-bottom' }}
                                    />
                                </td>
                                <td>
                                    <Typography level="body-xs">{row.value.id}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-xs">{row.value.firstName}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-xs">{row.value.lastName}</Typography>
                                </td>
                                <td>
                                    <Chip
                                        variant="soft"
                                        size="sm"
                                        startDecorator={
                                            {
                                                Paid: <CheckRoundedIcon />,
                                                Refunded: <AutorenewRoundedIcon />,
                                                Cancelled: <BlockIcon />,
                                            }['Paid']
                                        }
                                        color={
                                            {
                                                Paid: 'success',
                                                Refunded: 'neutral',
                                                Cancelled: 'danger',
                                            }['Paid']
                                        }
                                    >
                                        {'Paid'}
                                    </Chip>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Avatar size="sm">{row.value.firstName.charAt(0)}</Avatar>
                                        <div>
                                            <Typography level="body-xs">{row.value.email}</Typography>
                                        </div>
                                    </Box>
                                </td>
                                <td>
                                    <Typography level="body-xs">{row.value.userRole}</Typography>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Link level="body-xs" component="button">
                                            Download
                                        </Link>
                                        <RowMenu />
                                    </Box>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>
            <Box
                className="Pagination-mobile"
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    py: 1,
                }}
            >
                <IconButton size="sm" variant="outlined" color="neutral">
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <Typography level="body2">1-5 of 13</Typography>
                <IconButton size="sm" variant="outlined" color="neutral">
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Box>
        </React.Fragment>
    );
}
