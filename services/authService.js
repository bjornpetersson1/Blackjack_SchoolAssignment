import { gameState } from "../data/stateData.js";
import { ShowInfoScreen } from "../presentation/components/infoRender.js";

export const CheckValidCreateInput = (userName, password) => {
  const userNameLower = userName.toLowerCase();
  if (!userName.trim() || !password.trim()) {
    ShowInfoScreen("Username and/or password can not be empty");
    return false;
  }
  if (localStorage.getItem(userNameLower) != null) {
    ShowInfoScreen(userName + " is already taken, choose a different name");
    return false;
  }
  return true;
};

export const CheckValidLoginInput = (userName, password) => {
  const userNameLower = userName.toLowerCase();
  if (!userName.trim() || !password.trim()) {
    ShowInfoScreen("Username and/or password can not be empty");
    return false;
  }
  const stored = localStorage.getItem(userNameLower);
  if (stored == null) {
    ShowInfoScreen("User not found, consider creating a new one");
    return false;
  }
  if (JSON.parse(stored).userState.password !== password) {
    ShowInfoScreen("Wrong password, try again");
    return false;
  }
  return true;
};

export const CreateNewUser = (userName, password) => {
  const newUser = {
    userState: { name: userName, password: password, balance: 0 },
    betState: 0,
    playerHands: [
      {
        cards: [],
        value: 0,
        done: false,
      },
    ],
    dealerHand: {
      cards: [],
      value: 0,
      done: false,
    },
    deckState: [],
    activeRule: "",
  };
  return newUser;
};

export const Login = (userName, password) => {
  const userNameLower = userName.toLowerCase();
  const stored = localStorage.getItem(userNameLower);
  if (stored == null) return null;
  const storedState = JSON.parse(stored);
  if (storedState.userState.password === password) return storedState;
  return null;
};

export const SetActiveUserToGamestate = (activeUser) => {
  Object.assign(gameState, activeUser);
};

// export const SetGameStateFromUser = (userState) => {
//   gameState.userState.name = userState.name;
//   gameState.userState.password = userState.password;
//   gameState.userState.balance = userState.balance;
// };
