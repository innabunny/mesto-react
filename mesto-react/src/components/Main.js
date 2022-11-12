import avatar from "../images/Avatar.png";
import {useEffect, useState} from "react";
import {api} from '../utils/Api.js';
import Card from './Card.js';


function Main({onEditProfile, onEditAvatar, onAddCard, onCardClick}) {
  const [userName, setUserName] = useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = useState(avatar);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserData(userName, userDescription, userAvatar)
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch(err => console.log('Ошибка', err));

    api.getCards(cards)
      .then((data) => {
        const cards = data;
        setCards(cards);
      })
      .catch(err => console.log('Ошибка', err))
  }, [])

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img src={`${userAvatar}`} alt="ваше фото" className="profile__image" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__button-edit" type="button" onClick={onEditProfile}></button>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button className="profile__button-add" type="button" onClick={onAddCard}></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card.id}
            name={card.name}
            link={card.link}
            onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  )
}

export default Main