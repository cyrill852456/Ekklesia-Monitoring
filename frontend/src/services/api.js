const baseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/+$/, '')

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export async function apiRequest(path, { body, headers, ...options } = {}) {
  const response = await fetch(`${baseUrl}/${path.replace(/^\/+/, '')}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })

  const text = await response.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      throw new ApiError('The API returned an invalid JSON response.', response.status, null)
    }
  }

  if (!response.ok) {
    throw new ApiError(
      data?.message || `API request failed (${response.status}).`,
      response.status,
      data,
    )
  }

  return data
}

export function getApiHealth(options) {
  return apiRequest('/health', options)
}
