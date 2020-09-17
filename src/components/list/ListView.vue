<template>
<v-row>
    <v-container class="grey lighten-5"></v-container>
    <v-col>
        <v-card>
            <v-card-title class="headline">
                <div class="transition-swing" v-if="Object.keys(oneFruit).length>1">
                    <h3>{{oneFruit.name}}</h3>
                    <p>{{oneFruit.description}}</p>
                </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-container fluid>
                <v-row no-gutters>
                    <template>
                        <v-col></v-col>
                        <v-responsive width="100%"></v-responsive>
                    </template>
                </v-row>
                <v-row>
                    <v-col class="d-flex child-flex" cols="4">
                        <v-card flat tile class="d-flex" >
                            <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                            <v-card-subtitle class="pb-0"></v-card-subtitle>
                            <v-card-text class="text--primary">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{oneFruit.role}}
                                        </v-list-item-title>
                                        <v-list-item-title>
                                             {{oneFruit.description}}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-col>
</v-row>
</template>

<script>
import { GET_ONE_FRUIT} from '@/graphql'

export default {
      data () {
        return {
            oneFruit: '',
            id: parseInt(this.$route.params.id)
        }
    },
    apollo: {
        oneFruit: {
            query: GET_ONE_FRUIT,
            variables () {
                return {
                    id: this.id
                }
            }
        }
    },
    mounted() {

    }
};
</script>
