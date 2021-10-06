import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { decodeServerToken } from '../utils/jwt';
import nextConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = nextConfig()
const api_url = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient, token

function createApolloClient() {
  const authLink = setContext( async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const httpLink = new HttpLink({
    uri: api_url, // Server URL (must be absolute)
  })
  
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(initialState = null, session = null) {
  if(session && !token) {
    token = decodeServerToken(session.accessToken)
  }

  const _apolloClient = createApolloClient()

  if (initialState) {
    const existingCache = _apolloClient.extract()

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    _apolloClient.cache.restore(data)
  }
  if (typeof window === 'undefined') return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const session = pageProps?.session
  const store = useMemo(() => initializeApollo(state, session), [state])
  return store
}