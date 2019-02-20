<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout>
        <v-flex>
          <v-btn round color="primary" dark @click="getParticipant">Get Participants By Id</v-btn>
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
import { async } from "q";
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
    async getParticipant() {
      var par = await pathVue.$pathPouch.participant.getById(
        "a60716c4-01de-400f-b8c8-c94f38fc87c5"
      );
      //console.log("participant", par);
    },
    test(item) {},
    save(item) {}
  }
};
</script>

<style>
</style>
