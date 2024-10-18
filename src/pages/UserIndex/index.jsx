import { useDispatch, useSelector} from "react-redux";
import UserBalanceCard from "../../components/UserBalanceCard";
import { getUserDataThunk } from "../../store/Slices/UserSlice";
import {getFullname, getToken } from "../../store/Selectors";
import { useEffect } from "react";

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
  const currentState = useSelector((state) => state)

  useEffect(() => {
    const token = getToken(currentState);
    if (token) dispatch(getUserDataThunk(token));
  });

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {getFullname(currentState)} !
        </h1>
        <button className="edit-button">Edit Name</button>
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
