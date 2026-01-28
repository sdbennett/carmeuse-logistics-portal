import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Chip,
  IconButton,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
  Collapse,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RefreshCw, Search, X, ChevronDown, ChevronRight } from 'lucide-react';
import {
  Quarry,
  VesselSchedule,
  mockQuarries,
  mockVesselSchedules,
  mockVessels,
  mockCarriers,
  mockCustomers,
  mockProducts,
} from '../lib/mockData';
import dayjs from 'dayjs';
import { ScheduleCard } from './ScheduleCard';

type Order = 'asc' | 'desc';

export function ScheduleByQuarry() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [quarries] = useState<Quarry[]>(mockQuarries);
  const [selectedQuarry, setSelectedQuarry] = useState<string>(mockQuarries[0]?.id || '');
  const [schedules, setSchedules] = useState<VesselSchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState<string>('date');
  const [order, setOrder] = useState<Order>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const getCurrentWeekDates = () => {
    const today = dayjs();
    const dayOfWeek = today.day();
    const startOfWeek = today.subtract(dayOfWeek, 'day');
    const endOfWeek = today.add(6 - dayOfWeek, 'day');
    return { start: startOfWeek, end: endOfWeek };
  };

  const { start: defaultStart, end: defaultEnd } = getCurrentWeekDates();
  const [filters, setFilters] = useState({
    search: '',
    startDate: defaultStart,
    endDate: defaultEnd,
    status: 'Active / Arrived',
  });

  useEffect(() => {
    if (selectedQuarry) {
      loadSchedules();
    }
  }, [selectedQuarry, filters]);

  const loadSchedules = () => {
    if (!selectedQuarry) return;

    setLoading(true);

    let filteredSchedules = mockVesselSchedules.filter(
      (schedule) => schedule.quarry_id === selectedQuarry
    );

    if (filters.status) {
      const statuses = filters.status.split(' / ').map((s) => s.trim());
      filteredSchedules = filteredSchedules.filter((schedule) =>
        statuses.includes(schedule.status || 'Active')
      );
    }

    if (filters.startDate) {
      filteredSchedules = filteredSchedules.filter((schedule) => {
        const scheduleDate = dayjs(schedule.date);
        return scheduleDate.isAfter(filters.startDate) || scheduleDate.isSame(filters.startDate, 'day');
      });
    }

    if (filters.endDate) {
      filteredSchedules = filteredSchedules.filter((schedule) => {
        const scheduleDate = dayjs(schedule.date);
        return scheduleDate.isBefore(filters.endDate) || scheduleDate.isSame(filters.endDate, 'day');
      });
    }

    const enrichedSchedules = filteredSchedules.map((schedule) => ({
      ...schedule,
      quarry: mockQuarries.find((q) => q.id === schedule.quarry_id),
      vessel: mockVessels.find((v) => v.id === schedule.vessel_id),
      carrier: mockCarriers.find((c) => c.id === schedule.carrier_id),
      customer: mockCustomers.find((c) => c.id === schedule.customer_id),
      product: mockProducts.find((p) => p.id === schedule.product_id),
    }));

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredSchedules = enrichedSchedules.filter((schedule) => {
        return (
          schedule.vessel?.name.toLowerCase().includes(searchLower) ||
          schedule.carrier?.name.toLowerCase().includes(searchLower) ||
          schedule.customer?.name.toLowerCase().includes(searchLower) ||
          schedule.product?.name.toLowerCase().includes(searchLower) ||
          schedule.dock_location?.toLowerCase().includes(searchLower) ||
          schedule.dock_location_detail?.toLowerCase().includes(searchLower)
        );
      });
      setSchedules(filteredSchedules);
    } else {
      setSchedules(enrichedSchedules);
    }

    setLoading(false);
  };

  const handleQuarryChange = (event: SelectChangeEvent) => {
    setSelectedQuarry(event.target.value);
  };

  const handleFilterChange = (field: string) => (event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, [field]: event.target.value }));
  };

  const clearSearch = () => {
    setFilters(prev => ({ ...prev, search: '' }));
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedSchedules = useMemo(() => {
    const sorted = [...schedules].sort((a: any, b: any) => {
      let aValue: any = a[orderBy];
      let bValue: any = b[orderBy];

      if (orderBy === 'vessel') {
        aValue = a.vessel?.name || '';
        bValue = b.vessel?.name || '';
      } else if (orderBy === 'carrier') {
        aValue = a.carrier?.name || '';
        bValue = b.carrier?.name || '';
      } else if (orderBy === 'customer') {
        aValue = a.customer?.name || '';
        bValue = b.customer?.name || '';
      } else if (orderBy === 'product') {
        aValue = a.product?.name || '';
        bValue = b.product?.name || '';
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue?.toLowerCase() || '';
      }

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [schedules, order, orderBy]);

  const paginatedSchedules = useMemo(() => {
    return sortedSchedules.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedSchedules, page, rowsPerPage]);

  const getStatusColor = (status?: string) => {
    if (!status) return 'default';
    if (status === 'Active') return 'success';
    if (status === 'Arrived') return 'info';
    if (status === 'TBD') return 'warning';
    if (status === 'Loaded') return 'primary';
    if (status === 'Cancelled') return 'error';
    return 'default';
  };

  const getDockTypeColor = (dockType?: string) => {
    if (dockType === 'S') return '#90ee90';
    if (dockType === 'N') return '#ffffff';
    if (dockType === 'W/S') return '#ffffe0';
    return '#ffffff';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant={isMobile ? 'h6' : 'h5'} component="h1" sx={{ fontWeight: 600 }}>
          Schedule By Quarry
        </Typography>
        <IconButton onClick={loadSchedules} disabled={loading} size="small">
          <RefreshCw size={20} />
        </IconButton>
      </Box>

      <Paper sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Quarry</InputLabel>
                <Select
                  value={selectedQuarry}
                  label="Quarry"
                  onChange={handleQuarryChange}
                >
                  {quarries.map((quarry) => (
                    <MenuItem key={quarry.id} value={quarry.id}>
                      {quarry.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  label="Status"
                  onChange={handleFilterChange('status')}
                >
                  <MenuItem value="Active / Arrived">Active / Arrived</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Arrived">Arrived</MenuItem>
                  <MenuItem value="TBD">TBD</MenuItem>
                  <MenuItem value="Loaded">Loaded</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 2 }}>
              <DatePicker
                label="Start Date"
                value={filters.startDate}
                onChange={(newValue) => setFilters(prev => ({ ...prev, startDate: newValue || defaultStart }))}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                  },
                }}
              />

              <DatePicker
                label="End Date"
                value={filters.endDate}
                onChange={(newValue) => setFilters(prev => ({ ...prev, endDate: newValue || defaultEnd }))}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                  },
                }}
              />
            </Box>

            <TextField
              fullWidth
              size="small"
              label="Search"
              placeholder="Search by carrier, vessel, customer, product, or dock location..."
              value={filters.search}
              onChange={handleFilterChange('search')}
              InputProps={{
                startAdornment: <Search size={20} style={{ marginRight: 8, color: '#666' }} />,
                endAdornment: filters.search && (
                  <IconButton size="small" onClick={clearSearch}>
                    <X size={16} />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </LocalizationProvider>
      </Paper>

      {isMobile ? (
        <Box>
          {paginatedSchedules.map((schedule) => (
            <ScheduleCard key={schedule.id} schedule={schedule} />
          ))}
          {paginatedSchedules.length === 0 && (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                {loading ? 'Loading schedules...' : 'No schedules found for the selected quarry'}
              </Typography>
            </Paper>
          )}
          <TablePagination
            component="div"
            count={sortedSchedules.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
          />
        </Box>
      ) : (
        <Paper>
          <TableContainer sx={{ maxHeight: 'calc(100vh - 450px)' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                    <TableSortLabel
                      active={orderBy === 'load_number'}
                      direction={orderBy === 'load_number' ? order : 'asc'}
                      onClick={() => handleRequestSort('load_number')}
                    >
                      No
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                    <TableSortLabel
                      active={orderBy === 'dock_type'}
                      direction={orderBy === 'dock_type' ? order : 'asc'}
                      onClick={() => handleRequestSort('dock_type')}
                    >
                      Quarry Dock
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                    <TableSortLabel
                      active={orderBy === 'vessel'}
                      direction={orderBy === 'vessel' ? order : 'asc'}
                      onClick={() => handleRequestSort('vessel')}
                    >
                      Vessel Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                    <TableSortLabel
                      active={orderBy === 'date'}
                      direction={orderBy === 'date' ? order : 'asc'}
                      onClick={() => handleRequestSort('date')}
                    >
                      Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                    <TableSortLabel
                      active={orderBy === 'time'}
                      direction={orderBy === 'time' ? order : 'asc'}
                      onClick={() => handleRequestSort('time')}
                    >
                      Time
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                    <TableSortLabel
                      active={orderBy === 'customer'}
                      direction={orderBy === 'customer' ? order : 'asc'}
                      onClick={() => handleRequestSort('customer')}
                    >
                      Customer
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                    <TableSortLabel
                      active={orderBy === 'dock_location'}
                      direction={orderBy === 'dock_location' ? order : 'asc'}
                      onClick={() => handleRequestSort('dock_location')}
                    >
                      Dock Location
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                    <TableSortLabel
                      active={orderBy === 'product'}
                      direction={orderBy === 'product' ? order : 'asc'}
                      onClick={() => handleRequestSort('product')}
                    >
                      Product
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                    <TableSortLabel
                      active={orderBy === 'tonnage'}
                      direction={orderBy === 'tonnage' ? order : 'asc'}
                      onClick={() => handleRequestSort('tonnage')}
                    >
                      Tonnage
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                    <TableSortLabel
                      active={orderBy === 'grade'}
                      direction={orderBy === 'grade' ? order : 'asc'}
                      onClick={() => handleRequestSort('grade')}
                    >
                      Grade
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>W/S</TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>Comments</TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                    <TableSortLabel
                      active={orderBy === 'status'}
                      direction={orderBy === 'status' ? order : 'asc'}
                      onClick={() => handleRequestSort('status')}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', width: 50 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedSchedules.map((schedule) => {
                  const isExpanded = expandedRows.has(schedule.id);
                  return (
                    <>
                      <TableRow
                        key={schedule.id}
                        sx={{
                          '&:hover': { bgcolor: '#f9f9f9' },
                          bgcolor: getDockTypeColor(schedule.dock_type),
                        }}
                      >
                        <TableCell>{schedule.load_number}</TableCell>
                        <TableCell>{schedule.dock_type || '-'}</TableCell>
                        <TableCell sx={{ color: schedule.status === 'TBD' ? '#e74c3c' : 'inherit' }}>
                          {schedule.vessel?.name || 'TBD'}
                        </TableCell>
                        <TableCell>
                          {schedule.date ? dayjs(schedule.date).format('ddd, MMM DD, YYYY') : '-'}
                        </TableCell>
                        <TableCell>
                          {schedule.time || '-'}
                        </TableCell>
                        <TableCell>{schedule.customer?.name || '-'}</TableCell>
                        <TableCell>{schedule.dock_location_detail || schedule.dock_location || '-'}</TableCell>
                        <TableCell sx={{ color: schedule.status === 'TBD' ? '#e74c3c' : 'inherit' }}>
                          {schedule.product?.name || 'TBD'}
                        </TableCell>
                        <TableCell align="right">
                          {schedule.tonnage ? schedule.tonnage.toLocaleString() : '-'}
                        </TableCell>
                        <TableCell>{schedule.grade || '-'}</TableCell>
                        <TableCell>{schedule.dock_type || '-'}</TableCell>
                        <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {schedule.comments || '-'}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={schedule.status || 'Active'}
                            size="small"
                            color={getStatusColor(schedule.status) as any}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => {
                              const newExpanded = new Set(expandedRows);
                              if (isExpanded) {
                                newExpanded.delete(schedule.id);
                              } else {
                                newExpanded.add(schedule.id);
                              }
                              setExpandedRows(newExpanded);
                            }}
                          >
                            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
                          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                            <Box sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                                Additional Details
                              </Typography>
                              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 2 }}>
                                {schedule.demo !== undefined && (
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">DEMO</Typography>
                                    <Typography variant="body2">{schedule.demo.toLocaleString()}</Typography>
                                  </Box>
                                )}
                                {schedule.b !== undefined && (
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">B</Typography>
                                    <Typography variant="body2">{schedule.b.toLocaleString()}</Typography>
                                  </Box>
                                )}
                                {schedule.c !== undefined && (
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">C</Typography>
                                    <Typography variant="body2">{schedule.c.toLocaleString()}</Typography>
                                  </Box>
                                )}
                                {schedule.e1 !== undefined && (
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">E1</Typography>
                                    <Typography variant="body2">{schedule.e1.toLocaleString()}</Typography>
                                  </Box>
                                )}
                                {schedule.e2 !== undefined && (
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">E2</Typography>
                                    <Typography variant="body2">{schedule.e2.toLocaleString()}</Typography>
                                  </Box>
                                )}
                                {schedule.g1 !== undefined && (
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">G1</Typography>
                                    <Typography variant="body2">{schedule.g1.toLocaleString()}</Typography>
                                  </Box>
                                )}
                                {schedule.g3 !== undefined && (
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">G3</Typography>
                                    <Typography variant="body2">{schedule.g3.toLocaleString()}</Typography>
                                  </Box>
                                )}
                                {schedule.h !== undefined && (
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">H</Typography>
                                    <Typography variant="body2">{schedule.h.toLocaleString()}</Typography>
                                  </Box>
                                )}
                                {schedule.h3 !== undefined && (
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">H3</Typography>
                                    <Typography variant="body2">{schedule.h3.toLocaleString()}</Typography>
                                  </Box>
                                )}
                                {schedule.nd_scr !== undefined && (
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">ND SCR</Typography>
                                    <Typography variant="body2">{schedule.nd_scr.toLocaleString()}</Typography>
                                  </Box>
                                )}
                                {schedule.dd_lsp !== undefined && (
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">DD LSP</Typography>
                                    <Typography variant="body2">{schedule.dd_lsp.toLocaleString()}</Typography>
                                  </Box>
                                )}
                                {schedule.g3_mod !== undefined && (
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">G3 MOD</Typography>
                                    <Typography variant="body2">{schedule.g3_mod.toLocaleString()}</Typography>
                                  </Box>
                                )}
                                {schedule.z_tbd !== undefined && (
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">Z-TBD</Typography>
                                    <Typography variant="body2">{schedule.z_tbd.toLocaleString()}</Typography>
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
                {paginatedSchedules.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={14} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">
                        {loading ? 'Loading schedules...' : 'No schedules found for the selected quarry'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={sortedSchedules.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
          />
        </Paper>
      )}
    </Box>
  );
}
