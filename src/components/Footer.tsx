import { Box, Container, Typography, Link } from '@mui/material';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#2c3845',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: 4,
            mb: 4,
          }}
        >
          <Box>
            <img
              src="/carmeuse-logo-white.svg"
              alt="Carmeuse"
              style={{ height: '40px', width: 'auto', marginBottom: '24px' }}
            />
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '1rem' }}>
              Applications by Markets
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '1rem' }}>
              Products & Services
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '1rem' }}>
              Sustainability
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
              Work for Carmeuse
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '1rem' }}>
              Carmeuse Foundation
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, opacity: 0.9 }}>
              Carmeuse is committed to providing financial and volunteering support to agencies whose primary
              emphasis is helping underprivileged children in need with educational, training and mentoring
              opportunities.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '1rem' }}>
              Compliance Concerns
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6, opacity: 0.9 }}>
              If you have a compliance concern (we'll keep it confidential).
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '1rem' }}>
              Supplier
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            pt: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.875rem' }}>
            © 2025. ALL RIGHTS RESERVED.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Link
              href="#"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'white',
                },
              }}
            >
              TERMS AND CONDITIONS
            </Link>
            <Link
              href="#"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'white',
                },
              }}
            >
              PRIVACY POLICY
            </Link>
            <Link
              href="#"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'white',
                },
              }}
            >
              COOKIE POLICY
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
