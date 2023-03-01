import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  modal: "scale-0",
  showModal: "scale-0",
  updateModal: "scale-0",
  loading: {
    show: false,
    msg: "",
  },
  alert: {
    show: false,
    msg: "",
    color: "",
  },

  connectedAccount: "",
  nft: null,
  nfts: [],
  transactions: [],
  contract: null,
});

//scale-0 is a tailwind class which makes things disappear

const setAlert = (msg, color = "green") => {
  getGlobalState("loading", { show: false, msg: "" });

  setGlobalState("alert", { show: true, msg, color });

  setTimeout(() => {
    setGlobalState("alert", { show: false, msg, color });
  }, 6000);
};

const setLoadingMsg = (msg) => {
  const loading = getGlobalState("loading");
  setGlobalState("loading", { ...loading, msg });
};

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.lenght > maxLength) {
    var start = text.substring(0, startChars);
    var end = text.substring(text.lenght - endChars, text.length);
    while (start.lenght + end.lenght < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
};

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  setLoadingMsg,
  setAlert,
  truncate,
};
