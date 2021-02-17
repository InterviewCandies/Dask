import React from "react";
import {
  Board,
  DEFAULT_AVATAR,
  MAXIMUM_MEMBERS_DISPLAYED_PER_CARD,
  User,
} from "../../types";

const Avatar = (props: { photoUrl: any }) => {
  return (
    <img
      className="w-9 h-9 rounded-xl"
      src={props.photoUrl || DEFAULT_AVATAR}
    ></img>
  );
};

const displayMembers = (members: User[]) => {
  const shortend =
    members.length > MAXIMUM_MEMBERS_DISPLAYED_PER_CARD ? (
      <span className="text-sm text-gray-400">
        + {members.length - MAXIMUM_MEMBERS_DISPLAYED_PER_CARD} others
      </span>
    ) : null;
  return (
    <div className="flex space-x-2 items-center">
      {members.map((member, i) => {
        return i < MAXIMUM_MEMBERS_DISPLAYED_PER_CARD ? (
          <Avatar photoUrl={member.photoURL} key={member.email}></Avatar>
        ) : null;
      })}
      {shortend}
    </div>
  );
};
function Card(props: { board: Board; onClick: Function }) {
  return (
    <div className="bg-white rounded-xl p-4" onClick={() => props.onClick()}>
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
