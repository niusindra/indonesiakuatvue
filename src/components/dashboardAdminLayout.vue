<template>
    <div>
        <v-navigation-drawer 
            v-model="drawer"
            class="white"
            color="#FFAB91"
            app 
            clipped
            fixed 
            temporary> 
           <v-list-item v-bind:style="{ background: $vuetify.theme.themes.light.background}"> 
                <v-list-item-content> 
                <v-list-item-title class="title"> 
                   <img src="../assets/kouvee.png" style="height:45px;width:45px">
                   <br>
                    PIHAK RT 
                </v-list-item-title> 
                <v-list-item-subtitle>
                    INDONESIA KUAT
                </v-list-item-subtitle>
                </v-list-item-content> 
            </v-list-item> 

            <v-divider></v-divider> 
            <v-list>
                <v-list-item  
                v-for="item in items"
                :key="item.title" 
                :to ="item.link">
                <v-list-item-icon>  
                    <v-icon>{{ item.icon }}</v-icon> 
                </v-list-item-icon> 
 
                <v-list-item-content >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item> 
                </v-list> 
        <template v-slot:append>
            <div class="pa-2"> 
            <v-btn  color="#FFAB91" @click="logout()" block>Logout</v-btn>
            </div> 
        </template> 
        </v-navigation-drawer> 
 
        <v-app-bar            
        dark
        app             
        fixed             
        clipped-left            
        height="70px"            
        color="#FFAB91"> 
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon> 
 
        <VSpacer /> 
        <img src="../assets/kouvee.png" style="height:45px;width:45px">
        <v-toolbar-title                 
        style="font-size: 21px;"
        class="white--text ml-2"> 
            INDONESIA KUAT           
        </v-toolbar-title> 
        </v-app-bar> 
 
        <VContent >            
            <router-view />         
        </VContent>    
        </div> 
</template> 
 
<script>
export default
{     
    data () 
    {       
        return{        
             drawer: null,
             items: 
             [             
                { title: "Data Keluarga Miskin",
                  icon: "mdi-human-male",
                  name: 'MiskinAdmin',
                  link: "/rt/miskin"
                },   
                { title: "Data PHK", 
                  icon: "mdi-human-male",
                  name: 'PHKAdmin',
                  link: "/rt/phk"
                }                  
             ],
              selectedItems: []      
        }
    },
    methods: {
      updateSelected (selectedItems) {
      },

      logout()
      {
        localStorage.removeItem('token')
        localStorage.removeItem('type')
        localStorage.removeItem('id_pegawai')
        localStorage.removeItem('nama_pegawai')
        localStorage.removeItem('username')
        this.$router.push({name : "Login"})
      }
    }
}; 
</script> 