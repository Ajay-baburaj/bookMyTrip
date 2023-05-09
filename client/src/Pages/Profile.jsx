import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Grid
} from "@mui/material";
import Navbar from '../components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import { Phone } from '@mui/icons-material';
import BookedHotel from '../components/BookedHotel'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { getUserWiseBookingUrl } from '../utils/APIRoutes'
import axios from 'axios'
import User from '../components/User';

function Profile() {

  const [value, setValue] = React.useState('1');
  const user = useSelector(state => state?.user?.user)
  const [BookingData, setBookingData] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    getBookingDetails();
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getBookingDetails = async () => {
    const data = await axios.get(`${getUserWiseBookingUrl}/${user._id}`)
    setBookingData(data?.data)
    dispatch({
      type: "BOOKED_DETAILS",
      payload: data?.data
    })
  }

  console.log(BookingData)

  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <Container maxWidth={"lg"}>

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Profile" value="1" />
                <Tab label="Bookings" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: 1, maxWidth: '30rem', padding: '3%', marginTop: '1rem' }}>
                <Box
                  sx={{
                    marginTop: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: "0 14px",
                  }}
                >
                  <img
                    style={{
                      borderRadius: "100%",
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                    }}
                    src={'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-850.jpg?w=740&t=st=1682795701~exp=1682796301~hmac=c211147536693a7dd724ed38bdcf54a1501e7f9668081df8e00c52595460a9d5'}
                    alt={user?.username}
                  />
                  <Typography variant={"h6"}>{user?.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <EmailIcon sx={{ fontSize: 24, color: 'primary' }} />
                  <Typography variant={"h8"}>{user?.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <Phone />
                  <Typography variant={"h8"}>{user?.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                  <Phone />
                  <Typography variant={"h8"}>{`wallet : ${user?.wallet}`}</Typography>
                </Box>
              </Box>
              {/* <User/> */}
            </TabPanel>
            <TabPanel value="2">
              <Box sx={{ marginTop: '1rem', marginBottom: '2rem' }}>
                <Typography fontWeight={"bold"} variant={"h6"}>
                  Booking History
                </Typography>
              </Box>

              {
                BookingData ? (
                  BookingData.map((booking, index) => {
                    return <>
                      <Grid container spacing={2} >
                        <Grid item xs={12} sm={6} md={4} lg={6} sx={{ marginLeft: { lg: '5.5rem', md: '5.5rem' } }}>
                          <BookedHotel data={booking} />
                        </Grid>
                      </Grid>
                    </>
                  })
                ) : <h1>No bookings</h1>
              }
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  )
}

export default Profile