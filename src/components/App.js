import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ConfirmPopup from "./ConfirmPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ImagePopup from './ImagePopup.js';
import {useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import {api} from "../utils/Api.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardRemove, setCardRemove] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({});
    setIsLoading(false);
  };

  const handleEditProfile = () => {
    setEditProfilePopupOpen(true);
  }

  const handleEditAvatar = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleCardAdd = () => {
    setAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const handleConfirmPopup = (card) => {
    setCardRemove(card);
    setConfirmPopupOpen(true);
  }

  function handleUpdateUserInfo(data) {
    setIsLoading(true);
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка', err);
      })
  }

  function handleUpdateUserAvatar(data) {
    setIsLoading(true);
    api
      .changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка', err);
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка', err);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log('Ошибка', err);
      })
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка', err);
      })
  }

  useEffect(() => {
    Promise.all([api.getUserData(), api.getCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        console.log('Ошибка', err);
      })
  },[])

  return (
    <CurrentUserContext.Provider value={currentUser}>
     <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfile}
          onEditAvatar={handleEditAvatar}
          onAddCard={handleCardAdd}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleConfirmPopup}
        />
        <Footer />
       <EditProfilePopup
         isOpen={isEditProfilePopupOpen}
         onClose={closeAllPopups}
         onUpdateUserInfo={handleUpdateUserInfo}
         isLoading={isLoading}
       />
       <EditAvatarPopup
         isOpen={isEditAvatarPopupOpen}
         onClose={closeAllPopups}
         onUpdateAvatar={handleUpdateUserAvatar}
         isLoading={isLoading}
         />
       <AddPlacePopup
         isOpen={isAddPlacePopupOpen}
         onClose={closeAllPopups}
         onAddPlace={handleAddPlaceSubmit}
         isLoading={isLoading}
         />
        <ConfirmPopup
          onClose={closeAllPopups}
          isOpen={isConfirmPopupOpen}
          card={cardRemove}
          onCardDelete={handleCardDelete}
          />
       <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
