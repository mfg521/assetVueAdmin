import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/asset/room/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/asset/room',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/asset/room/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/asset/room/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/asset/room/' + id,
    method: 'put',
    data: obj
  })
}


export function reqRoomInfo(roomNum) {
  return fetch({
    url: '/api/asset/room/roomInfo',
    method: 'post',
    data: roomNum
  })
}

export function reqRoomInfoByFloor(floor) {
  return fetch({
    url: '/api/asset/room/listroom',
    method: 'post',
    data: floor
  })
}

