import axios from 'axios'
import invariant from 'tiny-invariant'

invariant(
  process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  'NEXT_PUBLIC_REST_API_ENDPOINT is not defined, please define it in your .env file',
)

async function request(
  method: 'get' | 'post' | 'put' | 'delete',
  path: string,
  data?: unknown,
  token?: string,
) {
  const config = token
    ? {
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      }
    : {}

  try {
    console.log(
      'Request URL:',
      process.env.NEXT_PUBLIC_REST_API_ENDPOINT + path,
    )
    const response = await axios({
      method,
      url: process.env.NEXT_PUBLIC_REST_API_ENDPOINT + path,
      data,
      ...config,
    })
    console.log('Response Data:', response.data)
    return response.data
  } catch (error) {
    console.error('Request Error:', error)
    throw error
  }
}

export async function get(path: string, token?: string) {
  return request('get', path, undefined, token)
}

export async function post(path: string, data: unknown, token?: string) {
  return request('post', path, data, token)
}

export async function put(path: string, data: unknown, token?: string) {
  return request('put', path, data, token)
}

export async function del(path: string, data: unknown, token?: string) {
  return request('delete', path, data, token)
}
