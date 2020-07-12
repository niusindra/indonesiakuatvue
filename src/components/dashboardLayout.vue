<template>
    <div>
        <v-app-bar app fixed clipped-left height="70px" color="#FFE0B2" style="opacity:0.85;">
            <img src="../assets/kouvee.png" style="height:45px;width:45px" class="ml-5">
            <v-toolbar-title style="font-size: 21px;" class="secondary--text ml-3">
                INDONESIA KUAT
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <router-link v-for="item in items" :key="item.title" link :to="item.link">
                    <v-btn text large color="secondary" class="mt-3">{{ item.title }}</v-btn>
                </router-link>
            </v-toolbar-items>
        </v-app-bar>


        
        <VContent>
            <router-view/>
        </VContent>
    </div>
</template>
 
<script>   
export default {
    data() {
        return {
            items: [
                {
                    title: "Home",
                    link: "/"
                },
                {
                    title: "Login",
                    link: "/login"
                },
            ],
        }
    },
}
</script> 