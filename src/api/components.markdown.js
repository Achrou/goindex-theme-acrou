import request from '@/plugin/axios'

export function ComponentsMarkdownBase (url) {
  return request({
    url,
    method: 'get'
  })
}
