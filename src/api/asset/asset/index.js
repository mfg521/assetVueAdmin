import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/asset/asset/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/asset/asset',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/asset/asset/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/asset/asset/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/asset/asset/' + id,
    method: 'put',
    data: obj
  })
}

export function  getQrCode(id) {
  return fetch({
    url: '/api/asset/asset/qrCode/'+id,
    method: 'post',
  })
}
