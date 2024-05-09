<template>
  <div class="home pt-5">
    <div class="d-flex gap-2 justify-between mb-4 flex-wrap">
      <button v-for="dagre,i of dagrees" :key="i" :class="`px-14 relative button-22 ${id == dagre.id?'active':''}`" @click="nextPage(dagre)" :style="`background-color: ${dagre.color};`">
        {{ dagre.title }}
      </button>
      <button @click="showModal = true" class="px-14 button-22">
        <span class="fz-50">+</span>
      </button>
    </div>
  </div>

  <VaModal
    v-model="showModal"
    hide-default-actions>
    <button class="modal-close" @click="showModal = false">
      <i class="fa-regular fa-circle-xmark"></i>
    </button>
    <VaForm @submit.prevent="handleSubmit" class="mt-10 mb-2 flex flex-col gap-2">
      <VaInput label="New Dagree" v-model="newDagree.title" required />
      <VaButton type="submit">Kiritish</VaButton>
    </VaForm>
  </VaModal>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      newDagree:{
        title:"",
        color:""
        
      },
      id:''
    }
  },

  computed:{
    dagrees(){
      return this.$store.getters.dagrees
    }
  },
  methods: {
    handleSubmit(){
      let a = Math.round(Math.random() * 255)
      let b = Math.round(Math.random() * 255)
      let c = Math.round(Math.random() * 255)
      this.newDagree.color = `rgb(${a},${b},${c})`
      this.newDagree.title = this.newDagree.title.toLocaleUpperCase()
      this.$store.dispatch("postDagree", this.newDagree)
      this.showModal = false,
      this.newDagree = {}
    },
    nextPage(data){
      window.location.href = `/${data.title}/${data.id}`
    }
  },
  mounted() {
    this.$store.dispatch("getDagree")
  },
  watch: {
    dagrees: {
      handler(newVal) {
        if (newVal.length > 0) {
          this.id = newVal[0].id;
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss">
@import "../styles/home.scss";
</style>