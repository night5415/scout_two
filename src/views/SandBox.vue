<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout>
        <v-flex>
          <v-btn round color="primary" dark @click="getParticipants">Get Participants</v-btn>
          <v-btn round color="primary" dark @click="test">Save to Vuex</v-btn>
          <v-data-table :headers="headers" :items="participants" class="elevation-1">
            <template slot="items" slot-scope="props">
              <tr @click="save(props.item)">
                <td class="text-xs-right">{{ props.item.FirstName }}</td>
                <td class="text-xs-right">{{ props.item.LastName }}</td>
                <td class="text-xs-right">{{ props.item.IsActive }}</td>
                <td class="text-xs-right">{{ props.item.DOB }}</td>
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
import data from "@/plugins/PathData";
export default {
  data() {
    return {
      headers: [
        { text: "First Name", value: "FirstName" },
        { text: "Last Name", value: "LastName" },
        { text: "IsActive", value: "IsActive" },
        { text: "Date of Birth", value: "DOB" },
        { text: "Guardian", value: "GuardiansDisplay" }
      ]
    };
  },
  computed: {
    participants: {
      get() {
        return this.$store.state.list.participantList;
      }
    }
  },
  methods: {
    getParticipants() {
      // var self = this;
      // self.$pathData.participant.getRemote().then(result => {
      //   var patients = result.data.data;
      //   self.$data.participants = patients;
      //   self.$pathPouch.participant
      //     .bulkSave(patients)
      //     .then(records => {
      //       console.log(records);
      //     })
      //     .catch(e => {
      //       console.log("Error in Sandbox..", e);
      //     });
      // });
    },
    test(item) {
      // var self = this;
      // self.$pathPouch.participant.getAll().then(docs => {
      //   docs.rows.forEach(element => {
      //     this.$store.dispatch("updateParticipantList", element.doc);
      //   });
      // });
    },
    save(item) {
      // item.FirstName = "booger";
      // self.$pathPouch.participant
      //   .save(item)
      //   .then(o => {
      //     debugger;
      //   })
      //   .catch(err => {
      //     debugger;
      //   });
    }
  }
};
</script>

<style>
</style>
