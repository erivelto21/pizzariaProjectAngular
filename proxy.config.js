const proxy = [
    {
      context: '/api',
      target: 'http://localhost:8080/pizzaria',
      secure: false,
      pathRewrite: {'^/api' : ''}
    }
  ];

  module.exports = proxy;