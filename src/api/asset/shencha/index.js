import fetch from 'utils/fetch';



export function reqShenChaInfo(serialNumber) {
  return fetch({
    url: '/api/asset/asset/shencha',
    method: 'post',
    data: serialNumber
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/asset/error',
    method: 'post',
    data: obj
  });
}

export function page(query) {
  return fetch({
    url: '/api/asset/error/page',
    method: 'get',
    params: query
  });
}


export function getObj(id) {
  return fetch({
    url: '/api/asset/error/' + id,
    method: 'get'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/asset/error/' + id,
    method: 'put',
    data: obj
  })
}
