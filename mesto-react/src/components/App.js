import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import {useState} from "react";


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
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

  return (
     <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfile}
          onEditAvatar={handleEditAvatar}
          onAddCard={handleCardAdd}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm name={'profile'} title={'Редактировать профиль'} isOpen={isEditProfilePopupOpen}
                       onClose={closeAllPopups} >
          <input
            type="text" name="name" minLength="2" maxLength="40" required id="name-input"
            className="popup__input popup__input_type_name" placeholder="Имя"
            defaultValue="" autoComplete="off" />
          <span className="popup__input-error" id="name-input-error"></span>
          <input
            type="text" name="about" minLength="2" maxLength="200" required id="about-input"
            className="popup__input popup__input_type_about" placeholder="О себе"
            defaultValue="" autoComplete="off"/>
          <span className="popup__input-error" id="about-input-error"></span>
        </PopupWithForm>
       <PopupWithForm name={'avatar'} title={'Обновить аватар'} isOpen={isEditAvatarPopupOpen}
                      onClose={closeAllPopups} >
         <input type="url" name="link" required id="avatar-link-input" placeholder="Ссылка на аватар"
                     className="popup__input popup__input_type_link" />
         <span className="popup__input-error" id="avatar-link-input-error"></span>
       </PopupWithForm>
       <PopupWithForm name={'card-add'} title={'Новое место'} isOpen={isAddPlacePopupOpen}
                      onClose={closeAllPopups} >
         <input type="text" name="name" minLength="2" maxLength="30" required id="add-name-input"
                     className="popup__input popup__input_type_name" placeholder="Название" />
                <span className="popup__input-error" id="add-name-input-error"></span>
                <input type="url" name="link" required id="add-link-input"
                       className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" />
                  <span className="popup__input-error" id="add-link-input-error"></span>
       </PopupWithForm>
       <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      </div>

  );
}

export default App;
