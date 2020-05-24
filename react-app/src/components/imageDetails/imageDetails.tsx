import React, {useState, useEffect} from "react";
import {match} from "react-router-dom";
import {SplashBaseResponseImageEntry, getSplashBaseImagesById} from "../../services/splashBaseService";
import {LoadingSpinner} from "../common/loadingSpinner";
import {lorem} from "../common/lorem";
import "./imageDetails.scss";

interface LinkParams {
  id: string,
}

interface ImageDetailsProps {
  match: match<LinkParams>
}

export const ImageDetails: React.FC<ImageDetailsProps> = ({match}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<SplashBaseResponseImageEntry>();

  useEffect(() => {
    getSplashBaseImagesById(match.params.id)
      .then(response => {
        setImage(response.data);
        setLoading(false);
      })
  })

  if (loading){
    return <LoadingSpinner/>
  }

  return <div className="image-details">
    <div className="columns">
      <div className="column is-6">
        <img src={image.url}/>
      </div>
      <div className="column is-6">
        <h1 className="title is-1">Image-details <i className="fas fa-camera"></i></h1>
        <p><b>{`ID: ${image.id}`}{` Copyright: ${image.copyright}`}</b></p>
        {image.url && <p>{"You can find the image in smaller size "}<a href={image.url}>here</a></p>}
        {image.large_url && <p>{"You can find the image in full-size "}<a href={image.large_url}>here</a></p>}
        {image.site && <p><b>{"Host:"}</b> {image.site}</p>}
        <p>{lorem}</p>
      </div>
    </div>
  </div>
}