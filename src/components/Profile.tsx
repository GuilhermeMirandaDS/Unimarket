import { useEffect, useState } from 'react';
import { useUserInfo } from "@/data/userInfo";
import { jwtDecode } from "jwt-decode";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSideBar = ({ isOpen, onClose }: ProfileProps) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUserId(decoded.id);
        setEmail(decoded.email);
      } catch (e) {
        console.error("Erro ao decodificar o token:", e);
      }
    }
  }, []);
  
  const user = useUserInfo(userId);

  if (!user) return null;

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "show" : ""}`} onClick={onClose} />
      <div className={`sidebar-profile ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="top-page">
          <img src={user.avatar} className="user-img" />
          <div className="user-info1">
            <h1>{user.name}</h1>
            <h3>{user.tag}</h3>
          </div>
        </div>

        <div className="login">
            <label>E-mail:</label>
            <h3>{email}</h3>
        </div>
      </div>
    </>
  );
};

export default ProfileSideBar;
