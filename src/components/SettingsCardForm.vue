<script setup>
import { useQuizSettingsStore } from '@stores/quizSettings.js'
import { ref } from 'vue'

const settings = useQuizSettingsStore()
const modelReverseMode = ref(settings.reverseMode)
const modelFontMode = ref(settings.fontMode)

</script>

<template>
  <v-card rounded="lg">
    <v-card-title>
      Settings
    </v-card-title>
    <v-card-text>
      <v-switch
        v-model="modelReverseMode"
        :disabled="$route.name === 'Quiz'"
        class="mx-auto"
        color="primary"
        hide-details
        label="Reverse Mode"
        style="width: fit-content;"
        @change="settings.$patch({ reverseMode: !settings.reverseMode })"
      >
        <template #append>
          <v-menu
            :close-on-content-click="false"
            location="end"
          >
            <template #activator="{ props }">
              <v-btn
                color="secondary"
                fab
                icon
                size="xx-small"
                v-bind="props"
              >
                <v-icon size="small">
                  mdi-information-symbol
                </v-icon>
              </v-btn>
            </template>
            <v-card width="350">
              <v-card-text>
                <p>
                  In <span class="font-weight-bold">normal mode</span>, you will be given the korean letter and you
                  will have to find the
                  <span
                    class="font-weight-bold"
                    style="color: rgb(var(--v-theme-primary));"
                  >
                    corresponding roman letter
                  </span>.
                </p>
                <p>
                  {{ '\u314F' }}
                  <v-icon size="x-small">
                    mdi-arrow-right
                  </v-icon>
                  ? (roman letter)
                </p>
                <v-divider class="my-4" />
                <p>
                  In <span class="font-weight-bold">reverse mode</span>, you will be given the roman letter and you
                  will have to find the
                  <span
                    class="font-weight-bold"
                    style="color: rgb(var(--v-theme-primary));"
                  >
                    corresponding korean letter
                  </span>.
                </p>
                <p>
                  a
                  <v-icon size="x-small">
                    mdi-arrow-right
                  </v-icon>
                  ? (korean letter)
                </p>
                <v-divider class="my-4" />
                The modification of this setting is disabled during a quiz
                <span style="font-size: 1.4rem;">{{ '\ud83d\ude09' }}</span>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-switch>
      <v-select
        v-model="modelFontMode"
        :density="$vuetify.display.mobile ? 'compact' : undefined"
        :disabled="settings.reverseMode"
        :items="settings.fontOptions"
        class="mx-auto"
        color="primary"
        hide-details
        return-object
        style="width: 250px;"
        variant="outlined"
        @update:model-value="settings.$patch({ fontMode: modelFontMode })"
      >
        <template #selection="{item}">
          <span
            class="align-self-center"
            style="font-size: 0.9rem;"
          >{{ item.title }}</span>
          <span
            v-if="item.value !== 'normal'"
            :class="item.raw.class"
            class="ml-2 my-0"
            lang="ko"
          >
            {{ '\ud55c\uae00' }}
          </span>
        </template>
        <template #prepend-inner>
          <v-icon color="primary">
            mdi-format-font
          </v-icon>
        </template>
        <template #item="{ props, item }">
          <v-list-item
            :title="false"
            v-bind="props"
          >
            <v-list-item-subtitle>
              <span
                :class="item.raw.class"
                :style="item.value === 'nanum-pen-script' ? 'font-size: 1.6rem;' : ''"
                lang="ko"
              >
                {{ '\ud55c\uae00' }}
              </span>
            </v-list-item-subtitle>
          </v-list-item>
        </template>
      </v-select>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
