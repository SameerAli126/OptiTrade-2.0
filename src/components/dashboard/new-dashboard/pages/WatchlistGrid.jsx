import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { Trash2 } from 'lucide-react';

const systemFont = [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
].join(',');
const WatchlistGrid = ({ rows, loading, onRemove, onSymbolClick, formatMarketCap }) => {
    const columns = [
        {
            field: 'symbol',
            headerName: 'Symbol',
            minWidth: 120,
            renderCell: (params) => {
                const primaryLogo = params.row.logo_light;
                const fallbackLogo = params.row.clearbit_logo;
                const genericPlaceholder = 'https://via.placeholder.com/24';

                const handleImageError = (event) => {
                    event.target.src = genericPlaceholder;
                };

                return (
                    <div className="flex items-center py-1">
                        <img
                            src={primaryLogo || fallbackLogo || genericPlaceholder}
                            alt={`${params.value} Logo`}
                            className="w-6 h-6 mr-2 rounded-full object-contain"
                            onError={handleImageError}
                            loading="lazy"
                        />
                        <span
                            onClick={() => onSymbolClick(params.row)}
                            className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                            {params.value}
                        </span>
                    </div>
                );
            },
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 180,
        },
        { field: 'open', headerName: 'Open', type: 'number', align: 'right', headerAlign: 'right', minWidth: 100 },
        { field: 'high', headerName: 'High', type: 'number', align: 'right', headerAlign: 'right', minWidth: 100 },
        { field: 'low', headerName: 'Low', type: 'number', align: 'right', headerAlign: 'right', minWidth: 100 },
        { field: 'close', headerName: 'Close', type: 'number', align: 'right', headerAlign: 'right', minWidth: 100 },
        { field: 'volume', headerName: 'Volume', type: 'number', align: 'right', headerAlign: 'right', minWidth: 130 },
        {
            field: 'marketCap',
            headerName: 'Market Cap',
            align: 'right',
            headerAlign: 'right',
            minWidth: 130,
            renderCell: (params) => formatMarketCap(params.row.marketCap)
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            width: 80,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <button
                    onClick={(event) => {
                        event.stopPropagation();
                        onRemove(params.row.symbol);
                    }}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors duration-150"
                    aria-label={`Remove ${params.row.symbol} from watchlist`}
                >
                    <Trash2 size={18} />
                </button>
            ),
        },
    ];

    return (
        <Box sx={{ height: 'calc(100vh - 200px)', width: '100%', mt: 2 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                pageSizeOptions={[10, 25, 50, 100]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 25
                        }
                    }
                }}
                density="compact"
                sx={{
                    fontFamily: systemFont,
                    border: 'none',
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    '& .MuiDataGrid-columnHeaders': {
                        borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                        bgcolor: 'grey.100',
                        color: 'text.primary',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        letterSpacing: '0.5px',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                        color: 'text.secondary',
                    },
                    '& .MuiDataGrid-row:hover': {
                        bgcolor: 'action.hover',
                    },
                    '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
                        outline: 'none !important',
                    },
                    '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus': {
                        outline: 'none !important',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    },
                }}
            />
        </Box>
    );
};

export default WatchlistGrid;