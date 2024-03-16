<script setup>
import { computed, ref } from 'vue'

const fromCurr = ref('USD')
const toCurr = ref('KRW')

const fromAmount = ref(1)
const toAmount = ref(0.00075)
const locked = ref(false)

const lastUpdated = ref(new Date('2024-03-15'))

const displayDate = computed(() => {
  return lastUpdated.value.toLocaleDateString('en-GB')
})

const coefficients = {
  EUR: 0.00069,
  USD: 0.00075,
  JPY: 0.112,
  GBP: 0.0000059
}

const convertFrom = () => {
  // fromAmount.value = toAmount.value * coefficients[fromCurr.value]
  // 2 decimals
  fromAmount.value = Math.round((toAmount.value * coefficients[fromCurr.value]) * 100) / 100
}

const convertTo = () => {
  // toAmount.value = fromAmount.value / coefficients[fromCurr.value]
  toAmount.value = Math.round((fromAmount.value / coefficients[fromCurr.value]) * 100) / 100
}

</script>

<template>
  <v-container
    :style="$vuetify.display.mobile ? '' : 'max-width: 1000px;'"
  >
    <h1 class="mt-4">
      Won Converter
    </h1>
    <h2>
      ₩ / 원
    </h2>
    <p>
      We last updated currency rate on {{ displayDate }}
    </p>
    <v-sheet
      class="justify-center align-center ma-auto mt-5"
      color="transparent"
      max-width="500"
    >
      <v-text-field
        v-model="fromAmount"
        :hide-spin-buttons="true"
        :rules="[
          () => fromAmount != null || 'Oups, you forgot something ;)',
          () => fromAmount > 0 || 'Zero is the same in every currency ;)',
          () => fromAmount < 1000000000 || `I'm sure you're not that rich`]"
        label="Amount"
        type="number"
        variant="outlined"
        @input="convertTo()"
      >
        <template #append-inner>
          <v-divider
            :vertical="true"
            class="ma-3"
          />
          <v-menu>
            <template #activator="{props}">
              <v-btn
                :items="Object.keys(coefficients)"
                v-bind="props"
              >
                {{ fromCurr }}
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in Object.keys(coefficients)"
                :key="index"
                @click="fromCurr = item; locked ?convertFrom(): convertTo()"
              >
                <v-list-item-title>
                  {{ item }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-text-field>
      <v-text-field
        v-model="toAmount"
        :hide-spin-buttons="true"
        :messages="toAmount > 0 && toAmount < 100 && fromAmount < 0.01 ? 'You should try more' : ''"
        :rules="[
          () => !!toAmount || 'Oups, you forgot something ;)',
          () => toAmount > 0 || 'Zero is the same in every currency ;)',
          () => toAmount < 1000000000 || `I'm sure you're not that rich`]"
        class="mt-5"
        label="Amount"
        type="number"
        variant="outlined"
        @input="convertFrom()"
      >
        <template #append-inner>
          <v-icon
            :icon="locked ? 'mdi-lock' :'mdi-lock-open-variant'"
            right
            @click="locked = !locked"
          />
          <v-divider
            :vertical="true"
            class="ma-3"
          />
          <span class="v-text-field__suffix">
            {{ toCurr }}
          </span>
        </template>
      </v-text-field>
    </v-sheet>
  </v-container>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
