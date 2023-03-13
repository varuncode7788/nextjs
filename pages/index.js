import Head from 'next/head';
import  { MongoClient } from  'mongodb'
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS=[
//   {
//     id:'m1',
//     title:'A first meetup',
//     image:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//     address:'311,fortune business hub, ahm',
//     description:'this is first meetup'},
//     {
//     id:'m2',
//     title:'A second meetup',
//     image:'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80',
//     address:'555,GRAVITY OPP I SQUARE',
//     description:'this is second meetup!'
//   }
// ];
function HomePage(props){
  return <>
  <Head>
    <title>React Meetup</title>
    <meta name='description' 
    content="browse a highly active react meetups!"/>

  </Head>
  <MeetupList meetups={props.meetups}/>
  </>
}

// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
  
//   return{
//     props:{
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }
export  async function getStaticProps(){

  // fetch('/api/meetups')
  const client = await MongoClient.connect(
    'mongodb+srv://varuncodage:1RjxdB6dt84jFCWB@cluster0.vhonzkh.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups')

  const meetups = await  meetupsCollection.find().toArray();

  client.close();
  return{
    props:{
      meetups: meetups.map(meetup => ({
        title:meetup.title,
        address:meetup.address,
        image:meetup.image,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 1

  };
}

export default HomePage;

