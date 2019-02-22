<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid grid-list-lg>
        <v-layout align-center justify-space-between row fill-height wrap>
          <v-flex xs12 sm5 md3>
            <v-text-field label="Employee Id" v-model="user.Id"></v-text-field>
          </v-flex>
          <v-flex xs12 sm5 md3>
            <v-text-field label="Employee Number" v-model="user.EmployeeNumber"></v-text-field>
          </v-flex>
          <v-flex xs12 sm5 md3>
            <v-text-field label="First Name" v-model="user.FirstName"></v-text-field>
          </v-flex>
          <v-flex xs12 sm5 md3>
            <v-text-field label="Last Name" v-model="user.LastName"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      user: {
        FirstName: null,
        LastName: null,
        EmployeeNumber: null,
        Id: null
      }
    };
  },
  mounted: function() {
    // var self = this,
    //   user = self.$store.getters.User;
    // self.$pathData.person
    //   .GetById(user.Id)
    //   .then(result => {
    //     if (result) {
    //       self.$data.user.FirstName = result.FirstName;
    //       self.$data.user.LastName = result.LastName;
    //       self.$data.user.Id = result.Id;
    //       self.$data.user.EmployeeNumber = result.EmployeeNumber;
    //     } else {
    //     }
    //   })
    //   .catch(err => {
    //     console.log("In User Tab", err);
    //   });
  }
};
</script>

<style>
</style>
