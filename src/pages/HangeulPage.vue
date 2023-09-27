<template>
  <v-container>
    <v-row class="mt-4">
      <v-col>
        <h1>Hangeul</h1>
        <h3 class="mt-10">
          What is romanisation ?
        </h3>
        <p>
          Romanisation is the conversion of text from a different writing (in our case Korean) system to the Roman
          (Latin) script.
        </p>
        <p>
          The official romanisation for Korean is the <a
            class="custom-link"
            href="https://en.wikipedia.org/wiki/Revised_Romanization_of_Korean"
          >Revised Romanization of Korean</a> used
          since 2000 by
          the Korean government.
        </p>
        <h3 class="mt-8">
          How it will help you ?
        </h3>
        <p>Know romanisation is helpful because many Korean words are in fact english words writed in hangeul.</p>
        <p>As exemples : 햄버거 (haembeogeo)= Hamburger, 라면 (ramyeon)= Ramen or 메뉴 (menyu)= menu</p>
        <p>
          So it could be help full to know how to read Korean even for fiew days of vacation, to read menu in restorants
          for exemple.
        </p>

        <h3 class="mt-8">
          Is Korean alphabet like Japanes or Chines ?
        </h3>
        <p>
          No, the Korean alphabet (Hangeul) is not an idéographiques, it's an alphabetical alphabet, it means that it's
          made of letter
          you combine to make sounds. It's exaclty like the Latin alphabet, you have a specifi symbole for
          each letter.
        </p>
        <p>(A = ㅏ) + (B = ㅂ) = (바 = BA) simple, right ? </p>
        <h3 class="mt-8">
          How many letter is the Hangeul mades of ?
        </h3>
        <p>
          There are 40 letters in total but some are very easy like ㅅ (s) and ㅆ (ss).
        </p>
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
      class="mt-4"
      color="primary"
      @click="$router.push({ name: 'QuizMenu' })"
    >
      I'm ready !
    </v-btn>
  </v-container>
</template>
