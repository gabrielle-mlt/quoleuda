<template>
  <v-container :style="$vuetify.display.mobile ? '' : 'max-width: 1000px;'">
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
              class="hello"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <div
          id="sections-div"
          ref="sections-div"
        >
          <h2>Sections</h2>
          <v-virtual-scroll
            id="srollable-sections"
            ref="srollable-sections"
            :height="500"
            :items="sections"
            item-height="250"
            key-field="id"
          >
            <template #default="{ item }">
              <div
                :id="item.id"
                :key="item.id"
                :ref="item.id"
              >
                <h3
                  :href="`#${item.id}`"
                  @click="scrollToTop()"
                >
                  # {{ item.name }}
                </h3>
                <p>
                  {{ item.properties.TYPE }}
                </p>
                <p style="min-height: 200px;" />
              </div>
            </template>
          </v-virtual-scroll>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
// eslint-disable-next-line camelcase
import am5geodata_southKoreaLow from '@amcharts/amcharts5-geodata/southKoreaLow.js'

export default {
  name: 'SouthKoreaPage',
  data () {
    return {
      sections: []
    }
  },
  watch: {
    '$vuetify.theme': {
      async handler () {
        await this.refreshChart()
      },
      deep: true
    }
  },
  mounted () {
    this.getSections()
    this.refreshChart()
  },
  methods: {
    scrollToTop () {
      scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    getSections () {
      // eslint-disable-next-line camelcase
      this.sections = am5geodata_southKoreaLow.features.map((feature) => {
        return {
          id: feature.id,
          name: feature.properties.name,
          properties: feature.properties
        }
      })
    },
    refreshChart () {
      am5.array.each(am5.registry.rootElements, function (root) {
        if (root.dom.id === 'chartdiv') {
          root.dispose()
        }
      })
      const root = am5.Root.new('chartdiv')

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
      // Create polygon series
      const southKoreaSeries = southKoreaMap.series.push(
        am5map.MapPolygonSeries.new(root, {
          // eslint-disable-next-line camelcase
          geoJSON: am5geodata_southKoreaLow
        })
      )
      southKoreaSeries.mapPolygons.template.setAll({
        tooltipText: '{name}',
        interactive: true,
        fill: am5.color(0xaaaaaa),
        templateField: 'polygonSettings'
      })

      southKoreaSeries.mapPolygons.template.states.create('hover', {
        fill: this.$vuetify.theme.current.colors.secondary
      })

      southKoreaSeries.set('fill', am5.color(this.$vuetify.theme.current.colors.primary))

      southKoreaSeries.mapPolygons.template.events.on('click', async (ev) => {
        const dataItem = ev.target.dataItem
        const id = dataItem.get('id')
        const index = this.sections.findIndex((section) => section.id === id)

        const sectionDiv = document.getElementById('sections-div')
        if (sectionDiv) sectionDiv.scrollIntoView({ behavior: 'smooth' })
        if (this.$refs['srollable-sections']) this.$refs['srollable-sections'].scrollToIndex(index)
      })
    }
  }
}

</script>

<style scoped>
.hello {
  width: 100%;
  height: 500px;
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
