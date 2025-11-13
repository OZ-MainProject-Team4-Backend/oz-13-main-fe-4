import {
  CssBaseline,
  FormControl,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import AppTheme from '../styles/AppTheme';
import { CardMui, ContainerMui } from '../styles/AuthStyle';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function Mypage() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      {/* <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} /> */}
      <ContainerMui direction='column' justifyContent='space-between'>
        <CardMui sx={{ border: 'solid' }}>
          <Grid container spacing={3}>
            <Typography
              component='h1'
              variant='h4'
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', mb: 5 }}
            >
              마이페이지
            </Typography>
            <FormGrid size={{ xs: 12, sm: 3 }}>
              <FormLabel htmlFor='name'>이름</FormLabel>
              <OutlinedInput
                id='name'
                name='name'
                type='name'
                placeholder='홍길동'
                autoComplete='name'
                size='small'
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, sm: 3 }}>
              <FormLabel htmlFor='nickname'>닉네임</FormLabel>
              <OutlinedInput
                id='nickname'
                name='nickname'
                type='name'
                placeholder='닉네임'
                autoComplete='name'
                size='small'
              />
            </FormGrid>
            <FormGrid size={{ xs: 12, sm: 3 }}>
              <FormControl>
                <FormLabel id='demo-row-radio-buttons-group-label'>성별</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                >
                  <FormControlLabel value='F' control={<Radio />} label='여자' />
                  <FormControlLabel value='M' control={<Radio />} label='남자' />
                </RadioGroup>
              </FormControl>
            </FormGrid>
            <FormGrid size={{ xs: 12, sm: 3 }}>
              <FormControl>
                <FormLabel htmlFor='named-select'>연령대</FormLabel>
                <Select id='named-select'>
                  <MenuItem value={'ten'}>10대</MenuItem>
                  <MenuItem value={'twenty'}>20대</MenuItem>
                  <MenuItem value={'thirty'}>30대</MenuItem>
                  <MenuItem value={'fourthy'}>40대</MenuItem>
                  <MenuItem value={'fifth'}>50대</MenuItem>
                  <MenuItem value={'sixth'}>60대</MenuItem>
                </Select>
              </FormControl>
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
              <FormLabel htmlFor='address1' required>
                Address line 1
              </FormLabel>
              <OutlinedInput
                id='address1'
                name='address1'
                type='address1'
                placeholder='Street name and number'
                autoComplete='shipping address-line1'
                required
                size='small'
              />
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
              <FormLabel htmlFor='address2'>Address line 2</FormLabel>
              <OutlinedInput
                id='address2'
                name='address2'
                type='address2'
                placeholder='Apartment, suite, unit, etc. (optional)'
                autoComplete='shipping address-line2'
                required
                size='small'
              />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
              <FormLabel htmlFor='city' required>
                City
              </FormLabel>
              <OutlinedInput
                id='city'
                name='city'
                type='city'
                placeholder='New York'
                autoComplete='City'
                required
                size='small'
              />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
              <FormLabel htmlFor='state' required>
                State
              </FormLabel>
              <OutlinedInput
                id='state'
                name='state'
                type='state'
                placeholder='NY'
                autoComplete='State'
                required
                size='small'
              />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
              <FormLabel htmlFor='zip' required>
                Zip / Postal code
              </FormLabel>
              <OutlinedInput
                id='zip'
                name='zip'
                type='zip'
                placeholder='12345'
                autoComplete='shipping postal-code'
                required
                size='small'
              />
            </FormGrid>
            <FormGrid size={{ xs: 6 }}>
              <FormLabel htmlFor='country' required>
                Country
              </FormLabel>
              <OutlinedInput
                id='country'
                name='country'
                type='country'
                placeholder='United States'
                autoComplete='shipping country'
                required
                size='small'
              />
            </FormGrid>
            <FormGrid size={{ xs: 12 }}>
              <FormControlLabel
                control={<Checkbox name='saveAddress' value='yes' />}
                label='Use this address for payment details'
              />
            </FormGrid>
          </Grid>
        </CardMui>
      </ContainerMui>
    </AppTheme>
  );
}
