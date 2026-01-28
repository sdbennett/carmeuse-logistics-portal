import { ReactNode, useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Chip,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  currentView: 'schedule' | 'delay-report' | 'vessel-lineup' | 'schedule-customer' | 'metrics';
  onViewChange: (view: 'schedule' | 'delay-report' | 'vessel-lineup' | 'schedule-customer' | 'metrics') => void;
}

export function Layout({ children, currentView, onViewChange }: LayoutProps) {
  const { userProfile, signOut } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (view: 'schedule' | 'delay-report' | 'vessel-lineup' | 'schedule-customer' | 'metrics') => {
    onViewChange(view);
    handleClose();
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'operations_aggregate':
        return 'Operations - Aggregate Sales';
      case 'operations_chemical':
        return 'Operations - Chemical Sales';
      case 'carrier':
        return 'Carrier';
      case 'customer':
        return 'Customer';
      default:
        return role;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: '#212934',
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/carmeuse-logo-white.svg"
              alt="Carmeuse"
              style={{ height: '40px', width: 'auto' }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && (
            <>
              <Button
                color="inherit"
                onClick={() => onViewChange('metrics')}
                sx={{
                  mr: 2,
                  px: 2,
                  bgcolor: currentView === 'metrics' ? 'rgba(255,255,255,0.1)' : 'transparent',
                }}
              >
                Metrics
              </Button>
              <Button
                color="inherit"
                onClick={handleClick}
                endIcon={<ChevronDown size={18} />}
                sx={{
                  mr: 2,
                  px: 2,
                }}
              >
                Reports
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem
                  onClick={() => handleNavigation('schedule')}
                  selected={currentView === 'schedule'}
                >
                  Schedule By Quarry
                </MenuItem>
                <MenuItem
                  onClick={() => handleNavigation('delay-report')}
                  selected={currentView === 'delay-report'}
                >
                  Customer Delay Report
                </MenuItem>
                <MenuItem
                  onClick={() => handleNavigation('vessel-lineup')}
                  selected={currentView === 'vessel-lineup'}
                >
                  Daily Vessel Lineup
                </MenuItem>
                <MenuItem
                  onClick={() => handleNavigation('schedule-customer')}
                  selected={currentView === 'schedule-customer'}
                >
                  Schedule By Customer
                </MenuItem>
              </Menu>
            </>
          )}

          {userProfile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {userProfile.full_name}
                </Typography>
                <Chip
                  label={getRoleLabel(userProfile.role)}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontSize: '0.7rem',
                    height: 20,
                  }}
                />
              </Box>
              <IconButton color="inherit" onClick={signOut} title="Sign Out">
                <LogOut size={20} />
              </IconButton>
            </Box>
          )}
        </Toolbar>

        {isMobile && (
          <Box sx={{ display: 'flex', borderTop: 1, borderColor: 'rgba(255,255,255,0.1)', overflowX: 'auto' }}>
            <Button
              color="inherit"
              onClick={() => onViewChange('metrics')}
              fullWidth
              sx={{
                borderBottom: currentView === 'metrics' ? 2 : 0,
                borderRadius: 0,
                borderColor: 'white',
                py: 1.5,
                fontSize: '0.75rem',
              }}
            >
              Metrics
            </Button>
            <Button
              color="inherit"
              onClick={() => onViewChange('schedule')}
              fullWidth
              sx={{
                borderBottom: currentView === 'schedule' ? 2 : 0,
                borderRadius: 0,
                borderColor: 'white',
                py: 1.5,
                fontSize: '0.75rem',
              }}
            >
              Schedule
            </Button>
            <Button
              color="inherit"
              onClick={() => onViewChange('delay-report')}
              fullWidth
              sx={{
                borderBottom: currentView === 'delay-report' ? 2 : 0,
                borderRadius: 0,
                borderColor: 'white',
                py: 1.5,
                fontSize: '0.75rem',
              }}
            >
              Delay Report
            </Button>
            <Button
              color="inherit"
              onClick={() => onViewChange('vessel-lineup')}
              fullWidth
              sx={{
                borderBottom: currentView === 'vessel-lineup' ? 2 : 0,
                borderRadius: 0,
                borderColor: 'white',
                py: 1.5,
                fontSize: '0.7rem',
              }}
            >
              Vessel Lineup
            </Button>
            <Button
              color="inherit"
              onClick={() => onViewChange('schedule-customer')}
              fullWidth
              sx={{
                borderBottom: currentView === 'schedule-customer' ? 2 : 0,
                borderRadius: 0,
                borderColor: 'white',
                py: 1.5,
                fontSize: '0.7rem',
              }}
            >
              By Customer
            </Button>
          </Box>
        )}
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f5f7fa',
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
