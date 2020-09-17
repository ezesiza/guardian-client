<template>
<v-container fluid>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialogm1" persistent max-width="300px" :retain-focus="false">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on" @click.prevent="showAddList" @click.stop="dialogm1 = true">
                        Create a New List
                    </v-btn>
                <v-btn @click.prevent="getFruitsOnly()">Load Fruits</v-btn>
                <v-btn @click.prevent="getVegiesOnly()">Load Vegetables</v-btn>
                </template>
                <v-card>
                    <v-card-title>Provide List Details</v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Name*" v-model="name">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Description*" type="text" v-model="description"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Role*" type="text" v-model="role"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="FruitType*" type="text" v-model="fruittype"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text @click.prevent="createFruit">Submit</v-btn>
                        <v-btn color="blue darken-1" text @click="dialogm1 = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
    <v-row>
        <v-col cols="6" sm="4" v-for="list in getFruits" :key="list.id">
            <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
                <v-card-title v-text="list.name" @click="viewList(list.id)"></v-card-title>
                <div>
                    <v-dialog v-model="dialogm2" scrollable max-width="300px" :retain-focus="false">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark v-bind="attrs" v-on="on" @click.prevent="showEditView(list)">
                                Edit Fruit
                            </v-btn>

                        </template>
                        <v-card v-if="list">
                            <v-card-title>Update Fruit Details</v-card-title>
                            <v-container>
                                <v-row column>
                                    <v-col cols="12">
                                        <v-text-field label="Name*" :v-bind="name" type="text" v-model="name">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Description*" :v-bind="description" type="text" v-model="description"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Role*" :v-bind="role" type="text" v-model="role">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="FruitType*" :v-bind="fruittype" type="text" v-model="fruittype"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-card-actions>
                                <v-btn color="blue darken-1" text @click.prevent="updateFruit(list, list.id)">Update</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
                <div>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on" @click.prevent="deleteFruit(list)">
                                <v-icon large color="green darken-2">mdi-delete</v-icon>Delete
                            </v-btn>
                        </template>
                        <span>Delete List</span>
                    </v-tooltip>
                </div>
            </v-img>
        </v-col>
    </v-row>

</v-container>
</template>

<style scoped>
.bottom-gradient {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}

.repeating-gradient {
    background-image: repeating-linear-gradient(-45deg,
            rgba(255, 0, 0, .25),
            rgba(255, 0, 0, .25) 5px,
            rgba(0, 0, 255, .25) 5px,
            rgba(0, 0, 255, .25) 10px);
}
</style>

<script>
import { GET_FRUITS_BY_TYPE, GET_FRUITS, CREATE_FRUIT, UPDATE_FRUIT, DELETE_FRUIT} from '@/graphql'

export default {
    name: "List",
    data() {
        return {
            id: '',
            dialogm1: "",
            dialogm2: "",
            show: false,
            showEdit: false,
            name: "",
            role:"",
            fruittype:"",
            description: "",
            getFruits:[],
            getFruitsByType:[]
        };
    },
    apollo:{
        getFruits:GET_FRUITS,
        getFruitsByType:{
           query: GET_FRUITS_BY_TYPE,
           variables(){
               return {
                   fruit:this.fruittype
               }
           }
        }
    },
    methods: {

        getFruitsOnly(){
            this.fruittype='FRUIT';
            this.getFruits = [...this.getFruitsByType];
            return this.getFruitsByType;
        },
        getVegiesOnly(){
            this.fruittype='VEGETABLE';
            this.getFruits = [...this.getFruitsByType]
            return this.getFruitsByType;
        },
        createFruit(){
            this.$apollo.mutate({
                mutation:CREATE_FRUIT,
                variables:{
                    name:this.name,
                    description:this.description,
                    role:this.role,
                    fruittype:this.fruittype
                }
            }).then(() => {
                return this.$router.go(0);
            });
        },
        deleteFruit(list){
            this.$apollo.mutate({
                mutation:DELETE_FRUIT,
                variables:{
                    id:parseInt(list.id)
                }
            })
                return this.$router.go(0);
        },
        updateFruit(){
            this.$apollo.mutate({
                mutation:UPDATE_FRUIT,
                variables:{
                    name:this.name,
                    description:this.description,
                    role:this.role,
                    fruittype:this.fruittype,
                    id:parseInt(this.id)
                }
            }).then(() => {
                return this.$router.go(0);
            });
        },
     
        showAddList() {
            this.show = !this.show;
            this.name = ''
            this.description = ''
        },
        showEditView(list) {
            this.id = list.id
            this.showEdit = !this.showEdit;
            this.name = list.name;
            this.description = list.description;
            this.role = list.role;
            this.fruittype = list.fruittype;
        },
        viewList(id) {
            return this.$router.push({
                path: '/list/' + id
            })

        }
    },
    mounted: function () {
    },

}
</script>
