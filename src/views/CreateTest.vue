<template>
  <div class="test mt-4">
    <div class="d-flex justify-between align-center mb-4">
      <h1 class="title">{{ title }} lug'atlar.</h1>
      <VaButton round color="success" @click="isShow = !isShow">
        <i class="fa-solid fa-arrow-down-up-lock"></i>
      </VaButton>
      <VaButton @click="this.$router.go(-1)">Orqaga</VaButton>
    </div>
    <VaForm
      v-if="isShow"
      @submit.prevent="handleSubmit"
      class="mb-2 flex flex-col gap-2"
    >
      <VaInput label="Nemis tilida" v-model="vokable.de" required />
      <VaInput label="O'zbek tilida" v-model="vokable.uz" required />
      <VaButton type="submit">{{isUpdated?'Tahrirlash':'Kiritish'}}</VaButton>
    </VaForm>

    <div class="table">
      <div class="head">
        <div>№</div>
        <div>Deutsch</div>
        <div>Uzbek</div>
        <div>Action</div>
      </div>
      <div class="body" v-for="v,i of tests" :key="i">
        <div>{{ i+1 }}</div>
        <div>{{ v.de }}</div>
        <div>{{ v.uz }}</div>
        <div class="test-action">
            <button @click="deleteVokable(v)">
                <i class="fa-solid fa-trash"></i>
            </button>
            <button @click="edit(v)">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      id: "",
      isShow: false,
      vokable:{
            de: "",
            uz: "",
            lektionId: ""
      },
      isUpdated: false
    };
  },
  computed:{
    tests(){
        return this.$store.getters.tests
    }
  },
  methods: {
    handleSubmit(){
        if(!this.isUpdated){
            this.vokable.lektionId = this.id
            this.$store.dispatch("postTask", this.vokable)
            this.vokable = {}
        }else{
            this.$store.dispatch("editTask", this.vokable)
            this.isUpdated = false
            this.vokable = {}
        }
    },
    deleteVokable(data){
        this.$store.dispatch("deleteTask", data)
    },
    edit(data){
        this.isUpdated = true
        this.vokable = data
        this.isShow = true
    }
  },
  mounted() {
    this.title = this.$route.params.lektitle;
    this.id = this.$route.params.dagreeId;
    this.$store.dispatch("getTasks", this.id)
  },
};
</script>

<style lang="scss">
@import "../styles/testing.scss";
</style>