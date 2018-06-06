const axios = require('axios');
const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require ('graphql');
const {google} = require('googleapis');
var request = require('request');
var ACCESS_TOKEN = 'AIzaSyCMspUL_qSfHL6i9wZoEDiWP5AT3r33DAo'
const videoSearch = google.youtube({
    version: 'v3',
    auth: ACCESS_TOKEN
  });
/* 
//Hardcoded data
    const customers= [
        {id:'1', name:'shivesh', email:'shiv@gail.com', age:23},
        {id:'2', name:'santo', email:'santo@yahu.com', age:23}
    ]
*/


//Customer Type
var customers= []

const CustomerType = new GraphQLObjectType({
    name:'Customer',
    fields:() =>({
        id:{type:GraphQLString},
    })
});
var getAll = (keys)=>{
    return new Promise((resolve, reject) => {
    customers = []
    request.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+keys.id+'&type=video&key=' + ACCESS_TOKEN, 
                function(err, header, body) {
                if (err) throw err
                console.log("s÷s",body);
                body = JSON.parse(body)                
                body.items.map(x=>{
                        // console.log("mm",x.snippet.title)
                        customers.push({id:x.snippet.title})
                    })
                    resolve(customers)
            })
        })

        }
//Root Query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        customer:{
            type:CustomerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentvalue, args){
                
                for(let i=0;i< customers.length;i++){
                    if(customers[i].id == args.id){
                        return customers[i];
                    }
                }
            }

        },
        customers:{
            type: new GraphQLList(CustomerType),
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentvalue, args){
                return getAll(args);
            }
        }

    }
    
});

module.exports = new GraphQLSchema({
       query:RootQuery
});