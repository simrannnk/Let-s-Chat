let config = { server: 'http://localhost:8000' }

if (process.env.NODE_ENV === 'production') {
  config = {
    server: 'http://localhost:8000',
  }
}

export default config
