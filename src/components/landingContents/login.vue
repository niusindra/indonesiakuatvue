<template>
  <section>
    <v-parallax :src="require('../../assets/bghome.jpg')" height="800">
        <v-row>
          <v-col>
      <v-layout align-center justify-center class="white--text" style="margin-top:100px">
         
            <v-flex xs12 sm8 md3>
            <v-card  v-bind:style="{ background: $vuetify.theme.themes.light.background}">
          
              <v-card-title>
                <span class="headline">Login</span>
              </v-card-title>
              <v-card-text>
                <v-container >
                  <v-row >
                    <v-col  cols="12">
                      <v-text-field 
                        name="username"
                        label="Username"
                        id="username"
                        type="username"
                        v-model="form.username"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field 
                        name="password"
                        label="Password"
                        id="password"
                        type="password"
                        v-model="form.password"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  depressed
                  large
                  style="text-transform: none !important;"
                  color="#FFAB91"
                  @click="login()"
                >Login</v-btn>
              </v-card-actions>
             </v-card>
            </v-flex>
      </v-layout>

          </v-col>
        </v-row>
    </v-parallax>
  </section>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      snackbar: false,
      color: null,
      text: "",
      load: false,
      users: {},
      form: {
        username: null,
        password: null
      },
      user: new FormData(),
      typeInput: "new",
      errors: ""
    };
  },
  methods: {
    login() {
      var url = this.$apiUrl + "/user/verify";
      this.user = new FormData();
      this.user.append("username", this.form.username);
      this.user.append("password", this.form.password);
      this.$http.post(url, this.user).then(response => {

        if (response.data.role) {
          localStorage.setItem("role", response.data.role);
          
          if (localStorage.getItem("role") == "rt") {
            localStorage.setItem("type", 0);
            this.$router.push({ name: "MiskinAdmin" });
          } else if (localStorage.getItem("role") == "lurah") {
            localStorage.setItem("type", 1);
            this.$router.push({ name: "MiskinLurah" });
          } else {
            localStorage.setItem("type", 2);
            this.$router.push({ name: "MiskinPusat" });
          }
        } else {
          alert("Login Gagal");
        }
      });
    },
    setType(){
      localStorage.setItem("type", -1);
    }
  },
  mounted(){
    this.setType;
  }
};
</script>