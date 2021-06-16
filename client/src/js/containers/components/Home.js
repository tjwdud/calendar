import React, { useState } from "react";
import { dbService, arrayService } from "../../../fbase";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [printPlayer,setPrintPlayer] = useState("")
    const onSubmit = (e) =>{
        e.preventDefault();
        dbService.collection("nweet").add({
            nweet,
            createAt: Date.now(),
        });
        setNweet("");
    };
    const onChange = (e) => {
        const {
            target: {value}
        } = e;
        setNweet(value);
    };
    const onClickButton = () => {
        const player =[{playerName: "김쉬똥",playerAge: "4",pet:[{dog: "희",dogAge:"4"},{cat: "냥이",catAge:"3"}]},{playerName:"김철똥", playerAge:"5"},{playerName:"오똥" ,playerAge:"8"},{playerName:"육똥",playerAge:"10"}]
       
        /*dbService.collection('newd').add(
            JSON.parse( JSON.stringify(...player)) );
        }*/
        console.log(JSON.parse( JSON.stringify(player)))
        dbService.collection('nesd').doc("player").set({
            player:
            arrayService.arrayUnion(...player)
        });
    }
    

/*    const data = dbService.collection("nesd").doc("player").get().then((doc)=>{
    if (doc.exists){
        console.log(doc.data())
    } else {
        console.log('no such document')
    } 

}) */
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="string" onChange={onChange} value={nweet} />
                <input type="submit" value="Nweet" />
            </form>
            <button onClick={onClickButton}>버튼이여</button>
            <div>
                <p>

                </p>
            </div>
        </div>
    )
};

export default Home;