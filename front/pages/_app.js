import React from 'react';
import 'antd/dist/antd.css';
import Head from 'next/head';
import PropTypes from 'prop-types';
import {createGlobalStyle} from 'styled-components';
import wrapper from '../store';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale';
import dayjs from 'dayjs';

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '몇초',
    m: '1분',
    mm: '%d분',
    h: '1시간',
    hh: '%d시간',
    d: '1일',
    dd: '%d일',
    M: '1달',
    MM: '%d달',
    y: '1년',
    yy: '%d년'
  }
})

const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: content-box;
  }
  body{
    background-color: #FAFAFA; 
  }
`;

const App = ({Component}) => {

  return(
    <>
      <GlobalStyle/>
      <Head>
        <title>Instagram</title>
      </Head>
      <Component/>
    </>
  )
}

App.propTypes = {
  Component : PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(App);