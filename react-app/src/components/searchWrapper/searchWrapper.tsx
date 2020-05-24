import React, {useState, useEffect} from "react";
import {Search} from "./search/search";
import {getSplashBaseImagesByQuery, SplashBaseResponseImageEntry, getSplashBaseLatestImages} from "../../services/splashBaseService";
import {LoadingSpinner} from "../common/loadingSpinner";
import {GalleryView} from "./galleryView/galleryView";
import {isNil} from "ramda";
import {ViewSelection, View} from "./viewSelection/viewSelection";
import {ListView} from "./listView/listView";
import "./searchWrapper.scss"

export const SearchWrapper: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [images, setImages] = useState<SplashBaseResponseImageEntry[]>();
  const [currentView, setCurrentView] = useState<View>("gallery");

  useEffect(() => {
    getSplashBaseLatestImages()
      .then(response => {
        setLoading(false);
        setImages(response.data.images);
      })
  }, [])

  const onSend = async (query: string) => {
    setLoading(true);
    setImages(null);

    getSplashBaseImagesByQuery(query)
      .then(response => {
        setLoading(false);
        setImages(response.data.images);
      });
  }

  return <div className="search-wrapper">
    <Search onSend={(query) => onSend(query)} />
    <ViewSelection currentView={currentView} onChange={newView => setCurrentView(newView)}/>
    {loading && <LoadingSpinner />}
    {!isNil(images) && currentView === "gallery" && <GalleryView images={images} />}
    {!isNil(images) && currentView === "list" && <ListView images={images} />}
  </div>
}