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

export { useGlobalState, setGlobalState, getGlobalState, setLoadingMsg };
