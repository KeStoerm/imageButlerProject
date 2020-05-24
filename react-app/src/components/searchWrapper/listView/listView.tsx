import React from "react";
import {SplashBaseResponseImageEntry} from "../../../services/splashBaseService";
import {map, isEmpty} from "ramda";
import "./listView.scss";
import {useHistory} from "react-router-dom";
import {lorem} from "../../common/lorem";

interface ListViewProps {
  images: Array<SplashBaseResponseImageEntry>;
}

interface ListViewRowProps {
  image: SplashBaseResponseImageEntry;
}

const ListViewRow: React.FC<ListViewRowProps> = ({image}) => {
  const history = useHistory();

  return <div className="list-view columns is-fullwidth is-marginless">
    <div className="column is-4">
      <img src={image.url} />
    </div>
    <div className="column is-8">
      <div className="columns">
        <div className="column is-5">
          <p className="has-text-weight-bold">{`Id: ${image.id}`}</p>
          {image.large_url && <p>{"You can find the image in full-size "}<a href={image.large_url}>here</a></p>}
        </div>
        <div className="column is-4">
          <p className="has-text-weight-bold">{image.copyright}</p>
        </div>
        <div className="column is-3">
          <button onClick={() => history.push(`/image/${image.id}`)} className="button is-success is-fullwidth">
            <span>Discover</span>
            <span className="icon is-small">
              <i className="fas fa-angle-right"></i>
            </span>
          </button>
        </div>
      </div>
      <div>
        {lorem}
      </div>
    </div>
  </div>
}

export const ListView: React.FC<ListViewProps> = ({images}) => {
  if (isEmpty(images)){
    return <p>Sorry we could not find any image for your query.</p>
  }

  return <div className="list-view-wrapper">
    {map(image => <ListViewRow key={image.id} image={image}/>, images)}
  </div>
}
