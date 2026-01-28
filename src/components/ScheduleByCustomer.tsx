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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RefreshCw, Search, X } from 'lucide-react';
import {
  Customer,
  VesselSchedule,
  mockCustomers,
  mockVesselSchedules,
  mockVessels,
  mockQuarries,
  mockProducts,
} from '../lib/mockData';
import dayjs from 'dayjs';

type Order = 'asc' | 'desc';

export function ScheduleByCustomer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [customers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('all');
  const [schedules, setSchedules] = useState<VesselSchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState<string>('date');
  const [order, setOrder] = useState<Order>('asc');
  const [filters, setFilters] = useState({
    search: '',
  });

  useEffect(() => {
    loadSchedules();
  }, [selectedCustomer, filters]);

  const loadSchedules = () => {
    setLoading(true);

    let filteredSchedules = selectedCustomer === 'all'
      ? [...mockVesselSchedules]
      : mockVesselSchedules.filter(
          (schedule) => schedule.customer_id === selectedCustomer
        );

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredSchedules = filteredSchedules.filter((schedule) => {
        const vessel = mockVessels.find((v) => v.id === schedule.vessel_id);
        const quarry = mockQuarries.find((q) => q.id === schedule.quarry_id);
        const product = mockProducts.find((p) => p.id === schedule.product_id);

        return (
          vessel?.name.toLowerCase().includes(searchLower) ||
          quarry?.name.toLowerCase().includes(searchLower) ||
          product?.name.toLowerCase().includes(searchLower) ||
          schedule.dock_location?.toLowerCase().includes(searchLower) ||
          schedule.dock_location_detail?.toLowerCase().includes(searchLower)
        );
      });
    }

    const enrichedSchedules = filteredSchedules.map((schedule) => ({
      ...schedule,
      vessel: mockVessels.find((v) => v.id === schedule.vessel_id),
      quarry: mockQuarries.find((q) => q.id === schedule.quarry_id),
      product: mockProducts.find((p) => p.id === schedule.product_id),
      customer: mockCustomers.find((c) => c.id === schedule.customer_id),
    }));

    setSchedules(enrichedSchedules);
    setLoading(false);
  };

  const handleCustomerChange = (event: SelectChangeEvent) => {
    setSelectedCustomer(event.target.value);
  };

  const handleFilterChange = (field: keyof typeof filters) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const clearSearch = () => {
    setFilters((prev) => ({ ...prev, search: '' }));
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedSchedules = useMemo(() => {
    const sorted = [...schedules].sort((a: any, b: any) => {
      let aValue: any = a[orderBy];
      let bValue: any = b[orderBy];

      if (orderBy === 'vessel') {
        aValue = a.vessel?.name || '';
        bValue = b.vessel?.name || '';
      } else if (orderBy === 'quarry') {
        aValue = a.quarry?.name || '';
        bValue = b.quarry?.name || '';
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

  const totalTonnage = useMemo(() => {
    return sortedSchedules.reduce((sum, schedule) => sum + (schedule.tonnage || 0), 0);
  }, [sortedSchedules]);

  const selectedCustomerObj = selectedCustomer === 'all'
    ? { name: 'All Customers' }
    : customers.find((c) => c.id === selectedCustomer);

  const ScheduleCard = ({ schedule }: { schedule: any }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Quarry
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {schedule.quarry?.name || '-'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Vessel Name
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {schedule.vessel?.name || '-'}
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Loading Dock ETA
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {schedule.date ? dayjs(schedule.date).format('ddd, MMM DD, YYYY') : '-'} {schedule.time || ''}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Unload Dock ETA
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {schedule.date ? dayjs(schedule.date).format('ddd, MMM DD, YYYY') : '-'} {schedule.time || ''}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Dock Location
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {schedule.dock_location_detail || schedule.dock_location || '-'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Product
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {schedule.product?.name || '-'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Tonnage
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {schedule.tonnage ? schedule.tonnage.toLocaleString() : '-'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa' }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant={isMobile ? 'h6' : 'h5'} component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
            Vessel Load Schedule - All
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#d32f2f' }}>
            Schedule by Customer - {selectedCustomerObj?.name || 'Select Customer'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            FRI, SEP 19, 2025 @ 12:32:05 PM
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Customer Name</InputLabel>
              <Select
                value={selectedCustomer}
                label="Customer Name"
                onChange={handleCustomerChange}
              >
                <MenuItem value="all">All Customers</MenuItem>
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              size="small"
              label="Search"
              placeholder="Search by vessel, quarry, product, or dock location..."
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
          {sortedSchedules.map((schedule) => (
            <ScheduleCard key={schedule.id} schedule={schedule} />
          ))}
          {sortedSchedules.length === 0 && (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                {loading ? 'Loading schedules...' : 'No schedules found for the selected customer'}
              </Typography>
            </Paper>
          )}
        </Box>
      ) : (
        <Paper>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                    <TableSortLabel
                      active={orderBy === 'quarry'}
                      direction={orderBy === 'quarry' ? order : 'asc'}
                      onClick={() => handleRequestSort('quarry')}
                    >
                      Quarry
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>Customer Name</TableCell>
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
                      Loading Dock ETA
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
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>Unload Dock ETA</TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }}>
                    <TableSortLabel
                      active={orderBy === 'product'}
                      direction={orderBy === 'product' ? order : 'asc'}
                      onClick={() => handleRequestSort('product')}
                    >
                      Product
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5' }} align="right">
                    <TableSortLabel
                      active={orderBy === 'tonnage'}
                      direction={orderBy === 'tonnage' ? order : 'asc'}
                      onClick={() => handleRequestSort('tonnage')}
                    >
                      Tonnage
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedSchedules.map((schedule) => (
                  <TableRow
                    key={schedule.id}
                    sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}
                  >
                    <TableCell>{schedule.quarry?.name || '-'}</TableCell>
                    <TableCell>{schedule.customer?.name || '-'}</TableCell>
                    <TableCell>{schedule.vessel?.name || '-'}</TableCell>
                    <TableCell>
                      {schedule.date ? dayjs(schedule.date).format('ddd, MMM DD, YYYY HH:mm') : '-'}
                    </TableCell>
                    <TableCell>{schedule.dock_location_detail || schedule.dock_location || '-'}</TableCell>
                    <TableCell>
                      {schedule.date ? dayjs(schedule.date).format('ddd, MMM DD, YYYY HH:mm') : '-'}
                    </TableCell>
                    <TableCell>{schedule.product?.name || '-'}</TableCell>
                    <TableCell align="right">
                      {schedule.tonnage ? schedule.tonnage.toLocaleString() : '0'}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell colSpan={7} sx={{ fontWeight: 600 }}>
                    TOTAL TONNAGE:
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    {totalTonnage.toLocaleString()}
                  </TableCell>
                </TableRow>
                {sortedSchedules.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">
                        {loading ? 'Loading schedules...' : 'No schedules found for the selected customer'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}
