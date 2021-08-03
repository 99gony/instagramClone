const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const {sequelize} = require('./models');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const passportConfigure = require('./passport');
const hpp = require('hpp');
const helmet = require('helmet');

dotenv.config();

const pageRouter = require('./routers/page');
const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const postsRouter = require('./routers/posts');
const hashtagRouter = require('./routers/hashtag');

app.set('port', process.env.PORT || 8080);

sequelize.sync({ force : false})
  .then(()=>{
    console.log('데이터베이스 연결 성공')
  }).catch((err)=>{
    console.error(err)
  })

if(process.env.NODE_ENV === 'production'){
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
}else{
  app.use(morgan('dev'));
}

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use('/img', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(cors({
  origin:['http://localhost:3000', 'koelinsta.com'],
  credentials: true,
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfigure();

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/hashtag', hashtagRouter);

app.listen(app.get('port'), ()=>{
  console.log(app.get('port'),'서버 활성화 중')
})