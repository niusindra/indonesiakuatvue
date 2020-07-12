<template>
    <section>
        <v-parallax :src="require('../../assets/bghome.jpg')" height="800">
        <v-layout column align-center justify-center class="black--text">
            <v-row class="mt-10">
                <v-col cols="14" class="mt-">
                    <v-container fluid>
                        <v-row>
                            <v-col cols="7">
                                    <v-card  v-bind:style="{ background: $vuetify.theme.themes.light.background}">
                                        <v-card-title>
                                            <span class="headline">Data Keluarga Miskin ({{rekapMiskin.total}})</span>
                                        </v-card-title>
                                        <v-card-text>
                                            Terkonfirmasi ({{rekapMiskin.konfirmasi}})
                                        </v-card-text>
                                        <v-card-text>
                                            Belum Terkonfirmasi ({{rekapMiskin.belumkonfirmasi}})
                                        </v-card-text>
                                    </v-card>
                            </v-col>
                            <v-col cols="7">
                                    <v-card  v-bind:style="{ background: $vuetify.theme.themes.light.background}">
                                        <v-card-title>
                                            <span class="headline">Data Terkena PHK ({{rekapPHK.total}})</span>
                                        </v-card-title>
                                        <v-card-text>
                                            Terkonfirmasi ({{rekapPHK.konfirmasi}})
                                        </v-card-text>
                                        <v-card-text>
                                            Belum Terkonfirmasi ({{rekapPHK.belumkonfirmasi}})
                                        </v-card-text>
                                    </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            
        </v-layout>
        </v-parallax>
    </section>
    
</template>

<script>   
export default {
    data() {
    return {
        rekapMiskin:[],
        rekapPHK:[],
    };
  },
  methods: {
    setType(){
        localStorage.setItem("type", -1);
    },
    getData() {
        var uri = this.$apiUrl + '/miskin/rekap'
        this.$http.get(uri).then(response => {
            this.rekapMiskin = response.data.message
        })
        var uri = this.$apiUrl + '/phk/rekap'
        this.$http.get(uri).then(response => {
            this.rekapPHK = response.data.message
        })
    },
  },
  mounted(){
    this.setType();
    this.getData()
  }
};
</script>
