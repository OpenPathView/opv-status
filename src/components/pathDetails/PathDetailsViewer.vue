<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Path details viewer: {{id_campaign}}-{{id_malette}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <Menu></Menu>
            </v-toolbar>
            <v-card-text>
              <v-data-table :headers="headers" :items="pathDetails" hide-actions item-key="id_path_details">
                <template slot="items" slot-scope="props">
                  <tr @click="props.expanded = !props.expanded">
                    <td>{{props.item.name}}</td>
                    <td>{{props.item.decription}}</td>
                    <td>{{props.item.id_path_details}}</td>
                    <td>{{props.item.id_malette}}</td>
                    <td v-if="props.item.id_path_details in pathNodes">{{pathNodes[props.item.id_path_details].length}}</td>
                    <td v-else><v-progress-circular indeterminate color="primary"></v-progress-circular></td>
                  </tr>
                </template>
                <template slot="expand" slot-scope="props">
                  <v-card flat>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <router-link :to="{ name: 'PathDetailsEditor', params: { id_path_details: props.item.id_path_details, id_malette: props.item.id_malette}}">
                        <v-btn color="primary">Editor</v-btn>
                      </router-link>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-data-table>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog">
                <v-btn slot="activator" dark color="primary">New</v-btn>
                <v-card>
                  <v-toolbar color="primary" dark>
                    <v-toolbar-title>New path details for campaign {{id_campaign}}/{{id_malette}}</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-text-field label="Name" ref="name"></v-text-field>
                    <v-textarea label="Description" ref="description"></v-textarea>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark @click="createPathDetail">Create</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Menu from '@/components/Menu'
import apiManager from '@/apiManager'

export default {
  name: 'PathDetailsViewer',
  props: ['id_campaign', 'id_malette'],
  components: {
    Menu
  },
  data () {
    return {
      pathDetails: [],
      pathNodes: {},
      headers: [
        {text: 'Name', value: 'name', align: 'left', sortable: false},
        {text: 'Description', value: 'description', sortable: false},
        {text: 'ID', value: 'id_path_details'},
        {text: 'ID Malette', value: 'id_malette'},
        {text: 'Number path node', value: 'number'}
      ],
      dialog: false
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    getPathNode (pathDetail) {
      apiManager.getPathNodeFromPathDetails(pathDetail.id_path_details)
        .then((pathNode) => {
          this.$set(this.pathNodes, pathDetail.id_path_details, pathNode.data.objects)
        })
    },
    createPathDetail () {
      apiManager.postPathDetails({
        campaign: {
          id_campaign: this.id_campaign,
          id_malette: this.id_malette
        },
        name: this.$refs.name.$refs.input.value,
        decription: this.$refs.description.$refs.input.value
      })
        .then(() => {
          this.loadData()
          this.dialog = false
        })
    },
    loadData () {
      if (this.id_campaign !== null && this.id_malette !== null) {
        apiManager.getPathDetailFromCampaign(this.id_campaign)
          .then((pathDetails) => {
            this.pathDetails = pathDetails.data.objects
            for (let pathDetail in this.pathDetails) {
              this.getPathNode(this.pathDetails[pathDetail])
            }
          })
      }
    }
  }
}
</script>
