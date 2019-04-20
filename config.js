const dev = process.env.NODE_ENV !== 'production';
const SERVER_URL = dev ? 'http://localhost:3000/graphql' : 'https://blog-lunatk.herokuapp.com/graphql';
export default SERVER_URL;