<template>
  <v-container :style="$vuetify.display.lgAndDown ? '' : 'max-width: 1500px;'">
    <h1>South Korea</h1>

    <v-row class="text-left mt-6 mb-12">
      <v-col>
        <v-card
            color="primary"
            variant="tonal"
        >
          <v-card-text>
            <div
                id="chartdiv"
                ref="chartdiv"
                class="southKoreaMap"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6" md="6" xl="6">
        <div
            id="sections-div"
            ref="sections-div"
        >
          <h2>Sections</h2>
          <v-virtual-scroll
              id="scrollableSections"
              ref="scrollableSections"
              :items="sections"
              class="virtualScroller"
              item-height="250"
              key-field="id"

          >
            <template #default="{ item }">
              <div
                  :id="item.id"
                  :key="item.id"
                  :ref="item.id"
                  style="cursor: pointer;"
                  @mouseover="selectSection(item.id);"
              >
                <h3 :href="`#${item.id}`">
                  # {{ item.name }}
                </h3>
                <p>
                  {{ item.properties.TYPE }}
                </p>
                <p v-if="item.additionnalData && item.additionnalData.population">
                  <v-icon color="primary" icon="mdi-account-group"/>
                  {{ new Intl.NumberFormat('en-US').format(item.additionnalData.population) }} inhabitants
                </p>
                <p v-if="item.additionnalData && item.additionnalData.area">
                  <v-icon color="primary">mdi-map</v-icon>
                  {{ new Intl.NumberFormat('en-US').format(item.additionnalData.area) }} km²
                </p>
                <p v-if="item.additionnalData && item.additionnalData.description" class="text-caption">
                  {{ item.additionnalData.description }}
                </p>
                <p style="min-height: 200px;"/>
              </div>
            </template>
          </v-virtual-scroll>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import am5geodata_southKoreaLow from '@amcharts/amcharts5-geodata/southKoreaLow.js'
import southKorea_geo from '@/resources/southKoreaGeo.js'
import {onMounted, ref, watch} from 'vue'
import {useTheme,} from 'vuetify'

const sections = ref([]);
const scrollableSections = ref(null);

let southKoreaSeries
let clicked = false

const chartdiv = ref<HTMLElement | null>();
let selectedPolygon: am5map.MapPolygon | undefined;
let currentActive: undefined | am5map.MapPolygon;
let selectedPolyId: string | undefined;

// vuetify theme
const theme = useTheme()

watch(theme.current, async () => {
  await setMap()
}, {deep: true})

onMounted(() => {
  getSections()
  setMap()
})

const setMap = async () => {
  if (chartdiv.value) {
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root.dom.id === 'chartdiv') {
        root.dispose()
      }
    })

    // Create root element
    const root = am5.Root.new('chartdiv')

    // Create map instance
    const southKoreaMap = root.container.children.push(
        am5map.MapChart.new(root, {
          projection: am5map.geoMercator(),
          panX: 'none',
          panY: 'none',
          wheelX: 'none',
          wheelY: 'none',
          pinchZoom: false
        })
    )

    // Set map definition
    southKoreaSeries = southKoreaMap.series.push(
        am5map.MapPolygonSeries.new(root, {
          // eslint-disable-next-line camelcase
          geoJSON: am5geodata_southKoreaLow
        })
    )

    southKoreaSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      interactive: true,
      templateField: 'polygonSettings'
    })

    southKoreaSeries.mapPolygons.template.states.create('hover', {
      fill: theme.current.value.colors.primary,
      stroke: theme.current.value.colors.primary,
      strokeWidth: 7,
      shadowColor: am5.color(0x000000),
      shadowBlur: 12,
    })

    southKoreaSeries.set('fill', am5.color(theme.global.current.value.colors['primary-lighten-2']))
    if (theme.current.value.dark) southKoreaSeries.set('stroke', am5.color(theme.current.value.colors.primary))

    southKoreaSeries.mapPolygons.template.events.on('click', async (ev) => {
      const dataItem = ev.target.dataItem
      const id = dataItem.get('id')

      selectSection(id)
      const index = sections.value.findIndex((section) => section.id === id)
      if (scrollableSections.value) scrollableSections.value.scrollToIndex(index)
    })

  }

}
const selectSection = (id) => {
  if (selectedPolygon) {
    selectedPolygon.get("mapPolygon").unhover()
    selectedPolygon.get('mapPolygon').hideTooltip()

  }

  selectedPolygon = southKoreaSeries.getDataItemById(id);
  selectedPolygon?.get("mapPolygon").hover()
  selectedPolygon?.get('mapPolygon').showTooltip()


  selectedPolyId = id
}

const getSections = () => {
  // eslint-disable-next-line camelcase
  sections.value = am5geodata_southKoreaLow.features.map((feature) => {
    return {
      id: feature.id,
      name: feature.properties.name,
      properties: feature.properties,
      additionnalData: southKorea_geo.find((geo) => geo.id === feature.id)
    }
  })
}
</script>

<style scoped>
@media screen and (min-width: 600px) {
  .southKoreaMap {
    width: 100%;
    height: calc(100vh - 380px);
  }

  .virtualScroller {
    height: calc(100vh - 380px);
  }
}

@media screen and (max-width: 600px) {
  .southKoreaMap {
    width: 100%;
    height: calc(20vh);
  }

  .virtualScroller {
    height: calc(50vh);
  }
}

</style>

<style>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(var(--v-theme-primary), 0.08);
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-primary), 0.6);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--v-theme-primary), 0.4);
}
</style>
