import { useDispatch, useSelector } from "react-redux";
import UserBalanceCard from "../../components/UserBalanceCard";
import { getUserDataThunk, modifyUserDataThunk } from "../../store/Slices/UserSlice";
import {
  getFirstname,
  getFullname,
  getLastname,
  getToken,
} from "../../store/Selectors";
import { useState } from "react";
import { store } from "../../store/Store";
import { redirect } from "react-router-dom";

const mockedUserData = [
  {
    accountName: "Checking",
    cardNumber: "x8349",
    balance: "2,082.79",
  },
  {
    accountName: "Savings",
    cardNumber: "x6712",
    balance: "10,928.42",
  },
  {
    accountName: "Credit Card",
    cardNumber: "x8349",
    balance: "184.30",
  },
];

export default function UserIndex() {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const editNameSubmit = (event) => {
    event.preventDefault();
    const newFirstname = event.target.firstname.value;
    const newLastname = event.target.lastname.value;
    dispatch(
      modifyUserDataThunk({ firstname: newFirstname, lastname: newLastname })
    );
  };

  const firstname = getFirstname(currentState);
  const lastname = getLastname(currentState);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {getFullname(currentState)} !
        </h1>
        <button
          onClick={() => setShowUpdateForm(!showUpdateForm)}
          className="edit-button"
        >
          Edit Name
        </button>
        <form
          onSubmit={editNameSubmit}
          id="edit-name-form"
          style={{ display: showUpdateForm ? "flex" : "none" }}
        >
          <div>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder={firstname}
            />
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder={lastname}
            />
          </div>
          <div>
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => setShowUpdateForm(!showUpdateForm)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {mockedUserData.map((item, index) => (
        <UserBalanceCard
          key={"UserBalanceCard" + index}
          accountName={item.accountName}
          cardNumber={item.cardNumber}
          availableBalance={item.balance}
        />
      ))}
    </main>
  );
}

export const userIndexLoader = async () => {
  try {
    const token = getToken(store.getState());
    if (!token) {
      return redirect("/");
    }
    await store.dispatch(getUserDataThunk(token));

    if (!getFirstname(store.getState()) && !getLastname(store.getState())) {
      return redirect("/");
    }
    return null;
  } catch (error) {
    throw new Error(error);
  }
};
