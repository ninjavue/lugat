

const tester = {
    state: {
        testers: [],
        tester: {}
    },
    getters: {
        testers(state) {
            return state.testers
        },
        tester(state) {
            return state.tester
        }
    },
    mutations: {
        testers(state, payload) {
            state.testers = payload
        },
        tester(state, payload) {
            state.tester = payload
        },
        addDagree(state, payload) {
            return state.testers.push(payload)
        },
        deleteDagree(state, payload) {
            let index = state.testers.findIndex(tester => tester.id == payload.id)
            state.testers.splice(index, 1)
        },
        saveDagree(state, payload) {
            state.testers = state.testers.map(tester => {
                if (tester.id == payload.id) {
                    return payload
                }
                return tester
            })
        }
    },
    actions: {
        allTestes(context,payload) {
            try {
                context.dispatch('getData', 'tests').then(res => {
                    let array = []
                    res.map(v => {
                        if(v.lektionId == payload){
                            array.push(v)
                        }
                    })
                    context.commit('testers', array)
                })
            } catch (error) {
                console.log(error)
            }
        },
    }
}


export default tester