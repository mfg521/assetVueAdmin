import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/asset/employee/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/asset/employee',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/asset/employee/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/asset/employee/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/asset/employee/' + id,
    method: 'put',
    data: obj
  })
}

export function reqEmpInfo(obj) {
  return fetch({
    url: '/api/asset/employee/getEmpByRoomNum',
    method: 'post',
    data: obj
  })
}

export function changeEmpByDrop(obj) {
  return fetch({
    url: '/api/asset/employee/changeEmpByDrop',
    method: 'post',
    data: obj
  })
}


export function changeOrSaveEmpBlock(obj) {
  return fetch({
    url: '/api/asset/employee/changeOrSaveEmpBlock',
    method: 'post',
    data: obj
  })
}


export function reqEmpBlockInfo(obj) {
  return fetch({
    url: '/api/asset/employee/getEmpBlockByRoomNum',
    method: 'post',
    data: obj
  })
}
