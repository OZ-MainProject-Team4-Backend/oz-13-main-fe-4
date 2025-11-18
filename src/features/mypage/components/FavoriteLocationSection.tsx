// features/mypage/components/FavoriteLocationSection.tsx
import CancelIcon from '@mui/icons-material/Cancel';
import { Avatar, Box, Button, Card, CardHeader, Divider, Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import FavoriteRegionModal from '../../../components/Modal/FavoriteRegionModal';

export default function FavoriteLocationSection() {
  //모달상태
  const [showModal, setShowModal] = useState(false);
  return (
    <Box>
      <Divider>
        <Typography variant='h6' sx={{ width: '100%', fontSize: 'clamp(1rem, 10vw, 1.15rem)' }}>
          즐겨찾는 지역 수정
        </Typography>
      </Divider>

      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid
          spacing={2}
          container
          sx={{
            '--Grid-borderWidth': '1px',
            borderColor: 'divider',
            '& > div': {
              borderColor: 'divider',
            },
          }}
        >
          {/* 모달 */}
          <FavoriteRegionModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSave={(region) => {
              console.log('선택된 지역:', region);
            }}
          />
          {[...Array(3)].map((_, index) => (
            <Grid
              key={index}
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Card>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                      Icon
                    </Avatar>
                  }
                  sx={{ textAlign: 'left' }}
                  action={<CancelIcon aria-label='close' />}
                  title='수원시 장안구'
                  subheader='KT위즈파크'
                />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    variant='contained'
                    color='secondary'
                    type='button'
                    size='small'
                    sx={{
                      minWidth: 'fit-content',
                      whiteSpace: 'nowrap',
                    }}
                    onClick={() => setShowModal(true)}
                  >
                    수정
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
