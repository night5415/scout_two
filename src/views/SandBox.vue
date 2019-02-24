<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout>
        <v-flex>
          <v-toolbar flat>
            <v-btn flat icon @click="loadData">
              <v-icon>cached</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field v-model="gridSearch" append-icon="search" label="Search"></v-text-field>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="dataList"
            :search="gridSearch"
            :loading="gridLoading"
          >
            <v-progress-linear slot="progress" height="3" v-model="dataProgress"></v-progress-linear>
            <template slot="items" slot-scope="props">
              <tr @click="rowClick(props.item)">
                <td class="text-xs-right">{{ props.item.FirstName }}</td>
                <td class="text-xs-right">{{ props.item.LastName }}</td>
                <td class="text-xs-right">{{ props.item.IsActive }}</td>
                <td class="text-xs-right">{{ props.item.DOB | formatDate }}</td>
                <td class="text-xs-right">{{ props.item.GuardiansDisplay }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template> 
<script>
import { participantApi } from "@/custom_modules/PathData";
import { async, Promise } from "q";
export default {
  data() {
    return {
      dataList: [],
      gridSearch: "",
      gridLoading: false,
      dataProgress: 0,
      headers: [
        { text: "First Name", value: "FirstName" },
        { text: "Last Name", value: "LastName" },
        { text: "IsActive", value: "IsActive" },
        { text: "Date of Birth", value: "DOB" },
        { text: "Guardian", value: "GuardiansDisplay" }
      ]
    };
  },
  mounted() {
    var self = this,
      list = self.$data.dataList;
    if (list && list.length === 0) {
      self.loadData();
    }
  },
  computed: {},
  methods: {
    loadData() {
      var self = this;
      self.$data.gridLoading = true;
      participantApi
        .cacheFirst(self)
        .finally(function() {
          self.$data.dataProgress = 100;
          setTimeout(() => {
            self.$data.gridLoading = false;
          }, 1000);
        })
        .catch(err => {});
    },
    refresh() {
      var self = this;
      self.$data.gridLoading = true;
      participantApi.networkOnly().finally(() => {
        self.$data.gridLoading = true;
      });
    },
    async rowClick(item) {
      var self = this;
      self.$root.$confirm.open({
        title: "Check the Console",
        body: "Open Dev tools to see the row item"
      });
      var db = await self.$pathPouch.participant.getById(item.Id);
      console.log("Row Item", item);
      console.log("Local DB Item", db);
    }
  }
};
</script>

<style>
</style>
