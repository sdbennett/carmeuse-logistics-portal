import { Card, CardContent, Box, Typography, Chip } from '@mui/material';
import dayjs from 'dayjs';
import { VesselSchedule } from '../lib/mockData';

interface ScheduleCardProps {
  schedule: VesselSchedule & {
    vessel?: { name: string };
    carrier?: { name: string };
    customer?: { name: string };
    product?: { name: string; code?: string };
  };
}

export function ScheduleCard({ schedule }: ScheduleCardProps) {
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
    <Card
      sx={{
        mb: 2,
        bgcolor: getDockTypeColor(schedule.dock_type),
        borderLeft: 4,
        borderColor: schedule.status === 'TBD' ? '#e74c3c' : 'primary.main',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Load #{schedule.load_number}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {schedule.date ? dayjs(schedule.date).format('ddd, MMM DD, YYYY') : '-'}
              {schedule.time && ` at ${schedule.time}`}
            </Typography>
          </Box>
          <Chip
            label={schedule.status || 'Active'}
            size="small"
            color={getStatusColor(schedule.status) as any}
          />
        </Box>

        <Box sx={{ display: 'grid', gap: 1.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Vessel
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: schedule.status === 'TBD' ? '#e74c3c' : 'inherit'
              }}
            >
              {schedule.vessel?.name || 'TBD'}
            </Typography>
          </Box>

          {schedule.carrier?.name && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Carrier
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {schedule.carrier.name}
              </Typography>
            </Box>
          )}

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Customer
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {schedule.customer?.name || '-'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Dock Location
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {schedule.dock_location_detail || schedule.dock_location || '-'}
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Product
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: schedule.status === 'TBD' ? '#e74c3c' : 'inherit'
                }}
              >
                {schedule.product?.name || 'TBD'}
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

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Grade
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {schedule.grade || '-'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Dock Type
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {schedule.dock_type || '-'}
              </Typography>
            </Box>
          </Box>

          {schedule.comments && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Comments
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                {schedule.comments}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
