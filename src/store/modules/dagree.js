

const dagree = {
    state: {
        dagrees: [],
        dagree: {}
    },
    getters: {
        dagrees(state) {
            return state.dagrees
        },
        dagree(state) {
            return state.dagree
        }
    },
    mutations: {
        dagrees(state, payload) {
            state.dagrees = payload
        },
        dagree(state, payload) {
            state.dagree = payload
        },
        addDagree(state, payload) {
            return state.dagrees.push(payload)
        },
        deleteDagree(state, payload) {
            let index = state.dagrees.findIndex(dagree => dagree.id == payload.id)
            state.dagrees.splice(index, 1)
        },
        saveDagree(state, payload) {
            state.dagrees = state.dagrees.map(dagree => {
                if (dagree.id == payload.id) {
                    return payload
                }
                return dagree
            })
        }
    },
    actions: {
        getDagree(context) {
            try {
                context.dispatch('getData', 'dagrees').then(res => {
                    context.commit('dagrees', res)
                })
            } catch (error) {
                console.log(error)
            }
        },
        getByIdDagree(context, payload) {
            try {
                return context.dispatch('getDataById', {
                    url: 'dagrees',
                    id: payload
                })
            } catch (error) {
                console.log(error)
            }
        },
        postDagree(context, payload) {
            try {
                context.dispatch('postData', {
                    url: 'dagrees',
                    data: payload
                }).then(res => {
                    context.commit('addDagree', res)
                })
            } catch (error) {
                alert(error.message)
            }
        },
        editDagree(context, payload) {
            try {
                context.dispatch('updateData', {
                    url: 'dagrees',
                    data: payload
                }).then(res => {
                    context.commit('saveDagree', res)
                })
            } catch (error) {
                alert(error.message)
            }
        },
        deleteDagree(context, payload) {
            try {
                context.dispatch('deleteData', {
                    url: 'dagrees',
                    id: payload
                }).then(res => {
                    context.commit('deleteDagree', res)
                })
            } catch (error) {
                alert(error.message)
            }
        },
    }
}


export default dagree