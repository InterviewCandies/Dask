import React from "react";
import { Board, User } from "../../types";

const Avatar = (props: { photoUrl: any }) => {
  return <img className="w-9 h-9 rounded-xl" src={props.photoUrl}></img>;
};

const displayMembers = (members: User[]) => {
  const shortend =
    members.length > 3 ? (
      <span className="text-sm text-gray-400">
        + {members.length - 3} others
      </span>
    ) : null;
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
    <div className="bg-white rounded-xl p-4">
      <div>
        <img
          className="w-full h-48 rounded-lg"
          src={props.board.coverURL}
        ></img>
      </div>
      <h1 className="font-bold my-4 text-lg capitalize">{props.board.title}</h1>
      {props.board.members && displayMembers(props.board.members)}
    </div>
  );
}

export default Card;
