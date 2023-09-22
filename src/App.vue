<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
        v-if="$vuetify.display.mobile && drawer"
        v-model="drawer"
        location="left"
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
              to="/hangul-cheat-sheet"
            >
              Hangul
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
      </v-navigation-drawer>

      <v-main>
        <ApplicationBar @handle-drawer="drawer = !drawer;" />
        <router-view />
        <v-footer
          :app="true"
          color="primary-desaturate-1"
        >
          <v-row
            justify="center"
            no-gutters
          >
            <v-col
              class="text-center"
              cols="12"
            >
              {{ new Date().getFullYear() }} — <strong>Quoleuda</strong>
            </v-col>
            <v-col>
              <a
                class="custom-link"
                href="https://paypal.me/gabzette"
              >
                Donate ♡
              </a>
            </v-col>
          </v-row>
        </v-footer>
      </v-main>
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
    this.$vuetify.theme.global.name = localStorage.getItem('quoleuda_theme') || 'darkTheme'
  }
}
</script>

<style>
.custom-link {
  color: unset;
  text-decoration: underline;
}

.custom-link:hover {
  color: #ff7081;
}
</style>
