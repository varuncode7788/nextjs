// import { headers } from "@/next.config";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
function NewMeetupPage(){
     const router = useRouter();

    async function AddMeetUpHandler(enteredMeetupData){
        const responese = await fetch('/api/new-meetup',{
            method:'POST',
            body:JSON.stringify(enteredMeetupData),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const data = await responese.json();
        console.log(data);
        router.push('/');
    }
    return (
        <Fragment>
        <Head>
        <title>Add a new meetup</title>
         <meta name='description' 
         content="add your own meetup!"/>

        </Head>
        < NewMeetupForm onAddMeetup={AddMeetUpHandler}/> 
        </Fragment>
    )
}
export default NewMeetupPage;