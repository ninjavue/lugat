<template>
    <div class="home pt-5">
        <div class="d-flex justify-between align-center mb-4">
            <h1 class="title">{{ title }} daraja mavzulari.</h1>
            <VaButton @click="this.$router.go(-1)">Orqaga</VaButton>
        </div>
      <div class="d-flex gap-2 justify-between mb-4 flex-wrap">
        <button v-for="lektion,i of lektions" :key="i" class="px-14 relative button-22" @click="nextPage(lektion)" :style="`background-color: ${lektion.color};`">
          {{ lektion.title }}
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
      <VaForm @submit.prevent="handleSubmit" class=" mt-10 mb-2 flex flex-col gap-2">
        <VaInput label="Yang dars qo'shing." v-model="newLektion.title" required />
        <VaButton type="submit">Kiritish</VaButton>
      </VaForm>
    </VaModal>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showModal: false,
        newLektion:{
          title:"",
          color:"",
          dagreId:""
        },
        id:'',
        title: ""
      }
    },
  
    computed:{
        lektions(){
        return this.$store.getters.lektions
      }
    },
    methods: {
      handleSubmit(){
        let a = Math.round(Math.random() * 255)
        let b = Math.round(Math.random() * 255)
        let c = Math.round(Math.random() * 255)
        this.newLektion.dagreId = this.id
        this.newLektion.color = `rgb(${a},${b},${c})`
        this.$store.dispatch("postLektion", this.newLektion)
        this.showModal = false,
        this.newLektion = {}
      },
      nextPage(data){
        window.location.href = `/${this.title}/${this.id}/${data.title}/${data.id}`
      }
    },
    mounted() {
      this.$store.dispatch("getLektion", this.$route.params.id)
      this.id = this.$route.params.id
      this.title = this.$route.params.title
    }
  }
  </script>
  
  <style lang="scss">
  @import "../styles/home.scss";
  </style>