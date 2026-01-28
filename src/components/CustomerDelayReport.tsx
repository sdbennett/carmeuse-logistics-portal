import { useState, useMemo } from 'react';
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
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  TablePagination,
} from '@mui/material';
import { Search, X } from 'lucide-react';
import {
  CustomerDelayReport as DelayReport,
  mockCustomerDelayReports,
  mockCustomers,
  mockVessels,
} from '../lib/mockData';

type Order = 'asc' | 'desc';

export function CustomerDelayReport() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [reports] = useState<DelayReport[]>(mockCustomerDelayReports);
  const [orderBy, setOrderBy] = useState<keyof DelayReport>('bol');
  const [order, setOrder] = useState<Order>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const enrichedReports = reports.map((report) => ({
    ...report,
    customer: mockCustomers.find((c) => c.id === report.customer_id),
    vessel: mockVessels.find((v) => v.id === report.vessel_id),
  }));

  const handleRequestSort = (property: keyof DelayReport) => {
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

  const clearSearch = () => {
    setSearchQuery('');
  };

  const filteredAndSortedReports = useMemo(() => {
    let filtered = enrichedReports;

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter((report) => {
        return (
          report.bol.toLowerCase().includes(searchLower) ||
          report.customer?.name.toLowerCase().includes(searchLower) ||
          report.vessel?.name.toLowerCase().includes(searchLower) ||
          report.arrival?.toLowerCase().includes(searchLower) ||
          report.vessel_ready?.toLowerCase().includes(searchLower) ||
          report.finished_loading?.toLowerCase().includes(searchLower)
        );
      });
    }

    const sorted = [...filtered].sort((a, b) => {
      let aValue: any = a[orderBy];
      let bValue: any = b[orderBy];

      if (orderBy === 'customer_id') {
        aValue = a.customer?.name || '';
        bValue = b.customer?.name || '';
      } else if (orderBy === 'vessel_id') {
        aValue = a.vessel?.name || '';
        bValue = b.vessel?.name || '';
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
  }, [enrichedReports, searchQuery, order, orderBy]);

  const paginatedReports = useMemo(() => {
    return filteredAndSortedReports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredAndSortedReports, page, rowsPerPage]);

  const DelayCard = ({ report }: { report: typeof enrichedReports[0] }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              BOL: {report.bol}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {report.customer?.name || '-'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Vessel Name
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {report.vessel?.name || '-'}
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Tonnage
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {report.tonnage?.toLocaleString() || '-'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Arrival
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {report.arrival || '-'}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Vessel Ready
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {report.vessel_ready || '-'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Finished Loading
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {report.finished_loading || '-'}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              Delays (Minutes)
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
              <Typography variant="body2">Shift: {report.shift_delay}</Typography>
              <Typography variant="body2">Vessel: {report.vessel_delay}</Typography>
              <Typography variant="body2">Dock: {report.dock_delay}</Typography>
              <Typography variant="body2">Weather: {report.weather_delay}</Typography>
              <Typography variant="body2">Traffic: {report.traffic_delay}</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant={isMobile ? 'h6' : 'h5'} component="h1" sx={{ fontWeight: 600, mb: 2 }}>
          Customer Delay Report
        </Typography>
        <TextField
          fullWidth
          size="small"
          label="Search"
          placeholder="Search by BOL, customer, vessel, or dates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search size={20} style={{ marginRight: 8, color: '#666' }} />,
            endAdornment: searchQuery && (
              <Box
                component="button"
                onClick={clearSearch}
                sx={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0,
                }}
              >
                <X size={16} />
              </Box>
            ),
          }}
        />
      </Box>

      {isMobile ? (
        <Box>
          {paginatedReports.map((report) => (
            <DelayCard key={report.id} report={report} />
          ))}
          {paginatedReports.length === 0 && (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                No delay reports found
              </Typography>
            </Paper>
          )}
          <TablePagination
            component="div"
            count={filteredAndSortedReports.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
          />
        </Box>
      ) : (
        <Paper>
          <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 120 }}>
                    <TableSortLabel
                      active={orderBy === 'bol'}
                      direction={orderBy === 'bol' ? order : 'asc'}
                      onClick={() => handleRequestSort('bol')}
                    >
                      BOL#
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 180 }}>
                    <TableSortLabel
                      active={orderBy === 'customer_id'}
                      direction={orderBy === 'customer_id' ? order : 'asc'}
                      onClick={() => handleRequestSort('customer_id')}
                    >
                      Customer
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 150 }}>
                    <TableSortLabel
                      active={orderBy === 'vessel_id'}
                      direction={orderBy === 'vessel_id' ? order : 'asc'}
                      onClick={() => handleRequestSort('vessel_id')}
                    >
                      Vessel Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 100 }} align="right">
                    <TableSortLabel
                      active={orderBy === 'tonnage'}
                      direction={orderBy === 'tonnage' ? order : 'asc'}
                      onClick={() => handleRequestSort('tonnage')}
                    >
                      Tonnage
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 100 }} align="center">
                    <TableSortLabel
                      active={orderBy === 'draft_fwd'}
                      direction={orderBy === 'draft_fwd' ? order : 'asc'}
                      onClick={() => handleRequestSort('draft_fwd')}
                    >
                      Draft Fwd
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 100 }} align="center">
                    <TableSortLabel
                      active={orderBy === 'draft_aft'}
                      direction={orderBy === 'draft_aft' ? order : 'asc'}
                      onClick={() => handleRequestSort('draft_aft')}
                    >
                      Draft Aft
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 120 }} align="center">
                    <TableSortLabel
                      active={orderBy === 'water_gauge'}
                      direction={orderBy === 'water_gauge' ? order : 'asc'}
                      onClick={() => handleRequestSort('water_gauge')}
                    >
                      Water Gauge
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 100 }} align="center">
                    <TableSortLabel
                      active={orderBy === 'arrival'}
                      direction={orderBy === 'arrival' ? order : 'asc'}
                      onClick={() => handleRequestSort('arrival')}
                    >
                      Arrival
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 120 }} align="center">
                    <TableSortLabel
                      active={orderBy === 'vessel_ready'}
                      direction={orderBy === 'vessel_ready' ? order : 'asc'}
                      onClick={() => handleRequestSort('vessel_ready')}
                    >
                      Vessel Ready
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 140 }} align="center">
                    <TableSortLabel
                      active={orderBy === 'finished_loading'}
                      direction={orderBy === 'finished_loading' ? order : 'asc'}
                      onClick={() => handleRequestSort('finished_loading')}
                    >
                      Finished Loading
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#e3f2fd', minWidth: 80 }} align="center">
                    <TableSortLabel
                      active={orderBy === 'shift_delay'}
                      direction={orderBy === 'shift_delay' ? order : 'asc'}
                      onClick={() => handleRequestSort('shift_delay')}
                    >
                      Shift
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#e3f2fd', minWidth: 80 }} align="center">
                    <TableSortLabel
                      active={orderBy === 'vessel_delay'}
                      direction={orderBy === 'vessel_delay' ? order : 'asc'}
                      onClick={() => handleRequestSort('vessel_delay')}
                    >
                      Vessel
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#e3f2fd', minWidth: 80 }} align="center">
                    <TableSortLabel
                      active={orderBy === 'dock_delay'}
                      direction={orderBy === 'dock_delay' ? order : 'asc'}
                      onClick={() => handleRequestSort('dock_delay')}
                    >
                      Dock
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#e3f2fd', minWidth: 90 }} align="center">
                    <TableSortLabel
                      active={orderBy === 'weather_delay'}
                      direction={orderBy === 'weather_delay' ? order : 'asc'}
                      onClick={() => handleRequestSort('weather_delay')}
                    >
                      Weather
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#e3f2fd', minWidth: 80 }} align="center">
                    <TableSortLabel
                      active={orderBy === 'traffic_delay'}
                      direction={orderBy === 'traffic_delay' ? order : 'asc'}
                      onClick={() => handleRequestSort('traffic_delay')}
                    >
                      Traffic
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, bgcolor: '#fff3e0', minWidth: 120 }} align="center">
                    <TableSortLabel
                      active={orderBy === 'calculated_ton_hour'}
                      direction={orderBy === 'calculated_ton_hour' ? order : 'asc'}
                      onClick={() => handleRequestSort('calculated_ton_hour')}
                    >
                      Calculated Ton/Hour
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedReports.map((report) => (
                <TableRow
                  key={report.id}
                  sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}
                >
                  <TableCell>{report.bol}</TableCell>
                  <TableCell>{report.customer?.name || '-'}</TableCell>
                  <TableCell>{report.vessel?.name || '-'}</TableCell>
                  <TableCell align="right">{report.tonnage?.toLocaleString() || '-'}</TableCell>
                  <TableCell align="center">{report.draft_fwd || '-'}</TableCell>
                  <TableCell align="center">{report.draft_aft || '-'}</TableCell>
                  <TableCell align="center">{report.water_gauge || '-'}</TableCell>
                  <TableCell align="center">{report.arrival || '-'}</TableCell>
                  <TableCell align="center">{report.vessel_ready || '-'}</TableCell>
                  <TableCell align="center">{report.finished_loading || '-'}</TableCell>
                  <TableCell align="center" sx={{ bgcolor: '#e3f2fd' }}>{report.shift_delay}</TableCell>
                  <TableCell align="center" sx={{ bgcolor: '#e3f2fd' }}>{report.vessel_delay}</TableCell>
                  <TableCell align="center" sx={{ bgcolor: '#e3f2fd' }}>{report.dock_delay}</TableCell>
                  <TableCell align="center" sx={{ bgcolor: '#e3f2fd' }}>{report.weather_delay}</TableCell>
                  <TableCell align="center" sx={{ bgcolor: '#e3f2fd' }}>{report.traffic_delay}</TableCell>
                  <TableCell align="center" sx={{ bgcolor: '#fff3e0' }}>{report.calculated_ton_hour}</TableCell>
                </TableRow>
              ))}
              {paginatedReports.length === 0 && (
                <TableRow>
                  <TableCell colSpan={16} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No delay reports found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredAndSortedReports.length}
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
