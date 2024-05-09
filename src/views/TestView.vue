<template>
  <div class="tester" v-if="!isToggle">
    <h1 class="tester-question">{{ productionTest[cnt]?.question }}</h1>
    <div class="row">
      <div class="col-6" v-for="answer,i of productionTest[cnt]?.options" :key="i">
        <button class="answer-btn" @click="checkAnswer(answer)">
            {{ answer }}
        </button>
      </div>
    </div>
  </div>
  <div class="list" v-else>
    <h1 class="list-result">To'g'ri jovoblar soni: {{ correct }} ta.</h1>
    <h1 class="list-result">Noto'g'ri jovoblar soni: {{ incorrect }} ta.</h1>
    <div class="list-f" v-for="l,i of array" :key="i">
        <h1 class="list-title">{{ i+1 }}. {{ l.de }}</h1>
        <div class="list-uz">✅ {{ l.uz }}</div>
        <div class="list-answer" v-if="l?.answer">❌ {{ l?.answer }}</div>
    </div>
    <VaButton class="mt-5 w-full" @click="pageReload">Qaytadan urinish</VaButton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      title: "",
      cnt: 0,
      array:[],
      isToggle: false,
      correct: 0,
      incorrect: 0
    };
  },
  computed: {
    testers() {
      return this.$store.getters.testers;
    },
    productionTest() {
      const words = this.$store.getters.testers;
      const wordsLength = words.length;
      const uniqueIndexes = [];

      
      while (uniqueIndexes.length < wordsLength) {
        const randomIndex = Math.floor(Math.random() * wordsLength);
        if (!uniqueIndexes.includes(randomIndex)) {
          uniqueIndexes.push(randomIndex);
        }
      }

      
      const questions = uniqueIndexes.map((index) => {
        const questionWord = words[index];
        const options = [];

        
        options.push(questionWord.uz);

        while (options.length < 4) {
          const randomIndex = Math.floor(Math.random() * wordsLength);
          const randomWord = words[randomIndex];
          if (!options.includes(randomWord.uz)) {
            options.push(randomWord.uz);
          }
        }

        // Variantlarni aralashtirish
        options.sort(() => Math.random() - 0.5);

        // Savolni qaytarish
        return {
          question: questionWord.de,
          options: options,
        };
      });
      return questions
    },
  },
  methods: {
    checkAnswer(data){
      this.testers.map(test => {
        if(test.de === this.productionTest[this.cnt]?.question){
          if(test.uz === data){
            this.array.push(test)
            this.correct += 1
          }else{
            this.array.push({de: this.productionTest[this.cnt]?.question, answer: data, uz: test.uz})
            this.incorrect += 1
          }
        }
      })
      let num = this.productionTest.length - 1
      if( num === this.cnt){
        this.cnt = num
        this.isToggle = true
      }else{
        this.cnt += 1
      }
      
    },
    pageReload(){
      location.reload();
    }
  },
  mounted() {
    this.title = this.$route.params.title;
    this.id = this.$route.params.id;
    this.$store.dispatch("allTestes", this.id);
  },
};
</script>

<style lang="scss">
@import "../styles/tester.scss";
</style>
