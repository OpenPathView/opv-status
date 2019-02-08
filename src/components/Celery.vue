<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs7>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Celery</v-toolbar-title>
              <v-spacer></v-spacer>
              <Menu :where="'Celery'"></Menu>
            </v-toolbar>
            <v-card-text>
              <v-container fluid grid-list-sm>
                <v-layout row wrap>
                  <v-flex>
                    <v-card>
                      <v-card-text>
                        <v-text-field ref='campaignId' label='Campaign id' :value="id_campaign"></v-text-field>
                        <v-text-field ref='maletteId' label='Malette id' :value="id_malette"></v-text-field>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex>
                    <v-card>
                      <v-card-text>
                        <v-btn @click="launchCelery()" color="primary">Launch celery</v-btn>
                      </v-card-text>
                    </v-card>
                    <v-card class="mt-1">
                      <v-card-text>
                        <v-list>
                          <v-list-tile>
                            <v-list-tile-content>Answer:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{answer}}</v-list-tile-content>
                          </v-list-tile>
                          <v-divider></v-divider>
                          <v-list-tile>
                            <v-btn :href="flowerUri" color="primary">Flower</v-btn>
                          </v-list-tile>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import Menu from '@/components/Menu'
import Config from '@/config'
import ApiManager from '@/apiManager'

export default {
  name: 'Celery',
  components: {
    Menu
  },
  props: ['id_campaign', 'id_malette'],
  data () {
    return {
      answer: 'You must ask something before'
    }
  },
  methods: {
    launchCelery () {
      ApiManager.postCeleryLaunch({
        'campaign_id': this.$refs.campaignId.$refs.input.value,
        'malette_id': this.$refs.maletteId.$refs.input.value
      })
        .then(answer => {
          this.answer = answer.data.answer
        })
    }
  },
  computed: {
    flowerUri () {
      return Config.server.host + ':' + Config.server.flower_port
    }
  }
}
</script>
