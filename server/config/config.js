/**
 * Config var for app
**/
module.exports = {
  mongoDBUrl: 'mongodb://local:pass@ds147421.mlab.com:47421/kissmyapp',
  port: process.env.PORT || 4941,
  secret: process.env.SECRET || 'mysecret'
};
