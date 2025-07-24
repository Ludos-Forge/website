// EmployeeDeck.tsx
import React, { useRef } from "react";
import Member from "./Member";
// import "react-stack-cards/dist/index.css";


export default function Deck(members) {
  // reference a StackCard per pilotarlo via ref
  const ref = useRef(null);

  // click sul bordo (card dietro) = vai a quella card
  const jumpTo = (index) => ref.current?.swipeTo(index);
  console.log("members", members);
  return (

    members.members.map((emp, i) => (
      <Member
        key={i}
        member={emp} />
    ))
  );
}
