

const test = {
    state: {
        tests: [],
        test: {}
    },
    getters: {
        tests(state) {
            return state.tests
        },
        test(state) {
            return state.test
        }
    },
    mutations: {
        tests(state, payload) {
            state.tests = payload
        },
        test(state, payload) {
            state.test = payload
        },
        addTask(state, payload) {
            return state.tests.push(payload)
        },
        deleteTask(state, payload) {
            let index = state.tests.findIndex(test => test.id == payload.id)
            state.tests.splice(index, 1)
        },
        saveTask(state, payload) {
            state.tests = state.tests.map(test => {
                if (test.id == payload.id) {
                    return payload
                }
                return test
            })
        }
    },
    actions: {
        getTasks(context,payload) {
            try {
                context.dispatch('getData', 'tests').then(res => {
                    let array = []
                    res.map(v => {
                        if(v.lektionId == payload){
                            array.push(v)
                        }
                    })
                    context.commit('tests', array)
                })
            } catch (error) {
                console.log(error)
            }
        },
        getByIdTask(context, payload) {
            try {
                return context.dispatch('getDataById', {
                    url: 'tests',
                    id: payload
                })
            } catch (error) {
                console.log(error)
            }
        },
        postTask(context, payload) {
            try {
                context.dispatch('postData', {
                    url: 'tests',
                    data: payload
                }).then(res => {
                    context.commit('addTask', res)
                })
            } catch (error) {
                alert(error.message)
            }
        },
        editTask(context, payload) {
            try {
                context.dispatch('updateData', {
                    url: 'tests',
                    data: payload
                }).then(res => {
                    context.commit('saveTask', res)
                })
            } catch (error) {
                alert(error.message)
            }
        },
        deleteTask(context, payload) {
            try {
                context.dispatch('deleteData', {
                    url: 'tests',
                    id: payload.id
                }).then(res => {
                    context.commit('deleteTask', res)
                })
            } catch (error) {
                alert(error.message)
            }
        },
    }
}


export default test