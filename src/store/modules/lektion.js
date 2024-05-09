

const lektion = {
    state: {
        lektions: [],
        lektion: {}
    },
    getters: {
        lektions(state) {
            return state.lektions
        },
        lektion(state) {
            return state.lektion
        }
    },
    mutations: {
        lektions(state, payload) {
            state.lektions = payload

        },
        lektion(state, payload) {
            state.lektion = payload
        },
        addLektion(state, payload) {
            return state.lektions.push(payload)
        },
        deleteLektion(state, payload) {
            let index = state.lektions.findIndex(lektion => lektion.id == payload.id)
            state.lektions.splice(index, 1)
        },
        saveLektion(state, payload) {
            state.lektions = state.lektions.map(lektion => {
                if (lektion.id == payload.id) {
                    return payload
                }
                return lektion
            })
        }
    },
    actions: {
        getLektion(context,payload) {
            try {
                context.dispatch('getData', 'lektions').then(res => {
                    let array = []
                     res.map(l => {
                        if(l.dagreId == payload){
                            array.push(l)
                        }
                    })
                    context.commit('lektions', array)
                })
            } catch (error) {
                console.log(error)
            }
        },
        getByIdLektion(context, payload) {
            try {
                return context.dispatch('getDataById', {
                    url: 'lektions',
                    id: payload
                })
            } catch (error) {
                console.log(error)
            }
        },
        postLektion(context, payload) {
            try {
                context.dispatch('postData', {
                    url: 'lektions',
                    data: payload
                }).then(res => {
                    context.commit('addLektion', res)
                })
            } catch (error) {
                alert(error.message)
            }
        },
        editLektion(context, payload) {
            try {
                context.dispatch('updateData', {
                    url: 'lektions',
                    data: payload
                }).then(res => {
                    context.commit('saveLektion', res)
                })
            } catch (error) {
                alert(error.message)
            }
        },
        deleteLektion(context, payload) {
            try {
                context.dispatch('deleteData', {
                    url: 'lektions',
                    id: payload
                }).then(res => {
                    context.commit('deleteLektion', res)
                })
            } catch (error) {
                alert(error.message)
            }
        },
    }
}


export default lektion