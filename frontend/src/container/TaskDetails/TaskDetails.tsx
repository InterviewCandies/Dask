import userEvent from "@testing-library/user-event";
import { useSnackbar } from "notistack";
import { comment } from "postcss";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { updateCurrentTask } from "../../actions/task";
import { createComment, deleteComment } from "../../api/comment/comment";
import { fetchTask, updateTask } from "../../api/task/task";
import GrayButton from "../../components/common/GrayButton/GrayButton";
import Searchbar from "../../components/common/Searchbar/Searchbar";
import CustomPopover from "../../components/CustomPopover/CustomPopover";
import LabelGenerator from "../../components/LabelGenerator/LabelGenerator";
import useUpdateBoard from "../../hooks/useUpdateBoard";
import useUpdateCurrentTask from "../../hooks/useUpdateCurrentTask";
import { useDialog } from "../../provider/DialogProvider";
import {
  CommentType,
  DEFAULT_AVATAR,
  DEFAULT_TASK_COVER,
  Label,
  StateTypes,
  Task,
  User,
} from "../../types";
import { errorHandler } from "../../utils/errorHandler";
import { formatDate } from "../../utils/formatDate";

const Comment = ({ comment }: { comment: CommentType }) => {
  const user = useSelector((state: StateTypes) => state.user);
  const currentTask = useSelector((state: StateTypes) => state.task);
  const { enqueueSnackbar } = useSnackbar();
  const { saveChangesToCurrentTask } = useUpdateCurrentTask();

  const handleDeleteComment = async (id: string) => {
    let result = await deleteComment(id);
    if (result.status) {
      enqueueSnackbar(result.message, { variant: "error" });
      return;
    }
    const comments = currentTask.comments?.filter(
      (comment) => comment._id !== id
    );
    result = await saveChangesToCurrentTask(
      {
        ...currentTask,
        comments: [...(comments as [])],
      },
      "Comment is added"
    );
  };
  return (
    <div className="space-y-2 border-t-2 first:border-0 py-5 border-gray-200">
      <div className="flex justify-between items-top">
        <div className="flex items-center space-x-2">
          <img
            className="w-9 h-9 rounded-lg"
            src={comment.author.photoURL || DEFAULT_AVATAR}
          ></img>
          <div>
            <h1 className="text-sm font-bold">{comment.author.email}</h1>
            <p className="text-xs text-gray-600">
              {comment.createdDate && formatDate(comment.createdDate)}
            </p>
          </div>
        </div>
        {user.email == comment.author.email && (
          <div className="flex space-x-2">
            <button className="text-gray-500 text-xs hover:bg-gray-100 focus:outline-none py-1 p-2 rounded-lg">
              Edit
            </button>
            <button
              className="text-gray-500 text-xs hover:bg-gray-100 focus:outline-none py-1 p-2 rounded-lg"
              onClick={() => handleDeleteComment(comment._id as string)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div>
        <p className="">{comment.content}</p>
      </div>
    </div>
  );
};

const Comments = ({ comments }: { comments: CommentType[] }) => {
  const { register, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const { saveChangesToCurrentTask } = useUpdateCurrentTask();
  const contentRef = useRef<null | HTMLTextAreaElement>(null);
  const user = useSelector((state: StateTypes) => state.user);
  const currentTask = useSelector((state: StateTypes) => state.task);

  const handleCreateComment = async (data: CommentType) => {
    const newComment = {
      content: data.content,
      author: { ...user },
    };
    let result = await createComment({ ...newComment });
    if (result.status) {
      enqueueSnackbar(result.message, { variant: "error" });
      return;
    }
    result = await saveChangesToCurrentTask(
      {
        ...currentTask,
        comments: [{ ...result.data }, ...(currentTask.comments as [])],
      },
      "Comment is added"
    );
    if (!result.status && contentRef.current) contentRef.current.value = "";
  };
  return (
    <div className="space-y-4">
      <form
        className="p-4 border-2 border-gray-300 shadow rounded-xl"
        onSubmit={handleSubmit(handleCreateComment)}
      >
        <div className=" flex space-x-2 ">
          <img className="w-9 h-9" src={user.photoURL}></img>
          <textarea
            ref={(e) => {
              register(e, { required: true });
              contentRef.current = e;
            }}
            name="content"
            className="w-full focus:outline-none"
            placeholder="Write a comment"
            rows={4}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button className=" focus:outline-none bg-blue-500 px-3 py-1 text-white rounded-xl">
            Send
          </button>
        </div>
      </form>
      <div className="first:border-0">
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment}></Comment>
        ))}
      </div>
    </div>
  );
};

