<template>
<v-app v-bind:style="{ background: $vuetify.theme.themes.light.background}">
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <h2 class="text-md-center">Data PHK</h2>
        <v-layout row wrap style="margin:10px">
          <v-flex xs6>
          </v-flex>
          <v-flex xs6 class="text-right">
            <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details></v-text-field>
          </v-flex>
        </v-layout>
        <v-data-table :headers="headers" :items="phks" :search="keyword" :loading="load">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item) in items" :key="item.id_phk">
                <td>{{ item.id_phk }}</td>
                <td>{{ item.no_kk }}</td>
                <td>{{ item.nik }}</td>
                <td>{{ item.sebelum }}</td>
                <td>{{ item.sesudah }}</td>
                <td>{{ item.status_data }}</td>
                <td>
                  <v-btn v-if="item.status_data=='Belum Dikonfirmasi'" icon color="indigo" light @click="konfirmasi(item.id_phk)">
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                  <v-btn icon color="error" light @click="deleteData(item.id_phk)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
    <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
      {{ text }}
      <v-btn dark text @click="snackbar = false">Tutup</v-btn>
    </v-snackbar>
  </v-container>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      items: ['Kasir', 'Customer Service'],
      keyword: '',
      headers: [
        {
          text: 'Id Data',
          value: 'id_phk'
        },
        {
          text: 'Nomor KK',
          value: 'no_kk'
        },
        {
          text: 'NIK',
          value: 'nik'
        },
        {
          text: 'Pekerjaan Sebelum PHK',
          value: 'sebelum'
        },
        {
          text: 'Pekerjaan Sekarang',
          value: 'sesudah'
        },
        {
          text: 'Status Data',
          value: 'status_data'
        },
        {
          text: 'Aksi',
          value: 'aksi'
        }
      ],
      phks: [],
      snackbar: false,
      color: null,
      text: '',
      load: false,
      form: {
        no_kk: '',
        nik: '',
        sebelum: '',
        sesudah: '',
      },
      phk: new FormData(),
      typeInput: 'new',
      errors: '',
      updatedId: '',
      deleteId: '',
    }
  },
  methods: {
    getData() {
      var uri = this.$apiUrl + '/phk'
      this.$http.get(uri).then(response => {
        this.phks = response.data.message
      })
    },
    sendData() {
      this.phk.append('no_kk', this.form.no_kk);
      this.phk.append('nik', this.form.nik);
      this.phk.append('sebelum', this.form.sebelum);
      this.phk.append('sesudah', this.form.sesudah);
      var uri = this.$apiUrl + '/phk';
      this.load = true;
      this.$http.post(uri, this.phk).then(response => {
        if(response.data.username){
          this.snackbar = true; //mengaktifkan snackbar
          this.color = 'red'; //memberi warna snackbar
          this.text = response.data.username; //memasukkan pesan ke snackba
        }else{
          this.snackbar = true; //mengaktifkan snackbar
          this.color = 'green'; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan ke snackba
        }
          
          this.load = false;
          this.dialog = false;
          this.getData(); //mengambil data phk
          this.resetForm();
        }).catch(error => {
          this.errors = error;
          this.snackbar = true;
          this.text = 'Try Again';
          this.color = 'red';
          this.load = false;
        });
    },
    updateData() {
      this.phk.append('no_kk', this.form.no_kk);
      this.phk.append('nik', this.form.nik);
      this.phk.append('sebelum', this.form.sebelum);
      this.phk.append('sesudah', this.form.sesudah);
      var uri = this.$apiUrl + '/phk/' + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.phk)
        .then(response => {
        if(response.data.username){
          this.snackbar = true; //mengaktifkan snackbar
          this.color = 'red'; //memberi warna snackbar
          this.text = response.data.username; //memasukkan pesan ke snackba
        }else{
          this.snackbar = true; //mengaktifkan snackbar
          this.color = 'green'; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan ke snackba
        }

          this.load = false;
          this.dialog = false;
          this.getData(); //mengambil data phk
          this.resetForm();
          this.typeInput = 'new';
        }).catch(error => {
          this.errors = error;
          this.snackbar = true;
          this.text = 'Try Again';
          this.color = 'red';
          this.load = false;
          this.typeInput = 'new';
        });
    },
    konfirmasi(item) {
      var uri = this.$apiUrl + '/phk/konfirmasi/' + item
      this.$http.get(uri).then(response => {
        this.snackbar = true; //mengaktifkan snackbar
        this.color = 'green'; //memberi warna snackbar
        this.text = response.data.message; //memasukkan pesan ke snackba

        this.load = false;
        this.dialog = false;
        this.getData();
        this.typeInput = 'new';
      }).catch(error => {
        this.errors = error;
        this.snackbar = true;
        this.text = 'Try Again';
        this.color = 'red';
        this.load = false;
        this.typeInput = 'new';
      });
    },
    deleteData(deleteId) {
      var uri = this.$apiUrl + '/phk/' + deleteId;
      this.load = true;
      this.$http
        .delete(uri)
        .then(response => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = 'green'; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan ke snackba

          this.load = false;
          this.dialog = false;
        this.getData();
          this.typeInput = 'new';
        })
        .catch(error => {
          this.errors = error;
          this.snackbar = true;
          this.text = 'Try Again';
          this.color = 'red';
          this.load = false;
          this.typeInput = 'new';
        });
        this.getData();
    },
    setForm() {
      if (this.typeInput === 'new') {
        this.sendData();
      } else {
        console.log("dddd");
        this.updateData();
      }
    },
    resetForm() {
      this.form = {
        no_kk: '',
        nik:'',
        sebelum: '',
        sesudah: ''
      };
    }
  },
  mounted() {
    this.getData();
  }
};
</script>