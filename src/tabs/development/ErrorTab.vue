<template>
  <v-flex>
    <v-toolbar flat>
      <v-btn flat icon @click="refresh">
        <v-icon>cached</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="dataList" item-key="Id">
      <v-progress-linear slot="progress" height="3" v-model="dataProgress"></v-progress-linear>
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td nowrap>{{ props.item.date }}</td>
          <td>{{ props.item.exception }}</td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>{{props.item.exception}}</v-card-text>
        </v-card>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
import { exceptionApi } from "@/custom_modules/PathData";
export default {
  data() {
    return {
      headers: [
        {
          text: "Date",
          align: "left",
          value: "date"
        },
        {
          text: "message",
          value: "Message"
        }
      ],
      dataList: [],
      gridSearch: "",
      gridLoading: false,
      dataProgress: 0
    };
  },
  mounted() {
    var self = this,
      list = self.$data.dataList;
    if (list && list.length === 0) {
      self.refresh();
    }
  },
  activated() {
    console.log("error tab is activated");
  },
  methods: {
    refresh() {
      var self = this;
      exceptionApi.cacheOnly(self).then(result => {
        var x = self.$data;
      });
    }
  }
};
</script>

<style>
</style>
