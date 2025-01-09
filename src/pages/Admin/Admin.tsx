import { useEffect, useState } from "react";
import { User } from "../../types/User";

const Admin = () => {
    const [admin, setAdmin] = useState<User>();

    useEffect(() => {
        const storeData = localStorage.getItem('currentUser');
        if(storeData) {
            setAdmin(JSON.parse(storeData));
        }
    },[]);

  return (
    <div>Admin, {admin?.firstName} {admin?.lastName}</div>
  )
}

export default Admin