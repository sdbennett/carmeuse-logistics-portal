import { Box, Paper, Typography, Card, CardContent, Grid } from '@mui/material';
import { TrendingUp, Package, BarChart3, Calendar } from 'lucide-react';

interface WeeklyData {
  week: string;
  aggregate: number;
  chemical: number;
  total: number;
}

interface ProjectedLoad {
  week: string;
  projected: number;
}

const getWeekDateRange = (weeksAgo: number): string => {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() - (weeksAgo * 7));
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  return `${formatDate(weekStart)}-${formatDate(weekEnd)}`;
};

const weeklyTonnage: WeeklyData[] = [
  { week: getWeekDateRange(3), aggregate: 12500, chemical: 8300, total: 20800 },
  { week: getWeekDateRange(2), aggregate: 14200, chemical: 7900, total: 22100 },
  { week: getWeekDateRange(1), aggregate: 13800, chemical: 8600, total: 22400 },
  { week: getWeekDateRange(0), aggregate: 15100, chemical: 9200, total: 24300 },
];

const projectedLoads: ProjectedLoad[] = [
  { week: getWeekDateRange(-1), projected: 24800 },
  { week: getWeekDateRange(-2), projected: 25500 },
  { week: getWeekDateRange(-3), projected: 26200 },
  { week: getWeekDateRange(-4), projected: 25900 },
];

const currentWeekTotal = weeklyTonnage[weeklyTonnage.length - 1].total;
const previousWeekTotal = weeklyTonnage[weeklyTonnage.length - 2].total;
const weekOverWeekChange = ((currentWeekTotal - previousWeekTotal) / previousWeekTotal * 100).toFixed(1);

const totalAggregate = weeklyTonnage.reduce((sum, week) => sum + week.aggregate, 0);
const totalChemical = weeklyTonnage.reduce((sum, week) => sum + week.chemical, 0);
const aggregatePercentage = ((totalAggregate / (totalAggregate + totalChemical)) * 100).toFixed(1);
const chemicalPercentage = ((totalChemical / (totalAggregate + totalChemical)) * 100).toFixed(1);

const avgProjectedLoad = (projectedLoads.reduce((sum, week) => sum + week.projected, 0) / projectedLoads.length).toFixed(0);

export function MetricsDashboard() {
  const maxValue = Math.max(
    ...weeklyTonnage.map(w => Math.max(w.aggregate, w.chemical)),
    ...projectedLoads.map(p => p.projected)
  );

  return (
    <Box sx={{ py: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 } }}>
      <Typography
        variant="h5"
        sx={{
          mb: { xs: 2, sm: 3 },
          fontWeight: 700,
          color: '#212934',
        }}
      >
        Metrics Dashboard
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 2, sm: 3 } }}>
        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <Card elevation={2}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Box
                  sx={{
                    bgcolor: '#e3f2fd',
                    borderRadius: 1,
                    p: { xs: 0.5, sm: 1 },
                    mr: { xs: 1, sm: 1.5 },
                    display: 'flex',
                  }}
                >
                  <TrendingUp size={20} color="#1976d2" />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Current Week
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.25, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                {currentWeekTotal.toLocaleString()}
              </Typography>
              <Typography variant="caption" color={Number(weekOverWeekChange) >= 0 ? 'success.main' : 'error.main'} sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                {Number(weekOverWeekChange) >= 0 ? '+' : ''}{weekOverWeekChange}% vs last
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <Card elevation={2}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Box
                  sx={{
                    bgcolor: '#f3e5f5',
                    borderRadius: 1,
                    p: { xs: 0.5, sm: 1 },
                    mr: { xs: 1, sm: 1.5 },
                    display: 'flex',
                  }}
                >
                  <Package size={20} color="#7b1fa2" />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Aggregate
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.25, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                {aggregatePercentage}%
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                {totalAggregate.toLocaleString()} tons
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <Card elevation={2}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Box
                  sx={{
                    bgcolor: '#e8f5e9',
                    borderRadius: 1,
                    p: { xs: 0.5, sm: 1 },
                    mr: { xs: 1, sm: 1.5 },
                    display: 'flex',
                  }}
                >
                  <BarChart3 size={20} color="#388e3c" />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Chemical
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.25, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                {chemicalPercentage}%
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                {totalChemical.toLocaleString()} tons
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <Card elevation={2}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Box
                  sx={{
                    bgcolor: '#fff3e0',
                    borderRadius: 1,
                    p: { xs: 0.5, sm: 1 },
                    mr: { xs: 1, sm: 1.5 },
                    display: 'flex',
                  }}
                >
                  <Calendar size={20} color="#f57c00" />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Avg Projected
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.25, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                {Number(avgProjectedLoad).toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                Next 4 weeks
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" sx={{ mb: { xs: 2, sm: 3 }, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Weekly Tonnage Trends
            </Typography>
            <Box sx={{ position: 'relative', height: { xs: 300, sm: 380 } }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-around',
                  height: '100%',
                  borderBottom: 2,
                  borderLeft: 2,
                  borderColor: '#e0e0e0',
                  position: 'relative',
                }}
              >
                {weeklyTonnage.map((week, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flex: 1,
                      mx: { xs: 1, sm: 1.5 },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        width: '100%',
                        gap: { xs: 0.5, sm: 1 },
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          bgcolor: '#1976d2',
                          height: { xs: `${(week.aggregate / maxValue) * 240}px`, sm: `${(week.aggregate / maxValue) * 300}px` },
                          borderRadius: '4px 4px 0 0',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            opacity: 0.8,
                          },
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          pb: 1,
                          minHeight: 40,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'white',
                            fontWeight: 600,
                            fontSize: { xs: '0.65rem', sm: '0.75rem' },
                          }}
                        >
                          {(week.aggregate / 1000).toFixed(1)}k
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          bgcolor: '#388e3c',
                          height: { xs: `${(week.chemical / maxValue) * 240}px`, sm: `${(week.chemical / maxValue) * 300}px` },
                          borderRadius: '4px 4px 0 0',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            opacity: 0.8,
                          },
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                          pb: 1,
                          minHeight: 40,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'white',
                            fontWeight: 600,
                            fontSize: { xs: '0.65rem', sm: '0.75rem' },
                          }}
                        >
                          {(week.chemical / 1000).toFixed(1)}k
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        color: '#666',
                        mt: 0.5,
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                        textAlign: 'center',
                      }}
                    >
                      {week.week}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#999',
                        fontSize: { xs: '0.6rem', sm: '0.7rem' },
                      }}
                    >
                      {week.total.toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 16, height: 16, bgcolor: '#1976d2', borderRadius: 0.5 }} />
                <Typography variant="body2">Aggregate</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 16, height: 16, bgcolor: '#388e3c', borderRadius: 0.5 }} />
                <Typography variant="body2">Chemical</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: { xs: 2, sm: 3 }, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              4-Week Projected Loads
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {projectedLoads.map((load, index) => (
                <Box key={index}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {load.week}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#f57c00' }}>
                      {load.projected.toLocaleString()} tons
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      height: 10,
                      bgcolor: '#f5f5f5',
                      borderRadius: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: `${(load.projected / maxValue) * 100}%`,
                        height: '100%',
                        bgcolor: '#f57c00',
                        transition: 'width 0.5s ease',
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>

            <Box sx={{ mt: 3, p: 2, bgcolor: '#fff3e0', borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Capacity Insight
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Projected loads show steady upward trend. Current capacity utilization at 85% with room for growth.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}