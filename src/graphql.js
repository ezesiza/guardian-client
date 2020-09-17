import gql from 'graphql-tag'

export const GET_FRUITS = gql `query getFruits {
          getFruits{
            name
            fruittype
            id
            name
            role
            description
          }
}`

export const GET_ONE_FRUIT = gql` query OneFruit($id:Float!){
  oneFruit(id:$id){
    id
    name
    role
    fruittype
    description
  }
}`

export const GET_FRUITS_BY_TYPE = gql` query GetFruitsByType($fruit:String!) {
  getFruitsByType(fruit:$fruit){
    id
    name
    description
     fruittype
     role
  }
}`

export const DELETE_FRUIT = gql `mutation DeleteFruit($id:Float!) {
  deleteFruit(id:$id)
}`

export const CREATE_FRUIT = gql`mutation CreateFruit( $name:String!, $description:String!, $fruittype:String!, $role:String!){
  createFruit( fruit: {
      name: $name
      description:$description
      fruittype: $fruittype
      role: $role}) {
          name
          role
          fruittype
          description
      }
}`
export const UPDATE_FRUIT = gql`mutation UpdateFruit( $name:String!, $description:String!, 
$fruittype:String!, $role:String!, $id:Float!){
  updateFruit(
    id:$id,
   fruit: {
      name: $name
      description:$description
      fruittype: $fruittype
      role: $role
      }) {
          name
          role
          fruittype
          description
      }
}`
