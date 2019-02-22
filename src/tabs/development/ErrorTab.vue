<template>
  <v-data-table :headers="headers" :items="desserts" item-key="Id">
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td nowrap>{{ props.item.Date | moment("MM-DD-YY @ h:mm:ss a") }}</td>
        <td>{{ props.item.Message }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-text>{{props.item.Stack}}</v-card-text>
      </v-card>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Date",
          align: "left",
          value: "Date"
        },
        {
          text: "message",
          value: "Message"
        }
      ],
      desserts: []
    };
  },
  mounted() {
    // var self = this;
    // self.$pathData.error
    //   .Get()
    //   .then(records => {
    //     records.forEach(err => {
    //       self.desserts.push({
    //         Id: err.Date, //milliseconds
    //         Date: new Date(err.Date),
    //         Message: err.Error.message,
    //         Stack: err.Error.stack
    //       });
    //     });
    //   })
    //   .catch(err => {
    //     self.$pathSaveError(err);
    //   });
  },
  activated() {
    console.log("error tab is activated");
  },
  methods: {
    name() {}
  }
};
</script>

<style>
</style>
