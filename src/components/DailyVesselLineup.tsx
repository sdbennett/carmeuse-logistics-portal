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
  Typography,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
} from '@mui/material';
import {
  DailyVesselLineup as VesselLineup,
  mockDailyVesselLineups,
  mockVessels,
} from '../lib/mockData';

type Order = 'asc' | 'desc';

export function DailyVesselLineup() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [lineups] = useState<VesselLineup[]>(mockDailyVesselLineups);
  const [orderBy, setOrderBy] = useState<keyof VesselLineup>('date_time');
  const [order, setOrder] = useState<Order>('asc');

  const enrichedLineups = lineups.map((lineup) => ({
    ...lineup,
    vessel: mockVessels.find((v) => v.id === lineup.vessel_id),
  }));

  const handleRequestSort = (property: keyof VesselLineup) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedLineups = useMemo(() => {
    const sorted = [...enrichedLineups].sort((a: any, b: any) => {
      let aValue: any = a[orderBy];
      let bValue: any = b[orderBy];

      if (orderBy === 'vessel_id') {
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
  }, [enrichedLineups, order, orderBy]);

  const groupedByQuarry = useMemo(() => {
    const groups: { [key: string]: typeof enrichedLineups } = {};
    sortedLineups.forEach((lineup) => {
      const quarry = lineup.quarry || 'Unknown';
      if (!groups[quarry]) {
        groups[quarry] = [];
      }
      groups[quarry].push(lineup);
    });
    return groups;
  }, [sortedLineups]);

  const LineupCard = ({ lineup }: { lineup: typeof enrichedLineups[0] }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Quarry
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {lineup.quarry || '-'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Vessel Name
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {lineup.vessel?.name || '-'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Date & Time
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {lineup.date_time || '-'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Customer
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {lineup.customer || '-'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Box>
            <Typography variant={isMobile ? 'h6' : 'h5'} component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
              Daily Vessel Schedule
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Carmeuse Lime & Stone
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#d32f2f' }}>
            FRI, SEP 19, 2025 @ 11:30:41 AM
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
            gap: 2,
            pt: 2,
            borderTop: 1,
            borderColor: 'divider'
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#d32f2f', mb: 0.5 }}>
              On Call: Matt Selling
            </Typography>
            <Typography variant="body2" color="text.secondary">
              CELL: 906-450-5590
            </Typography>
            <Typography variant="body2" color="text.secondary">
              OFFICE: 906-283-2257
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#d32f2f' }}>
              24 HOUR On Call: 906-450-5590
            </Typography>
          </Box>
        </Box>
      </Paper>

      {isMobile ? (
        <Box>
          {sortedLineups.map((lineup) => (
            <LineupCard key={lineup.id} lineup={lineup} />
          ))}
          {sortedLineups.length === 0 && (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                No vessel lineups found
              </Typography>
            </Paper>
          )}
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 80 }}>
                  QD
                </TableCell>
                <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 120 }}>
                  <TableSortLabel
                    active={orderBy === 'quarry'}
                    direction={orderBy === 'quarry' ? order : 'asc'}
                    onClick={() => handleRequestSort('quarry')}
                  >
                    Calcite
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 120 }}>
                  <TableSortLabel
                    active={orderBy === 'quarry'}
                    direction={orderBy === 'quarry' ? order : 'asc'}
                    onClick={() => handleRequestSort('quarry')}
                  >
                    Drummond
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 120 }}>
                  <TableSortLabel
                    active={orderBy === 'quarry'}
                    direction={orderBy === 'quarry' ? order : 'asc'}
                    onClick={() => handleRequestSort('quarry')}
                  >
                    Port Inland
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, bgcolor: '#f5f5f5', minWidth: 120 }}>
                  <TableSortLabel
                    active={orderBy === 'quarry'}
                    direction={orderBy === 'quarry' ? order : 'asc'}
                    onClick={() => handleRequestSort('quarry')}
                  >
                    Cedarville
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(groupedByQuarry).length > 0 ? (
                (() => {
                  const maxRows = Math.max(
                    ...Object.values(groupedByQuarry).map((items) => items.length)
                  );
                  return Array.from({ length: maxRows }, (_, rowIndex) => (
                    <TableRow key={rowIndex} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                      <TableCell sx={{ fontAlign: 'center', fontWeight: 600 }}>
                        {rowIndex === 0 ? 'N' : rowIndex === 1 ? 'N' : 'S'}
                      </TableCell>
                      {['Calcite', 'Drummond', 'Port Inland', 'Cedarville'].map((quarry) => {
                        const lineup = groupedByQuarry[quarry]?.[rowIndex];
                        return (
                          <TableCell
                            key={quarry}
                            sx={{
                              bgcolor: lineup?.customer === 'Maintenance' ? '#ffeb3b' : 'inherit',
                              color:
                                lineup?.customer === 'Maintenance' ||
                                lineup?.customer?.includes('TBD')
                                  ? '#e74c3c'
                                  : 'inherit',
                            }}
                          >
                            {lineup ? (
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {lineup.vessel?.name || '-'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {lineup.date_time || '-'}
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block' }}>
                                  {lineup.customer || '-'}
                                </Typography>
                              </Box>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ));
                })()
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No vessel lineups found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
