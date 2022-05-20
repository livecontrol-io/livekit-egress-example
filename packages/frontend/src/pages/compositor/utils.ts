import Konva from 'konva';
import type { TrackPublication } from 'livekit-client';

const defaults = {
  width: 1024,
  height: 758,
};

export const createKonvaVideoImage = (track: TrackPublication) => {
  const wrapper = document.createElement('div');
  const video = document.createElement('video');
  wrapper.append(video);
  video.autoplay = true;
  video.muted = true;
  track.videoTrack?.attach(video);

  video.width = track.dimensions?.width ?? defaults.width;
  video.height = track.dimensions?.height ?? defaults.height;

  function handleUpdateLayer() {
    image.getLayer()?.batchDraw();
    requestAnimationFrame(() => {
      handleUpdateLayer();
    });
  }

  const image = new Konva.Image({
    image: video,
    x: 0,
    y: 0,
  });

  const group = new Konva.Group({
    x: 0,
    y: 0,
  });

  video.addEventListener('loadedmetadata', () => {
    console.log('Video updated');
    image.width(track.dimensions?.width ?? 1024);
    image.height(track.dimensions?.height ?? 768);
  });

  group.add(image);

  handleUpdateLayer();

  void video.play();

  document.body.lastElementChild?.remove();
  document.body.append(wrapper);

  console.log('Dimensions', track.dimensions);

  return group;
};
