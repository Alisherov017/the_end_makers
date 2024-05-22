import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./HomePage.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import CakeIcon from "@mui/icons-material/Cake";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { getCurrentUser, getOneUser } from "../../store/actions/user.actions";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("currentUser");
    {
      id && dispatch(getCurrentUser(id));
    }
  }, []);

  const { currentUser } = useAppSelector((state) => state.users);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <div className={styles.profileImageContainer}>
          <img
            src={
              currentUser?.avatar ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="User Profile"
            className={styles.profileImage}
          />
        </div>

        <h1>{currentUser?.name}</h1>
        <div className={styles.two}>
          <p>
            <>
              <LocationOnIcon />
            </>
            <a
              href="https://www.google.com/maps/place/%D0%91%D0%B8%D1%88%D0%BA%D0%B5%D0%BA/@42.8771485,74.5920476,11.94z/data=!4m6!3m5!1s0x389eb7dc91b3c881:0x492ebaf57cdee27d!8m2!3d42.8746212!4d74.5697617!16zL20vMDFnOV8?entry=ttu"
              target="_blank"
              className={styles.location}
            >
              {currentUser?.city}
            </a>
          </p>

          <span onClick={openModal}>
            <small>
              <InfoIcon />
            </small>
            <div className={styles.info}>Подробнее</div>
          </span>
        </div>
        <div className={styles.buttons}>
          <Link to="/editHome" className={styles.editProfileButton}>
            Редактировать профиль
          </Link>
          <div className={styles.addPost}>
            <Link to="/addPost" className={styles.editProfileButton}>
              Добавить пост
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.header}>
                <h4>Подробная информация</h4>
              </div>
              <hr />
              <div className={styles.inf}>
                <div className={styles.id}>
                  <span>@</span>
                  <p>id{currentUser?.id}</p>
                </div>
                <hr />

                <div className={styles.person}>
                  <span>
                    <AccountCircleIcon />
                  </span>
                  {/* {currentUser && <p>Name: {currentUser.name}</p>} */}
                  <p> Name:{currentUser?.name}</p>
                </div>

                <div className={styles.birthday}>
                  <span>
                    <CakeIcon />
                  </span>

                  {/* {currentUser && <p>День рождения: {currentUser.email}</p>} */}
                  <p>День рождения:{currentUser?.bd}</p>
                </div>

                <div className={styles.city}>
                  <span>
                    <HomeIcon />
                  </span>
                  {/* <p>Город: {currentUser.city}</p> */}
                  <p>Город:{currentUser?.city}</p>
                </div>
                <hr />
              </div>
              <h4>Контактная информация</h4>
              {/* <p>Моб. телефон: {currentUser.phone}</p> */}
              <p>Моб. телефон:{currentUser?.phone}</p>
            </div>
            <button className={styles.closeModalButton} onClick={closeModal}>
              X
            </button>
          </div>
          <div className={styles.owerflow} onClick={closeModal}></div>
        </>
      )}
    </div>
  );
};

export default HomePage;
