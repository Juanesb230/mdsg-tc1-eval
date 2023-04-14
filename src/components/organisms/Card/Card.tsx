import React from "react";
import "./card.scss";
import classNames from "classnames";

interface CardProps {
  name: string;
  url: string;
  onDelete?(): void;
}

export const Card: React.FC<CardProps> = ({ name, url }) => {
  return (
    <div className={classNames({ gifCard: true })}>
      <p>{name}</p>
      <img src={url} alt={url} className={classNames({ gifCard__image: true })} />
    </div>
  );
};
