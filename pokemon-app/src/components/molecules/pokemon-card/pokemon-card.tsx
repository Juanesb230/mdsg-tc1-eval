import { FC, useState } from "react";
import Gif from "../../../utils/interfaces/gif";
import Button from "../../atoms/button/button";
import RoundedButton from "../../atoms/rounded-button/rounded-button";

import "./gif-card.scss";

interface GifCardProps {
  gif: Gif;
  onDelete: (id: number, url: string) => void;
}

const GifCard: FC<GifCardProps> = ({ gif, onDelete }) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleShowDeleteButtons = () => {
    setShowDeleteButton((prevState) => !prevState);
  };

  const handleDelete = () => {
    onDelete(gif.id, gif.url);
  };

  return (
    <div className="gif-card" data-testid="gifcard-testid">
      <img
        src={gif.url}
        className={`gif-card__image ${
          showDeleteButton ? "gif-card__image--disabled" : ""
        }`}
        alt={`GIF DE ${gif.author_id} CON ${gif.id}`}
      />
      <div
        className={`gif-card__button ${
          showDeleteButton ? "gif-card__button--disabled" : ""
        }`}
      >
        <RoundedButton
          onClick={handleShowDeleteButtons}
          icon="delete"
          disabled={showDeleteButton}
        />
      </div>
      {showDeleteButton && (
        <div className="gif-card__delete-buttons">
          <h4>¿Deseas eliminar este GIF?</h4>
          <Button text="Eliminar" onClick={handleDelete} />
          <Button
            text="Cancelar"
            type="secondary"
            onClick={handleShowDeleteButtons}
          />
        </div>
      )}
    </div>
  );
};

export default GifCard;