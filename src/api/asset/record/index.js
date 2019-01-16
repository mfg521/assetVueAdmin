import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/asset/record/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/asset/record',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/asset/record/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/asset/record/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/asset/record/' + id,
    method: 'put',
    data: obj
  })
}

export function getAssetInfo(obj) {
  return fetch({
    url: '/api/asset/record/getAsset',
    method: 'post',
    data: obj
  })
}
export function returnAsset(obj) {
  return fetch({
    url: '/api/asset/record/returnAsset',
    method: 'post',
    data: obj
  })
}
export function changeAsset(obj) {
  return fetch({
    url: '/api/asset/record/changeAsset',
    method: 'post',
    data: obj
  })
}
