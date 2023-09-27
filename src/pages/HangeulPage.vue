<template>
  <v-container :style="$vuetify.display.mobile ? '' : 'max-width: 1000px;'">
    <h1 class="mt-4">
      Hangeul
    </h1>
    <v-row class="text-left mb-12">
      <v-col>
        <div>
          <h3 class="mt-10">
            What is romanization ?
          </h3>
          <p>
            Romanization is the conversion of text from a different writing (in our case Korean) system to the Roman
            (Latin) script.
          </p>
          <p>
            The official romanization for Korean is the <a
              class="custom-link"
              href="https://en.wikipedia.org/wiki/Revised_Romanization_of_Korean"
            >Revised Romanization of Korean</a> used
            since 2000 by
            the Korean government.
          </p>
        </div>
        <div>
          <h3 class="mt-8">
            How it will help you ?
          </h3>
          <p>Know romanization is helpful because many Korean words are in fact english words written in hangeul.</p>
          <p>As examples : 햄버거 (haembeogeo)= Hamburger, 라면 (ramyeon)= Ramen or 메뉴 (menyu)= menu</p>
          <p>
            So it could be help full to know how to read Korean even for few days of vacation, to read menu in
            restaurants for example.
          </p>
        </div>
        <div>
          <h3 class="mt-8">
            Is Korean alphabet like Japanese or Chines ?
          </h3>
          <p>
            No, the Korean alphabet (Hangeul) is not an ideographic, it's an alphabetical alphabet, it means that
            it's made of letter you combine to make sounds. It's exactly like the Latin alphabet, you have a specific
            symbol for each letter.
          </p>
          <p>(A = ㅏ) + (B = ㅂ) = (바 = BA) simple, right ? </p>
        </div>
        <div>
          <h3 class="mt-8">
            How many letter is the Hangeul made of ?
          </h3>
          <p>
            There are 40 letters in total but some are very easy like ㅅ (s) and ㅆ (ss).
          </p>
          <div />
        </div>
      </v-col>
    </v-row>
    <!--    <p>
          At the origin, Hangeul was created following 2 principles:
          <ul>
            <li>
              The <strong>shape</strong> of the letter is inspired by the shape of the mouth when pronouncing the
              sound
            </li>
            <li>The <strong>sound</strong> of the letter is inspired by the sound of the letter</li>
          </ul>
        </p>-->
    <v-btn
      class="my-4"
      color="primary"
      @click="$router.push({ name: 'QuizMenu' })"
    >
      I'm ready !
    </v-btn>
  </v-container>
</template>
<script setup>
</script>
<style>
.v-col > div {
  margin-top: 5rem;
}

.v-col > div > h3 {
  font-size: 32px;
  margin-bottom: 0.7rem;
}

@media (min-width: 600px) {
  .v-col > div > p {
    font-size: 20px;
    text-align: justify;
  }
}

</style>
