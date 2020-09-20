import { ApolloClient, InMemoryCache } from '@apollo/client';
import { baseURL,authToken }from '../constant/Constant';

export const AjaxUtils = new ApolloClient({
    uri: baseURL + '/graphql',
    cache: new InMemoryCache(),
    headers: {
        'Authorization': `Bearer ${authToken}`
    }, 
});
