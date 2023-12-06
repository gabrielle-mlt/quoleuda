<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
        v-if="$vuetify.display.mobile && drawer"
        v-model="drawer"
        app
        location="left"
        style="position: fixed;"
      >
        <v-list>
          <v-list-item>
            <v-btn
              :color="$route.name ? '' : 'primary' "
              class="mx-4"
              elevation="0"
              fab
              icon="mdi-home"
              to="/"
            />
          </v-list-item>
          <v-list-item>
            <router-link
              style="text-decoration: none; color: inherit;"
              to="/quiz-menu"
            >
              Quiz
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link
              style="text-decoration: none; color: inherit;"
              to="/hangeul"
            >
              Hangeul
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link
              style="text-decoration: none; color: inherit;"
              to="/cheat-sheet"
            >
              Cheat Sheet
            </router-link>
          </v-list-item>
          <v-list-item>
            <router-link
              style="text-decoration: none; color: inherit;"
              to="/about"
            >
              About
            </router-link>
          </v-list-item>
        </v-list>
        <v-spacer />
        <template #append>
          <div class="my-3">
            {{ new Date().getFullYear() }} — <strong>Quoleuda</strong>
            <a
              class="custom-link ml-4"
              href="https://www.paypal.me/gabzette"
              target="_blank"
            >Donate ♡</a>
          </div>
        </template>
      </v-navigation-drawer>

      <ApplicationBar @handle-drawer="drawer = !drawer;" />
      <v-main>
        <router-view style="top: 63px;" />
      </v-main>
      <v-footer
        :app="true"
        color="primary-darken-5"
      >
        <v-row
          justify="center"
          no-gutters
        >
          <v-col
            class="text-center"
            cols="auto"
          >
            {{ new Date().getFullYear() }} — <strong>Quoleuda</strong>
            &nbsp;
            <a
              href="https://www.paypal.me/gabzette"
              target="_blank"
            >Donate ♡</a>
          </v-col>
          <v-col
            class="ma-1"
            cols="auto"
          >
            <a
              href="https://ko-fi.com/gabz655307"
              target="_blank"
            >
              <v-img
                src="kofi_logo.png"
                width="55px"
              />
            </a>
          </v-col>
        </v-row>
      </v-footer>
    </v-layout>
  </v-app>
</template>

<script>
import ApplicationBar from './components/ApplicationBar.vue'

export default {
  components: {
    ApplicationBar
  },
  data () {
    return {
      drawer: false
    }
  },
  created () {
    // this.$vuetify.theme.global.name = localStorage.getItem('quoleuda_theme') || 'darkTheme'
  }
}
</script>

<style>
.custom-link {
  color: unset;
  text-decoration: underline;
}

.custom-link:hover {
  color: rgb(var(--v-primary-base));
}
</style>
