// EmployeeDeck.tsx
import React, { useRef } from "react";
import Member from "./Member";
// import "react-stack-cards/dist/index.css";


export default function Deck(members) {
  console.log("members", members);
  return (

    members.members.map((emp, i) => (
      <Member
        key={i}
        member={emp} />
    ))
  );
}
