<template>
  <v-container fluid>
    <v-row
      class="d-flex mt-4"
    >
      <v-col cols="12">
        <h1>Welcome to Quoleuda</h1>
        <h2>Learn Hangeul / <span lang="ko">{{ '\ud55c\uae00' }}</span></h2>
        <div class="mt-4">
          <p>
            Quoleuda is a quiz app for learning the Korean alphabet, Hangeul <small>(also written Hangul).</small>
          </p>
          <p>Try it now and repeat as many times as you want !</p>
        </div>
        <v-btn
          class="mt-4"
          color="primary"
          @click="$router.push({ name: 'Quiz' })"
        >
          Start Quiz
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        style="pointer-events: none;"
      >
        <v-card
          color="background"
          elevation="2"
          height="200"
          rounded="lg"
          style="margin-inline: auto;"
          theme="lightTheme"
          width="fit-content"
        >
          <video
            aria-description="Quiz demo"
            aria-label="Quiz demo"
            autoplay
            height="200"
            loop
            muted
            playsinline
            title="Quiz demo"
          >
            <source
              src="/quiz_demo.mp4"
              type="video/mp4"
            >
          </video>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>
<style scoped>
.video-container {
  overflow: hidden;
  border-radius: 50px;
  height: 200px;
  width: fit-content;
}

</style>
