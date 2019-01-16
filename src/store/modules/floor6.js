import {reqEmpBlockInfo, reqEmpInfo} from "../../api/asset/employee";
import {reqRoomInfo} from "../../api/asset/room";

const floor6 = {
  state: {
    employeeBlocks: [] //员工和房间的信息
  },

  mutations: {
    RECEIVE_EMPLOYEEBLOCK: (state, {employeeBlocks}) => {
      state.employeeBlocks = employeeBlocks
    },
  },

  actions: {

    async getEmployeeBlock({
                             commit
                           }, obj) {
      //send  ajax request
      const result = await reqEmpBlockInfo(obj)
      {
        // commit mutation
        const employeeBlocks = result
        commit('RECEIVE_EMPLOYEEBLOCK', {employeeBlocks})
      }
    },
  }
};

export default floor6;
