import { useOutletContext, useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { users } from "../../db";

function User() {
  console.log(useOutletContext());
  const { userId } = useParams();
  console.log(userId);
  return (
    <div>
      <h1>
        User with it {userId} is named: {users[Number(userId) - 1].name}
      </h1>
      <hr />
      <Link to="followers">See followers</Link>
      <Outlet
        context={{
          nameOfMyUser: users[Number(userId) - 1].name,
        }}
      />
    </div>
  );
}
export default User;
