import React from "react";
import {SplashBaseResponseImageEntry} from "../../../services/splashBaseService";
import {isEmpty, map} from "ramda";
import "./galleryView.scss";
import {useHistory} from "react-router-dom";

interface GalleryViewProps {
  images: Array<SplashBaseResponseImageEntry>
}

export const GalleryView: React.FC<GalleryViewProps> = ({images}) => {
  const history = useHistory();

  if (isEmpty(images)){
    return <p>Sorry we could not find any image for your query.</p>
  }

  return <div className="gallery-view-wrapper is-flex">
    {map(image =>
      <div key={image.id} className="image-wrapper" onClick={() => history.push(`/image/${image.id}`)}>
        <img src={image.url}/>
      </div>,
    images)}
  </div>
}