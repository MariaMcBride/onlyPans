/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '@mui-treasury/components/flex';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MainCarouselContainer from './MainCarouselContainer';
import ViewOneCarousel from './ViewOneCarousel';
import BreakfastCarousel from './BreakfastCarousel';
import LunchCarousel from './LunchCarousel';
import DinnerCarousel from './DinnerCarousel';
import QuickiesCarousel from './QuickiesCarousel';
import FancyCarousel from './FancyCarousel';
import SweetsCarousel from './SweetsCarousel';
import axios from 'axios';

export default ({ pageComponent, user,setLogout}) => {
  const logo = require('../static/images/bloglogo.png');

  const linkStyle = {
    fontFamily: 'Open Sans',
    fontWeight: 'normal',
    color: '#000',
  }
  const logout = () => {
    axios.get('http://localhost:8000/api/logout', { withCredentials: true })
      .then(res => {
        setLogout(res)
      });
  };
  const searchStyle = {
    width: '550px',
    height: '55px',
    borderColor: '#000',
    marginTop: '-330px',
    bgcolor: '#fff',
  }
  console.log(user)
  return (
    <div className='container-header'>
      <div className='header-links
      d-flex align-items-center justify-content-between mx-5'>
        <div className="blog-links">
          <Button component={Link} to={`/dashboard/${user._id}`}
            sx={linkStyle}
          >Home</Button>
        </div>
        <div className="blog-logout">
          <Button onClick={logout}
            sx={linkStyle}
          >Log out</Button>
        </div>
      </div>
      <div className='carousel-header'>
        {
          pageComponent === 'viewallrecipes' ?
            <MainCarouselContainer /> :
            pageComponent === 'viewonerecipe' ?
              <ViewOneCarousel /> :
              pageComponent === 'breakfastrecipes' ?
                <BreakfastCarousel /> :
                pageComponent === 'lunchrecipes' ?
                  <LunchCarousel /> :
                  pageComponent === 'dinnerrecipes' ?
                    <DinnerCarousel /> :
                    pageComponent === 'quickrecipes' ?
                      <QuickiesCarousel /> :
                      pageComponent === 'wineanddine' ?
                        <FancyCarousel /> :
                        pageComponent === 'bakedgoods' ?
                          <SweetsCarousel /> :
                          <></>
        }
        <div>
          <div className="carousel blog-logo d-flex justify-content-center">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: 'transparent',
                marginTop: '-360px',
                width: '400px',
                height: '85px',
                // width: '500px'
              }}
            >
              <Item sx={{
                boxSizing: 'content-box !important',
                border: '5px solid #000',
                bgcolor: '#fff',
              }}>
                <img src={logo} alt="logo"
                  style={{
                    height: 80,
                    width: 'auto',
                    padding: '10px 20px 18px',
                  }}
                />
              </Item>
            </div>
          </div>
          <div className="searchfield d-flex justify-content-center">
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Search"
              sx={searchStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

