import { ModalHeader } from "./ModalHeader";
import React, { createContext, useRef, useState } from "react";
import { useThreadStore } from "../../stores/useThreadStore";
import { Message } from "../Message";
import { JumpToDropdown } from "../JumpToDropdown";
import {
  formatDate,
  getGroupedByDate,
  getJumpToOptions,
  onJumpTo,
  setFirstStringToEmptyIfStartsWithSecond,
} from "../../utils";
import { ErrorMessage } from "../ErrorMessage";
import { usePopover } from "../../hooks/usePopover";
import { MentionDropdown } from "../MentionDropdown";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ChatMeassge } from "../Store/Slice/UserSlice";

export const ThreadModal = ({
  onSubmit,
  deleteError,
  deleteLoading,
  onDelete,
  editError,
  error,
  onEdit,
  editLoading,
}) => {
  const { onChange, formData, feedbackItem, resetFormData } = useThreadStore();
  const dispatch = useDispatch();
  const [messageInvalid, setMessageInvalid] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  console.log("userMessage",userMessage )
  const messageRef = useRef();
  const ref = useRef();
  const prefCharFeedback = useRef(null);

  const repliesWithDates =
    feedbackItem?.Replies?.map((r) => ({
      ...r,
      created_at: new Date(r?.created_at),
    })) ?? [];

  const containerRef = useRef(null);
  const HandleClike = () => {
    dispatch(ChatMeassge(userMessage));
    if (
      !messageRef.current.checkValidity() ||
      messageRef.current.value.length === 0
    ) {
      setMessageInvalid(true);
      return;
    }
  };

  const {
    popoverFocused,
    popoverQuery,
    popoverVisible,
    onKeyDown,
    onKeyUp,
    setPopoverVisible,
  } = usePopover({
    prevCharRef: prefCharFeedback,
    onSubmit,
    value: formData.message,
    resetFormData,
  });

  return (
    <>
      <dialog open className="modal modal--screen">
        <ModalHeader title={"Thread"} modal={"thread"} />
        <div ref={containerRef} className="messages flow">
          {feedbackItem?.Replies?.length === 0 ? (
            <p className="mt">No replies yet.</p>
          ) : (
            Object.values(getGroupedByDate(repliesWithDates))?.map(
              (item, idx) => (
                <React.Fragment key={idx}>
                  <JumpToDropdown
                    insideModal={true}
                    onJumpTo={(timePeriod) =>
                      onJumpTo(
                        timePeriod,
                        repliesWithDates,
                        containerRef.current
                      )
                    }
                    options={getJumpToOptions(repliesWithDates)}
                    id={item[0].created_at.setHours(0, 0, 0, 0)}
                    placeholder={formatDate(item[0].created_at)}
                  />
                  {item.map((i, idx) => (
                    <Message
                      error={editError}
                      isLoading={editLoading}
                      deleteError={deleteError}
                      deleteLoading={deleteLoading}
                      onDelete={onDelete}
                      onEdit={onEdit}
                      key={idx}
                      item={i}
                    />
                  ))}
                </React.Fragment>
              )
            )
          )}
        </div>
        <form
          ref={ref}
          id="create-product-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
            resetFormData();
          }}
          className="modal__content modal-form modal--screen__form"
        >
          <div style={{ position: "relative" }}>
            <textarea
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              // onKeyDown={(e) => {
              //     if (
              //         e.key === "Enter" &&
              //         formData.message.trim().length > 0
              //     ) {
              //         e.preventDefault()
              //         onSubmit()
              //         resetFormData()
              //     }
              // }}
              ref={messageRef}
              value={formData.message}
              onChange={(e) => {
                setUserMessage(e.target.value);
                onChange(e);
                setMessageInvalid(false);
              }}
              required
              name="message"
              className={`input ${messageInvalid ? "invalid" : ""}`}
              type="text"
              id="message"
              placeholder="Message"
            />
            <MentionDropdown
              position={"bottom"}
              focused={popoverFocused}
              textareaRef={messageRef}
              query={popoverQuery}
              onChange={(name) =>
                useThreadStore.setState({
                  formData: {
                    ...useThreadStore.getState().formData,
                    message: setFirstStringToEmptyIfStartsWithSecond(
                      useThreadStore.getState().formData.message,
                      name
                    ),
                  },
                })
              }
              setOpen={setPopoverVisible}
              open={popoverVisible}
            />
          </div>

          <button
            onClick={HandleClike}
            form="create-product-form"
            className="modal__button button button--icon-label-inverted"
          >
            Submit
          </button>
          {error && <ErrorMessage message={error.message} />}
        </form>
      </dialog>
      <ToastContainer />
    </>
  );
};