const Attachment = () => {
  return (
    <div className="flex space-x-2 items-center">
      <div className="w-40 h-20 bg-gray-200"></div>
      <div className="space-y-1">
        <p className="text-xs text-gray-400">{Date.now()}</p>
        <h1 className="font-bold">Tittle</h1>
        <div className="flex space-x-2">
          <button className="hover:bg-gray-200 text-sm px-2 py-1 ring-2 ring-gray-300 bg-white rounded-lg">
            Download
          </button>
          <button className="hover:bg-gray-200 text-sm px-2 py-1 ring-2 ring-gray-300 bg-white rounded-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Attachments = ({ files }: { files: [] }) => {
  return (
    <div className="space-y-4">
      {files.map((file, i) => (
        <Attachment key={i}></Attachment>
      ))}
    </div>
  );
};

function TaskDetails({ task }: { task: Task }) {
  const descriptionRef = useRef(null);
  const titleRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [, closeDialog] = useDialog();
  const currentTask: Task = useSelector((state: StateTypes) => state.task);
  const { saveChangesToCurrentTask } = useUpdateCurrentTask();
  const labelRef = useRef(null);

  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    const fetchCurrentTask = async () => {
      try {
        const result = await dispatch(fetchTask(task._id as string));
      } catch (error) {
        return errorHandler(error);
      }
    };
    fetchCurrentTask();
  }, []);

  const handleUpdateTitle = async () => {
    const title = (titleRef.current as any).value.trim() || "Untitled";
    const newTask = { ...currentTask, title };
    const result = await saveChangesToCurrentTask(newTask);
    if (!result?.status) setEditTitle(false);
  };

  const handleUpdateDescription = async () => {
    const description =
      (descriptionRef.current as any).value.trim() || "No description";
    const newTask = { ...currentTask, description };
    const result = await saveChangesToCurrentTask(newTask);
    if (!result?.status) setEdit(false);
  };

  return (
    <div className="p-5 space-y-4 w-auto relative">
      <button
        className=" px-3 absolute focus:outline-none top-2.5 right-2.5  py-1 rounded-lg bg-blue-500 text-white"
        onClick={closeDialog}
      >
        <i className="fas fa-times"></i>
      </button>
      {currentTask.coverURL && (
        <img src={currentTask.coverURL} className="w-full h-28 rounded"></img>
      )}
      <div>
        <div className="grid md:grid-cols-4 grid-cols-1 space-y-4 md:space-y-0">
          <div className="space-y-4 mt-4 col-span-3">
            {editTitle ? (
              <div className="flex space-x-2 items-center">
                <input
                  ref={titleRef as any}
                  className="ring-2 w-full md:w-4/5 my-2 ring-gray-200 rounded-lg  focus:outline-none"
                  style={{ padding: "0.5rem" }}
                  defaultValue={currentTask.title}
                ></input>
                <div className="flex space-x-2 mt-2">
                  <button
                    className="bg-green-600 font-semibold text-white px-3 py-1 rounded-xl focus:outline-none hover:bg-green-500"
                    onClick={handleUpdateTitle}
                  >
                    Save
                  </button>
                  <button
                    className="px-2 py-1 rounded-xl focus:outline-none   hover:font-semibold hover:bg-gray-100"
                    onClick={() => setEditTitle(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3 text-xs items-center">
                <h1 className="font-bold text-xl">{currentTask.title}</h1>
                <button
                  className="ring-1 ring-gray-300  hover:bg-gray-100 focus:outline-none text-gray-500 bg-white py-1 px-3 rounded-lg"
                  onClick={() => setEditTitle((prevState) => !prevState)}
                >
                  <i className="fas fa-edit mr-2"></i>Edit
                </button>
              </div>
            )}
            <p className="text-gray-600 text-xs">
              In list <span className="font-bold">progress</span>
            </p>
            <div className="space-y-3">
              <div className="flex space-x-3 text-xs items-center">
                <h1 className="text-xs text-gray-600 font-semibold">
                  <i className="fas fa-file-alt mr-2"></i> Description
                </h1>
                <button
                  className="ring-1 ring-gray-300  hover:bg-gray-100 focus:outline-none text-gray-500 bg-white py-1 px-3 rounded-lg"
                  onClick={() => setEdit((prevState) => !prevState)}
                >
                  <i className="fas fa-edit mr-2"></i>Edit
                </button>
              </div>
              {edit ? (
                <div>
                  <textarea
                    ref={descriptionRef as any}
                    className="ring-2 w-full md:w-4/5   ring-gray-200 rounded-lg  focus:outline-none"
                    style={{ padding: "0.5rem" }}
                    defaultValue={currentTask.description}
                  ></textarea>
                  <div className="flex space-x-2 mt-2">
                    <button
                      className="bg-green-600 font-semibold text-white px-3 py-1 rounded-xl focus:outline-none hover:bg-green-500"
                      onClick={handleUpdateDescription}
                    >
                      Save
                    </button>
                    <button
                      className="px-2 py-1 rounded-xl focus:outline-none   hover:font-semibold hover:bg-gray-100"
                      onClick={() => setEdit(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm m-0">{currentTask.description}</p>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex space-x-3 text-xs items-center">
                <h1 className="text-xs text-gray-600 font-semibold">
                  <i className="fas fa-paperclip mr-2"></i> Attachments
                </h1>
                <button
                  className="ring-1 ring-gray-300  hover:bg-gray-100 focus:outline-none text-gray-500 bg-white py-1 px-3 rounded-lg"
                  onClick={() => {}}
                >
                  <i className="fas fa-plus mr-2"></i>Add
                </button>
              </div>
              <Attachments files={task.files as []}></Attachments>
            </div>
          </div>

          <div>
            <h1 className="text-xs text-gray-600 font-semibold mb-2">
              <i className="fas fa-tools mr-2"></i> Actions
            </h1>
            <div className="flex flex-row space-x-2 md:space-x-0 md:flex-col md:space-y-3">
              <GrayButton icon="fas fa-image mr-2">Cover</GrayButton>
              <GrayButton icon="fas fa-tags mr-2" ref={labelRef}>
                Labels
              </GrayButton>
              <CustomPopover ref={labelRef}>
                <LabelGenerator
                  currentLabels={currentTask.tags as any}
                ></LabelGenerator>
              </CustomPopover>
              <GrayButton icon="fas fa-users mr-2">Members</GrayButton>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto">
        {currentTask.comments && (
          <Comments comments={currentTask.comments}></Comments>
        )}
      </div>
    </div>
  );
}

export default TaskDetails;
