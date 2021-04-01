import React from 'react';

const MediaCard = (rec, liked, watch) => {
  if (rec.Name) {
    return (
      <div key={rec.yID} className="mediaCard">
        <h3>{rec.Name}</h3>
        {rec.wTeaser ? (
          <div className="description">
            <div style={{ fontWeight: 'bold' }} >Description:</div>
            <div>{rec.wTeaser.slice(0, 300) + '...'}</div>
          </div>
        ) : null}
        <iframe className="YTembed" src={rec.yUrl}>
        </iframe>
        <button className="description" onClick={liked}>Add this to things I liked!</button>
        <button className="description" onClick={watch}>Let&apos;s try this out!</button>
      </div >
    );
  }
  return null;
}

export default MediaCard;