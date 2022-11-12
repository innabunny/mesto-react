function Card({card, name, link, onCardClick}) {
  return(
      <article className="element">
        <img src={link} alt={name} className="element__image" onClick={() => onCardClick(card)}/>
          <div className="element__info">
            <h2 className="element__title">{name}</h2>
            <div className="element__like">
              <button className="element__button-like" type="button"></button>
              <div className="element__like-count">{card.likes.length}</div>
            </div>
          </div>
          <button type="button" className="element__button-delete"></button>
      </article>
  )
}

export default Card