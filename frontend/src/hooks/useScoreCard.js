import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],
  addInfo: [],
  queryInfo: [],

  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
  clearMessage: () => {},
  updateAddInfo: () => {},
  updateQueryInfo: () => {},
  clearAddInfo: () => {},
  clearQueryInfo: () => {},

});

const makeMessage = (message, color, type) => {
  return { message, color, type };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [addInfo, setAddInfo] = useState([]);
  const [queryInfo, setQuerydInfo] = useState([]);

  const addCardMessage = (message) => {
    setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR, "add")]);
  };

  const addRegularMessage = (...ms) => {
    setMessages([
      ...messages,
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR, "reg")),
    ]);
  };

  const clearMessage = () => {
    let copy = messages;
    copy.length = 0;
    setMessages([...copy])
  };

  const addErrorMessage = (message) => {
    setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR, "err")]);
  };

  const updateAddInfo = (info) => {
    setAddInfo([...info])
  }
  const updateQueryInfo = (info) => {
    setQuerydInfo([...info])
  }
  const clearAddInfo = () => {
    let copy = messages;
    copy.length = 0;
    setAddInfo([...copy])
  }
  const clearQueryInfo = () => {
    let copy = messages;
    copy.length = 0;
    setQuerydInfo([...copy])
  }

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        addInfo,
        queryInfo,

        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        clearMessage,
        updateAddInfo,
        updateQueryInfo,
        clearAddInfo,
        clearQueryInfo
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
