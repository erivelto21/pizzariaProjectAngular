const proxy = [
    {
      context: '/api',
      target: 'http://localhost:9090/',
      secure: false,
      pathRewrite: {'^/api' : ''}
    }
  ];

  module.exports = proxy;