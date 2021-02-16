import React from "react";
import { JsxElement } from "typescript";
import { Board, User } from "../../types";
const card_image =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8cGVvcGxlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

const Avatar = (props: { photoUrl: any }) => {
  return <img className="w-9 h-9 rounded-xl" src={props.photoUrl}></img>;
};

const displayMembers = (members: User[]) => {
  const shortend =
    members.length > 3 ? (
      <span className="text-sm text-gray-400">
        + {members.length - 3} others
      </span>
    ) : (
      "noting"
    );
  return (
    <div className="flex space-x-2 items-center">
      {members.map((member, i) => {
        return i < 3 ? <Avatar photoUrl={member.photoURL}></Avatar> : null;
      })}
      {shortend}
    </div>
  );
};
function Card(props: { board: Board }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <img
        className="object-contain rounded-lg"
        src={props.board.coverURL}
      ></img>
      <h1 className="font-bold mt-2 mb-4">{props.board.title}</h1>
      {props.board.members && displayMembers(props.board.members)}
    </div>
  );
}

export default Card;
