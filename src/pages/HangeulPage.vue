<template>
  <v-container :style="$vuetify.display.mobile ? '' : 'max-width: 1000px;'">
    <h1 class="mt-4">
      Hangeul
    </h1>
    <v-row class="text-left mb-12">
      <v-col>
        <div>
          <h3 class="mt-10">
            Origins
          </h3>
          <p>
            At the origin, Hangeul was created following 2 principles:

            <v-row class="text-center justify-space-evenly align-center d-flex">
              <v-col cols="6">
                <v-sheet
                  class="d-flex align-center justify-center flex-wrap text-center font-weight-bold mx-auto my-6"
                  color="primary-darken-2"
                  height="100"
                  rounded="circle"
                  style="font-size: 32px;"
                  width="100"
                >
                  <div>
                    1
                  </div>
                </v-sheet>

                It reproduces the <strong>shape</strong> of the letter from the shape of the mouth when pronouncing
                and three materials: sky, earth and human
              </v-col>
              <v-col cols="6">
                <v-sheet
                  class="d-flex align-center justify-center flex-wrap text-center font-weight-bold mx-auto my-6"
                  color="primary-darken-2"
                  height="100"
                  rounded="circle"
                  style="font-size: 32px;"
                  width="100"
                >
                  <div>
                    2
                  </div>
                </v-sheet>
                The rest of letters were made based on the several basic letters to enhance its systematic feature
              </v-col>
            </v-row>
          </p>
        </div>
        <div>
          <h3 class="mt-8">
            What is romanization ?
          </h3>
          <p>
            Romanization is the conversion of text from a different writing (in our case Korean) system to the Roman
            (Latin) script.
          </p>
          <p>
            The official romanization for Korean is the
            <a
              class="custom-link"
              href="https://en.wikipedia.org/wiki/Revised_Romanization_of_Korean"
            >
              Revised Romanization of Korean
            </a>
            used since 2000 by the Korean government.
          </p>
        </div>
        <div>
          <h3 class="mt-8">
            How it will help you ?
          </h3>
          <p>Know romanization is helpful because many Korean words are in fact english words written in hangeul.</p>
          <p>
            As examples :
            <span lang="ko">햄버거</span> (haembeogeo)= Hamburger,
            <span lang="ko">라면</span> (ramyeon)= Ramen or
            <span lang="ko">메뉴</span> (menyu)= menu
          </p>
          <p>
            So it could be help full to know how to read Korean even for few days of vacation, to read menu in
            restaurants for example.
          </p>
        </div>
        <div>
          <h3 class="mt-8">
            Is Korean alphabet like Japanese or Chinese ?
          </h3>
          <p>
            No, the Korean alphabet (Hangeul) is not an ideographic, it's an alphabetical alphabet, it means that
            it's made of letter you combine to make sounds. It's exactly like the Latin alphabet, you have a specific
            symbol for each letter.
          </p>
          <p>
            (<span lang="ko">{{ '\u314F' }}</span> = A ) +
            (<span lang="ko">{{ '\u3142' }}</span> = B ) =
            (<span lang="ko">{{ '\uBC14' }}</span> = BA) simple, right ?
          </p>
        </div>
        <div>
          <h3 class="mt-8">
            How many letter is the Hangeul made of ?
          </h3>
          <p>
            There are 40 letters in total but some are very easy like
            <span lang="ko">{{ '\u3145' }}</span> (s) and <span lang="ko">{{ '\u3146' }}</span>(ss).
          </p>
          <div />
        </div>
      </v-col>
    </v-row>
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
<style scoped>
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

.v-col > div > p > span {
  color: #ff7081;
  font-weight: bold;
}

</style>
